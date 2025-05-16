"use client"
import { useFileContext } from "@/components/context/file-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileExplorer } from "@/components/dashboard/file-explorer"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Home } from "lucide-react"
import { FileToolbar } from "./file-toolbar"

export function FileViewer() {
  const { currentFolder, navigateToFolder, navigateUp, breadcrumbs, isLoading } = useFileContext()

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="outline" size="icon" onClick={navigateUp} disabled={isLoading}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>

        <Button variant="outline" size="icon" onClick={() => navigateToFolder(null)} disabled={isLoading}>
          <Home className="h-4 w-4" />
          <span className="sr-only">Home</span>
        </Button>

        <div className="flex items-center">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />}
              <Button
                variant="link"
                className="h-auto p-0"
                onClick={() => navigateToFolder(crumb.id)}
                disabled={isLoading || currentFolder === crumb.id}
              >
                {crumb.name}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <FileToolbar />

      <Tabs defaultValue="all" className="flex-1">
        <TabsList>
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="flex-1 mt-4">
          <FileExplorer />
        </TabsContent>
        <TabsContent value="recent" className="flex-1 mt-4">
          <FileExplorer />
        </TabsContent>
        <TabsContent value="favorites" className="flex-1 mt-4">
          <FileExplorer />
        </TabsContent>
        <TabsContent value="shared" className="flex-1 mt-4">
          <FileExplorer />
        </TabsContent>
      </Tabs>
    </div>
  )
}
