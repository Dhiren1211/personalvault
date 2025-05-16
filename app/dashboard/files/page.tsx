import { FileViewer } from "@/components/dashboard/file-viewer"
import { FileToolbar } from "@/components/dashboard/file-toolbar"

export default function FilesPage() {
  return (
    <div className="h-full flex flex-col">
      <FileToolbar />
      <FileViewer />
    </div>
  )
}
