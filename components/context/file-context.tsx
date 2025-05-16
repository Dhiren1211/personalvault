"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  getFolders,
  getFiles,
  createFolder,
  renameFolder,
  deleteFolder,
  toggleFolderLock,
  toggleFolderFavorite,
  getBreadcrumbs,
} from "@/app/actions/files"

interface File {
  id: number
  name: string
  extension: string | null
  size: number
  mime_type: string | null
  folder_id: number | null
  is_locked: boolean
  is_favorite: boolean
  created_at: string
  updated_at: string
}

interface Folder {
  id: number
  name: string
  parent_id: number | null
  is_locked: boolean
  is_favorite: boolean
  created_at: string
  updated_at: string
}

interface Breadcrumb {
  id: number | null
  name: string
}

interface FileContextType {
  files: (File | Folder)[]
  currentFolder: number | null
  breadcrumbs: Breadcrumb[]
  isLoading: boolean
  error: string | null
  navigateToFolder: (folderId: number | null) => void
  navigateUp: () => void
  createNewFolder: (name: string) => Promise<void>
  renameItem: (id: number, newName: string, isFolder: boolean) => Promise<void>
  deleteItem: (id: number, isFolder: boolean) => Promise<void>
  toggleLock: (id: number, isFolder: boolean) => Promise<void>
  toggleFavorite: (id: number, isFolder: boolean) => Promise<void>
}

const FileContext = createContext<FileContextType | undefined>(undefined)

export function FileContextProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<(File | Folder)[]>([])
  const [currentFolder, setCurrentFolder] = useState<number | null>(null)
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load files and folders for the current folder
  const loadFilesAndFolders = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [foldersData, filesData, breadcrumbsData] = await Promise.all([
        getFolders(currentFolder),
        getFiles(currentFolder),
        getBreadcrumbs(currentFolder),
      ])

      // Add a type property to distinguish between files and folders
      const typedFolders = foldersData.map((folder: Folder) => ({ ...folder, type: "folder" as const }))
      const typedFiles = filesData.map((file: File) => ({ ...file, type: "file" as const }))

      // Combine and sort by name
      const combined = [...typedFolders, ...typedFiles].sort((a, b) => a.name.localeCompare(b.name))

      setFiles(combined)
      setBreadcrumbs(breadcrumbsData)
    } catch (err) {
      console.error("Error loading files and folders:", err)
      setError("Failed to load files and folders")
    } finally {
      setIsLoading(false)
    }
  }

  // Load data when the current folder changes
  useEffect(() => {
    loadFilesAndFolders()
  }, [currentFolder])

  const navigateToFolder = (folderId: number | null) => {
    setCurrentFolder(folderId)
  }

  const navigateUp = async () => {
    if (breadcrumbs.length > 1) {
      // Get the parent folder from breadcrumbs
      const parentFolder = breadcrumbs[breadcrumbs.length - 2]
      navigateToFolder(parentFolder.id)
    }
  }

  const createNewFolder = async (name: string) => {
    try {
      await createFolder(name, currentFolder)
      loadFilesAndFolders()
    } catch (err) {
      console.error("Error creating folder:", err)
      setError("Failed to create folder")
    }
  }

  const renameItem = async (id: number, newName: string, isFolder: boolean) => {
    try {
      if (isFolder) {
        await renameFolder(id, newName)
      } else {
        // Implement renameFile when needed
        // await renameFile(id, newName)
      }
      loadFilesAndFolders()
    } catch (err) {
      console.error("Error renaming item:", err)
      setError("Failed to rename item")
    }
  }

  const deleteItem = async (id: number, isFolder: boolean) => {
    try {
      if (isFolder) {
        await deleteFolder(id)
      } else {
        // Implement deleteFile when needed
        // await deleteFile(id)
      }
      loadFilesAndFolders()
    } catch (err) {
      console.error("Error deleting item:", err)
      setError("Failed to delete item")
    }
  }

  const toggleLock = async (id: number, isFolder: boolean) => {
    try {
      if (isFolder) {
        await toggleFolderLock(id)
      } else {
        // Implement toggleFileLock when needed
        // await toggleFileLock(id)
      }
      loadFilesAndFolders()
    } catch (err) {
      console.error("Error toggling lock:", err)
      setError("Failed to toggle lock")
    }
  }

  const toggleFavorite = async (id: number, isFolder: boolean) => {
    try {
      if (isFolder) {
        await toggleFolderFavorite(id)
      } else {
        // Implement toggleFileFavorite when needed
        // await toggleFileFavorite(id)
      }
      loadFilesAndFolders()
    } catch (err) {
      console.error("Error toggling favorite:", err)
      setError("Failed to toggle favorite")
    }
  }

  return (
    <FileContext.Provider
      value={{
        files,
        currentFolder,
        breadcrumbs,
        isLoading,
        error,
        navigateToFolder,
        navigateUp,
        createNewFolder,
        renameItem,
        deleteItem,
        toggleLock,
        toggleFavorite,
      }}
    >
      {children}
    </FileContext.Provider>
  )
}

export function useFileContext() {
  const context = useContext(FileContext)
  if (context === undefined) {
    throw new Error("useFileContext must be used within a FileContextProvider")
  }
  return context
}
