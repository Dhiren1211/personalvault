"use server"

import { getCurrentUser } from "./auth"
import { revalidatePath } from "next/cache"
import { demoTags } from "@/lib/demo-data"

// Create a deep copy of the demo data to allow modifications
const tags = [...demoTags]
let nextTagId = Math.max(...tags.map((t) => t.id)) + 1

export async function getTags() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return tags.filter((tag) => tag.user_id === user.id).sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error("Error fetching tags:", error)
    throw error
  }
}

export async function createTag(name: string, color: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    const newTag = {
      id: nextTagId++,
      name,
      color,
      user_id: user.id,
      created_at: new Date().toISOString(),
    }

    tags.push(newTag)
    revalidatePath("/dashboard")
    return newTag
  } catch (error) {
    console.error("Error creating tag:", error)
    throw error
  }
}

export async function deleteTag(id: number) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    const tagIndex = tags.findIndex((t) => t.id === id && t.user_id === user.id)

    if (tagIndex === -1) {
      throw new Error("Tag not found")
    }

    tags.splice(tagIndex, 1)
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error deleting tag:", error)
    throw error
  }
}
