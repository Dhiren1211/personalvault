"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function StorageUsage() {
  // Mock data
  const totalStorage = 10 * 1024 * 1024 * 1024 // 10 GB
  const usedStorage = 3.7 * 1024 * 1024 * 1024 // 3.7 GB
  const usedPercentage = (usedStorage / totalStorage) * 100

  const formatStorage = (bytes: number) => {
    const gigabytes = bytes / (1024 * 1024 * 1024)
    return `${gigabytes.toFixed(1)} GB`
  }

  const storageTypes = [
    { type: "Documents", size: 1.2 * 1024 * 1024 * 1024, color: "bg-blue-500" },
    { type: "Images", size: 1.5 * 1024 * 1024 * 1024, color: "bg-green-500" },
    { type: "Videos", size: 0.8 * 1024 * 1024 * 1024, color: "bg-yellow-500" },
    { type: "Other", size: 0.2 * 1024 * 1024 * 1024, color: "bg-purple-500" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Storage Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{formatStorage(usedStorage)} used</span>
              <span className="font-medium">{formatStorage(totalStorage)} total</span>
            </div>
            <Progress value={usedPercentage} className="h-2" />
          </div>

          <div className="space-y-2">
            {storageTypes.map((item) => (
              <div key={item.type} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${item.color}`} />
                  <span className="text-sm">{item.type}</span>
                </div>
                <span className="text-sm font-medium">{formatStorage(item.size)}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
