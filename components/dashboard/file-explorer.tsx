"use client"

import { useState } from "react"
import { useFileContext } from "@/components/context/file-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { File, Folder, MoreVertical, Edit, Trash, Download, Lock, Copy, Share, Star } from "lucide-react"
import { formatFileSize, formatDate } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function FileExplorer() {
  const { files, isLoading, error, navigateToFolder, renameItem, deleteItem, toggleLock, toggleFavorite } =
    useFileContext()

  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [newName, setNewName] = useState("")

  const handleFolderClick = (folderId: number) => {
    navigateToFolder(folderId)
  }

  const handleRenameClick = (item: any) => {
    setSelectedItem(item)
    setNewName(item.name)
    setRenameDialogOpen(true)
  }

  const handleDeleteClick = (item: any) => {
    setSelectedItem(item)
    setDeleteDialogOpen(true)
  }

  const handleRenameConfirm = async () => {
    if (selectedItem && newName) {
      await renameItem(selectedItem.id, newName, selectedItem.type === "folder")
      setRenameDialogOpen(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (selectedItem) {
      await deleteItem(selectedItem.id, selectedItem.type === "folder")
      setDeleteDialogOpen(false)
    }
  }

  const handleToggleLock = async (item: any) => {
    await toggleLock(item.id, item.type === "folder")
  }

  const handleToggleFavorite = async (item: any) => {
    await toggleFavorite(item.id, item.type === "folder")
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (viewMode === "list") {
    return (
      <>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Name</TableHead>
                <TableHead>Modified</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    This folder is empty
                  </TableCell>
                </TableRow>
              ) : (
                files.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {item.type === "folder" ? (
                          <button
                            onClick={() => handleFolderClick(item.id)}
                            className="flex items-center gap-2 hover:underline"
                          >
                            <Folder className="h-4 w-4 text-blue-500" />
                            <span>{item.name}</span>
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <File className="h-4 w-4 text-gray-500" />
                            <span>{item.name}</span>
                          </div>
                        )}
                        {item.is_locked && <Lock className="h-3 w-3 text-yellow-500" />}
                        {item.is_favorite && <Star className="h-3 w-3 text-yellow-500" />}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(new Date(item.updated_at))}</TableCell>
                    <TableCell>{item.type === "folder" ? "--" : formatFileSize(item.size)}</TableCell>
                    <TableCell>{item.type === "folder" ? "Folder" : item.extension || "File"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleRenameClick(item)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Rename</span>
                          </DropdownMenuItem>
                          {item.type !== "folder" && (
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              <span>Download</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Copy</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="mr-2 h-4 w-4" />
                            <span>Share</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleLock(item)}>
                            <Lock className="mr-2 h-4 w-4" />
                            <span>{item.is_locked ? "Unlock" : "Lock"}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleFavorite(item)}>
                            <Star className="mr-2 h-4 w-4" />
                            <span>{item.is_favorite ? "Remove from Favorites" : "Add to Favorites"}</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClick(item)}>
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Rename Dialog */}
        <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename {selectedItem?.type === "folder" ? "Folder" : "File"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={newName} onChange={(e) => setNewName(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleRenameConfirm}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete {selectedItem?.type === "folder" ? "Folder" : "File"}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Are you sure you want to delete "{selectedItem?.name}"?</p>
              {selectedItem?.type === "folder" && (
                <p className="text-red-500 mt-2">This will also delete all files and folders inside it.</p>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {files.length === 0 ? (
        <div className="col-span-full text-center py-8 text-muted-foreground">This folder is empty</div>
      ) : (
        files.map((item: any) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
            onClick={() => item.type === "folder" && handleFolderClick(item.id)}
          >
            {item.type === "folder" ? (
              <Folder className="h-12 w-12 text-blue-500" />
            ) : (
              <File className="h-12 w-12 text-gray-500" />
            )}
            <div className="mt-2 text-center">
              <div className="flex items-center gap-1 justify-center">
                <span className="text-sm font-medium truncate max-w-[100px]">{item.name}</span>
                {item.is_locked && <Lock className="h-3 w-3 text-yellow-500" />}
                {item.is_favorite && <Star className="h-3 w-3 text-yellow-500" />}
              </div>
              <p className="text-xs text-muted-foreground">
                {item.type === "folder" ? "Folder" : formatFileSize(item.size)}
              </p>
            </div>
          </div>
        ))
      )}

      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename {selectedItem?.type === "folder" ? "Folder" : "File"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenameConfirm}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {selectedItem?.type === "folder" ? "Folder" : "File"}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete "{selectedItem?.name}"?</p>
            {selectedItem?.type === "folder" && (
              <p className="text-red-500 mt-2">This will also delete all files and folders inside it.</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
