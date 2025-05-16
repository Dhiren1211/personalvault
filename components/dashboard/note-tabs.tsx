"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Plus, FileText } from "lucide-react"

export function NoteTabs() {
  const [activeTab, setActiveTab] = useState("note-1")
  const [notes, setNotes] = useState([
    { id: "note-1", title: "Meeting Notes" },
    { id: "note-2", title: "Project Ideas" },
    { id: "note-3", title: "To-Do List" },
  ])

  const handleCloseTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newNotes = notes.filter((note) => note.id !== id)
    setNotes(newNotes)

    if (activeTab === id && newNotes.length > 0) {
      setActiveTab(newNotes[0].id)
    }
  }

  const handleAddNote = () => {
    const newId = `note-${notes.length + 1}`
    const newNote = { id: newId, title: `New Note ${notes.length + 1}` }
    setNotes([...notes, newNote])
    setActiveTab(newId)
  }

  return (
    <div className="flex items-center border-b bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="h-10 p-0 bg-transparent">
          {notes.map((note) => (
            <TabsTrigger
              key={note.id}
              value={note.id}
              className="relative h-10 px-4 data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{note.title}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 hover:opacity-100"
                  onClick={(e) => handleCloseTab(note.id, e)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none" onClick={handleAddNote}>
        <Plus className="h-4 w-4" />
        <span className="sr-only">New Note</span>
      </Button>
    </div>
  )
}
