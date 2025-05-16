import { NoteEditor } from "@/components/dashboard/note-editor"
import { NoteTabs } from "@/components/dashboard/note-tabs"

export default function NotesPage() {
  return (
    <div className="h-full flex flex-col">
      <NoteTabs />
      <NoteEditor />
    </div>
  )
}
