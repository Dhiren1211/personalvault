"use server"

import { executeQuery } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function seedDatabase() {
  try {
    // Check if we already have users
    const existingUsers = await executeQuery("SELECT COUNT(*) FROM users")

    if (existingUsers[0].count > 0) {
      return { success: true, message: "Database already seeded" }
    }

    // Create a demo user
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash("password123", salt)

    const userResult = await executeQuery(
      "INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id",
      ["demo@example.com", passwordHash, "Demo User"],
    )

    const userId = userResult[0].id

    // Create root folder
    const rootFolderResult = await executeQuery(
      "INSERT INTO folders (name, user_id, parent_id) VALUES ($1, $2, NULL) RETURNING id",
      ["My Files", userId],
    )

    const rootFolderId = rootFolderResult[0].id

    // Create some subfolders
    const documentsResult = await executeQuery(
      "INSERT INTO folders (name, user_id, parent_id, is_favorite) VALUES ($1, $2, $3, $4) RETURNING id",
      ["Documents", userId, rootFolderId, true],
    )

    const documentsId = documentsResult[0].id

    await executeQuery("INSERT INTO folders (name, user_id, parent_id) VALUES ($1, $2, $3)", [
      "Images",
      userId,
      rootFolderId,
    ])

    await executeQuery("INSERT INTO folders (name, user_id, parent_id) VALUES ($1, $2, $3)", [
      "Work",
      userId,
      documentsId,
    ])

    // Create some files
    await executeQuery(
      "INSERT INTO files (name, extension, size, mime_type, user_id, folder_id, is_favorite) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        "Project Proposal",
        "docx",
        2500000,
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        userId,
        documentsId,
        true,
      ],
    )

    await executeQuery(
      "INSERT INTO files (name, extension, size, mime_type, user_id, folder_id, is_locked) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        "Budget",
        "xlsx",
        1200000,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        userId,
        documentsId,
        true,
      ],
    )

    await executeQuery(
      "INSERT INTO files (name, extension, size, mime_type, user_id, folder_id) VALUES ($1, $2, $3, $4, $5, $6)",
      ["Team Photo", "jpg", 3700000, "image/jpeg", userId, rootFolderId],
    )

    // Create some notes
    await executeQuery("INSERT INTO notes (title, content, user_id, is_favorite) VALUES ($1, $2, $3, $4)", [
      "Meeting Notes",
      "Discussed project timeline and deliverables.",
      userId,
      true,
    ])

    await executeQuery("INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3)", [
      "Project Ideas",
      "New feature ideas for the upcoming release.",
      userId,
    ])

    await executeQuery("INSERT INTO notes (title, content, user_id, is_locked) VALUES ($1, $2, $3, $4)", [
      "Personal Goals",
      "My personal goals for the next year.",
      userId,
      true,
    ])

    // Create some tags
    const workTagResult = await executeQuery(
      "INSERT INTO tags (name, color, user_id) VALUES ($1, $2, $3) RETURNING id",
      ["Work", "bg-blue-500", userId],
    )

    const personalTagResult = await executeQuery(
      "INSERT INTO tags (name, color, user_id) VALUES ($1, $2, $3) RETURNING id",
      ["Personal", "bg-green-500", userId],
    )

    const urgentTagResult = await executeQuery(
      "INSERT INTO tags (name, color, user_id) VALUES ($1, $2, $3) RETURNING id",
      ["Urgent", "bg-red-500", userId],
    )

    // Create user settings
    await executeQuery(
      "INSERT INTO user_settings (user_id, theme, default_view, storage_limit) VALUES ($1, $2, $3, $4)",
      [userId, "system", "list", 5368709120],
    )

    return { success: true, message: "Database seeded successfully" }
  } catch (error) {
    console.error("Error seeding database:", error)
    return { success: false, message: "Error seeding database" }
  }
}
