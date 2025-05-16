"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Save,
  Download,
  Lock,
} from "lucide-react"

export function NoteEditor() {
  const [content, setContent] = useState<string>("")
  const [isSaving, setIsSaving] = useState<boolean>(false)

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (content) {
        console.log("Auto-saving note...")
        // Simulate saving
        setIsSaving(true)
        setTimeout(() => {
          setIsSaving(false)
        }, 500)
      }
    }, 30000) // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval)
  }, [content])

  const handleSave = () => {
    setIsSaving(true)
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-1 p-2 border-b bg-background">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Underline className="h-4 w-4" />
          <span className="sr-only">Underline</span>
        </Button>

        <div className="h-4 w-px bg-border mx-1" />

        <Button variant="ghost" size="icon" className="h-8 w-8">
          <List className="h-4 w-4" />
          <span className="sr-only">Bullet List</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Numbered List</span>
        </Button>

        <div className="h-4 w-px bg-border mx-1" />

        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignLeft className="h-4 w-4" />
          <span className="sr-only">Align Left</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignCenter className="h-4 w-4" />
          <span className="sr-only">Align Center</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignRight className="h-4 w-4" />
          <span className="sr-only">Align Right</span>
        </Button>

        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-1" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Lock className="h-4 w-4" />
            <span className="sr-only">Lock Note</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <textarea
          className="w-full h-full min-h-[300px] p-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Start typing your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  )
}
