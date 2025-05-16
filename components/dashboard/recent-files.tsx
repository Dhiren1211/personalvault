"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { File, FileText, ImageIcon, Video } from "lucide-react"
import { formatFileSize, formatDate } from "@/lib/utils"

export function RecentFiles() {
  // Mock data
  const recentFiles = [
    {
      id: "1",
      name: "Project Proposal.docx",
      type: "document",
      size: 2.5 * 1024 * 1024,
      modifiedAt: new Date(2023, 4, 15),
    },
    {
      id: "2",
      name: "Presentation.pptx",
      type: "document",
      size: 5.8 * 1024 * 1024,
      modifiedAt: new Date(2023, 4, 14),
    },
    {
      id: "3",
      name: "Budget.xlsx",
      type: "document",
      size: 1.2 * 1024 * 1024,
      modifiedAt: new Date(2023, 4, 13),
    },
    {
      id: "4",
      name: "Team Photo.jpg",
      type: "image",
      size: 3.7 * 1024 * 1024,
      modifiedAt: new Date(2023, 4, 12),
    },
    {
      id: "5",
      name: "Meeting Recording.mp4",
      type: "video",
      size: 15.2 * 1024 * 1024,
      modifiedAt: new Date(2023, 4, 11),
    },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "image":
        return <ImageIcon className="h-4 w-4 text-green-500" />
      case "video":
        return <Video className="h-4 w-4 text-yellow-500" />
      default:
        return <File className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Files</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Modified</TableHead>
              <TableHead className="hidden sm:table-cell">Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentFiles.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getFileIcon(file.type)}
                    <span className="font-medium">{file.name}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(file.modifiedAt)}</TableCell>
                <TableCell className="hidden sm:table-cell">{formatFileSize(file.size)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
