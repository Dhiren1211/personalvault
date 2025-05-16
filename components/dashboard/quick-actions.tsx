"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FolderPlus, FilePlus, FileText, Lock, Download } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      icon: Upload,
      label: "Upload Files",
      description: "Upload files from your device",
      color: "text-blue-500",
    },
    {
      icon: FolderPlus,
      label: "New Folder",
      description: "Create a new folder",
      color: "text-green-500",
    },
    {
      icon: FilePlus,
      label: "New Note",
      description: "Create a new note",
      color: "text-yellow-500",
    },
    {
      icon: Lock,
      label: "Secure Vault",
      description: "Access your secure vault",
      color: "text-purple-500",
    },
    {
      icon: FileText,
      label: "Recent Notes",
      description: "View your recent notes",
      color: "text-orange-500",
    },
    {
      icon: Download,
      label: "Download All",
      description: "Download all your files",
      color: "text-red-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto flex flex-col items-center justify-center p-4 gap-2 hover:bg-accent"
            >
              <action.icon className={`h-8 w-8 ${action.color}`} />
              <div className="text-center">
                <div className="font-medium">{action.label}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
