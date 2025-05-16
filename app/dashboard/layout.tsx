import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Header } from "@/components/dashboard/header"
import { FileContextProvider } from "@/components/context/file-context"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // For demo purposes, we'll create a hardcoded user
  const user = {
    id: 1,
    name: "Demo User",
    email: "demo@example.com",
  }

  return (
    <FileContextProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen w-full overflow-hidden bg-background">
          <AppSidebar user={user} />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header user={user} />
            <main className="flex-1 overflow-auto p-4">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </FileContextProvider>
  )
}
