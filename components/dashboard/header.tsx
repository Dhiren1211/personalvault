"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Search, Upload, FolderPlus, FilePlus, Bell, Plus } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
}

export function Header({ user }: { user: User }) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  // Get page title based on pathname
  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard"
      case "/dashboard/files":
        return "Files"
      case "/dashboard/notes":
        return "Notes"
      case "/dashboard/vault":
        return "Vault"
      default:
        return "Dashboard"
    }
  }

  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <SidebarTrigger className="mr-2" />
        <h1 className="text-xl font-semibold">{getPageTitle()}</h1>

        <div className="ml-auto flex items-center space-x-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search files and notes..."
              className="w-full pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Create new</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FilePlus className="mr-2 h-4 w-4" />
                <span>New Note</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FolderPlus className="mr-2 h-4 w-4" />
                <span>New Folder</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Upload className="mr-2 h-4 w-4" />
                <span>Upload File</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
