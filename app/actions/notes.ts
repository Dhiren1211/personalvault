"use server"

import { getCurrentUser } from "./auth"
import { revalidatePath } from "next/cache"
import { demoNotes } from "@/lib/demo-data"

// Create a deep copy of the demo data to allow modifications
const notes = [...demoNotes]
let nextNoteId = Math.max(...notes.map((n) => n.id)) + 1

export async function getNotes() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return notes
      .filter((note) => note.user_id === user.id)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
  } catch (error) {
    console.error("Error fetching notes:", error)
    throw error
  }
}

export async function getNote(id: number) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return notes.find((note) => note.id === id && note.user_id === user.id) || null
  } catch (error) {
    console.error("Error fetching note:", error)
    throw error
  }
}

export async function createNote(title: string, content = "", folderId: number | null = null) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    const newNote = {
      id: nextNoteId++,
      title,
      content,
      user_id: user.id,
      folder_id: folderId,
      is_locked: false,
      is_favorite: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    notes.push(newNote)
    revalidatePath("/dashboard/notes")
    return newNote
  } catch (error) {
    console.error("Error creating note:", error)
    throw error
  }
}

export async function updateNote(id: number, title: string, content: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    const noteIndex = notes.findIndex((n) => n.id === id && n.user_id === user.id)

    if (noteIndex === -1) {
      throw new Error("Note not found")
    }

    notes[noteIndex] = {
      ...notes[noteIndex],
      title,
      content,
      updated_at: new Date().toISOString(),
    }

    revalidatePath("/dashboard/notes")
    return notes[noteIndex]
  } catch (error) {
    console.error("Error updating note:", error)
    throw error
  }
}

export async function deleteNote(id: number) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    const noteIndex = notes.findIndex((n) => n.id === id && n.user_id === user.id)

    if (noteIndex === -1) {
      throw new Error("Note not found")
    }

    notes.splice(noteIndex, 1)
    revalidatePath("/dashboard/notes")
    return { success: true }
  } catch (error) {
    console.error("Error deleting note:", error)
    throw error
  }
}

export async function toggleNoteLock(id: number) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    const noteIndex = notes.findIndex((n) => n.id === id && n.user_id === user.id)

    if (noteIndex === -1) {
      throw new Error("Note not found")
    }

    notes[noteIndex] = {
      ...notes[noteIndex],
      is_locked: !notes[noteIndex].is_locked,
      updated_at: new Date().toISOString(),
    }

    revalidatePath("/dashboard/notes")
    return notes[noteIndex]
  } catch (error) {
    console.error("Error toggling note lock:", error)
    throw error
  }
}

export async function toggleNoteFavorite(id: number) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    const noteIndex = notes.findIndex((n) => n.id === id && n.user_id === user.id)

    if (noteIndex === -1) {
      throw new Error("Note not found")
    }

    notes[noteIndex] = {
      ...notes[noteIndex],
      is_favorite: !notes[noteIndex].is_favorite,
      updated_at: new Date().toISOString(),
    }

    revalidatePath("/dashboard/notes")
    return notes[noteIndex]
  } catch (error) {
    console.error("Error toggling note favorite:", error)
    throw error
  }
}
