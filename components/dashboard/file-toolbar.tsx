"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Upload, FolderPlus, List, Grid, Filter, SortAsc, SortDesc, Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useFileContext } from "@/components/context/file-context"

export function FileToolbar() {
  const { createNewFolder } = useFileContext()
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateFolder = async () => {
    if (newFolderName.trim()) {
      setIsCreating(true)
      try {
        await createNewFolder(newFolderName.trim())
        setNewFolderName("")
        setNewFolderDialogOpen(false)
      } catch (error) {
        console.error("Error creating folder:", error)
      } finally {
        setIsCreating(false)
      }
    }
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 p-2 bg-background rounded-lg border">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" onClick={() => setNewFolderDialogOpen(true)}>
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search files..."
              className="w-full pl-9 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <SortAsc className="mr-2 h-4 w-4" />
                <span>Name (A-Z)</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SortDesc className="mr-2 h-4 w-4" />
                <span>Name (Z-A)</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SortDesc className="mr-2 h-4 w-4" />
                <span>Date (Newest)</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SortAsc className="mr-2 h-4 w-4" />
                <span>Date (Oldest)</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SortDesc className="mr-2 h-4 w-4" />
                <span>Size (Largest)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => setViewMode("list")}
            data-active={viewMode === "list"}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => setViewMode("grid")}
            data-active={viewMode === "grid"}
          >
            <Grid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
        </div>
      </div>

      {/* New Folder Dialog */}
      <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="folder-name">Folder Name</Label>
              <Input
                id="folder-name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="My Folder"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewFolderDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateFolder} disabled={isCreating || !newFolderName.trim()}>
              {isCreating ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
