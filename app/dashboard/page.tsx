import { StorageUsage } from "@/components/dashboard/storage-usage"
import { RecentFiles } from "@/components/dashboard/recent-files"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <QuickActions />
        <RecentFiles />
      </div>
      <div className="space-y-6">
        <StorageUsage />
      </div>
    </div>
  )
}
