"use server"

import { getCurrentUser } from "./auth"
import { revalidatePath } from "next/cache"
import { demoFiles, demoFolders } from "@/lib/demo-data"

// Create a deep copy of the demo data to allow modifications
const folders = [...demoFolders]
let files = [...demoFiles]
let nextFolderId = Math.max(...folders.map((f) => f.id)) + 1
const nextFileId = Math.max(...files.map((f) => f.id)) + 1

export async function getFolders(parentId: number | null = null) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return folders.filter((folder) => folder.user_id === user.id && folder.parent_id === parentId)
  } catch (error) {
    console.error("Error fetching folders:", error)
    throw error
  }
}

export async function getFiles(folderId: number | null = null) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return files.filter((file) => file.user_id === user.id && file.folder_id === folderId)
  } catch (error) {
    console.error("Error fetching files:", error)
    throw error
  }
}

export async function createFolder(name: string, parentId: number | null = null) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    const newFolder = {
      id: nextFolderId++,
      name,
      parent_id: parentId,
      user_id: user.id,
      is_locked: false,
      is_favorite: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    folders.push(newFolder)
    revalidatePath("/dashboard/files")
    return newFolder
  } catch (error) {
    console.error("Error creating folder:", error)
    throw error
  }
}

export async function renameFolder(id: number, name: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    const folderIndex = folders.findIndex((f) => f.id === id && f.user_id === user.id)

    if (folderIndex === -1) {
      throw new Error("Folder not found")
    }

    folders[folderIndex] = {
      ...folders[folderIndex],
      name,
      updated_at: new Date().toISOString(),
    }

    revalidatePath("/dashboard/files")
    return folders[folderIndex]
  } catch (error) {
    console.error("Error renaming folder:", error)
    throw error
  }
}

export async function deleteFolder(id: number) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    // Find the folder
    const folderIndex = folders.findIndex((f) => f.id === id && f.user_id === user.id)

    if (folderIndex === -1) {
      throw new Error("Folder not found")
    }

    // Remove the folder
    folders.splice(folderIndex, 1)

    // Remove all child folders recursively
    const removeChildFolders = (parentId: number) => {
      const childFolders = folders.filter((f) => f.parent_id === parentId)

      for (const childFolder of childFolders) {
        const index = folders.findIndex((f) => f.id === childFolder.id)
        if (index !== -1) {
          folders.splice(index, 1)
          removeChildFolders(childFolder.id)
        }
      }

      // Remove all files in this folder
      files = files.filter((f) => f.folder_id !== parentId)
    }

    removeChildFolders(id)

    revalidatePath("/dashboard/files")
    return { success: true }
  } catch (error) {
    console.error("Error deleting folder:", error)
    throw error
  }
}

export async function toggleFolderLock(id: number) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    const folderIndex = folders.findIndex((f) => f.id === id && f.user_id === user.id)

    if (folderIndex === -1) {
      throw new Error("Folder not found")
    }

    folders[folderIndex] = {
      ...folders[folderIndex],
      is_locked: !folders[folderIndex].is_locked,
      updated_at: new Date().toISOString(),
    }

    revalidatePath("/dashboard/files")
    return folders[folderIndex]
  } catch (error) {
    console.error("Error toggling folder lock:", error)
    throw error
  }
}

export async function toggleFolderFavorite(id: number) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    const folderIndex = folders.findIndex((f) => f.id === id && f.user_id === user.id)

    if (folderIndex === -1) {
      throw new Error("Folder not found")
    }

    folders[folderIndex] = {
      ...folders[folderIndex],
      is_favorite: !folders[folderIndex].is_favorite,
      updated_at: new Date().toISOString(),
    }

    revalidatePath("/dashboard/files")
    return folders[folderIndex]
  } catch (error) {
    console.error("Error toggling folder favorite:", error)
    throw error
  }
}

export async function getRecentFiles(limit = 5) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return files
      .filter((file) => file.user_id === user.id)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, limit)
  } catch (error) {
    console.error("Error fetching recent files:", error)
    throw error
  }
}

export async function getFavoriteFiles() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return files
      .filter((file) => file.user_id === user.id && file.is_favorite)
      .sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error("Error fetching favorite files:", error)
    throw error
  }
}

export async function getBreadcrumbs(folderId: number | null) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  if (folderId === null) {
    return [{ id: null, name: "My Files" }]
  }

  try {
    const breadcrumbs = []
    let currentId = folderId

    while (currentId) {
      const folder = folders.find((f) => f.id === currentId && f.user_id === user.id)

      if (!folder) break

      breadcrumbs.unshift({ id: folder.id, name: folder.name })
      currentId = folder.parent_id
    }

    // Add root folder
    breadcrumbs.unshift({ id: null, name: "My Files" })

    return breadcrumbs
  } catch (error) {
    console.error("Error generating breadcrumbs:", error)
    throw error
  }
}
