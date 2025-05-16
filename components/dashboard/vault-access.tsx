"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Unlock, Shield } from "lucide-react"

export function VaultAccess() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState("")

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate vault unlocking
    setTimeout(() => {
      if (password === "password") {
        // Demo password
        setIsUnlocked(true)
        router.push("/dashboard/vault/files")
      } else {
        setError("Incorrect password. Please try again.")
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          {isUnlocked ? <Unlock className="h-8 w-8 text-primary" /> : <Lock className="h-8 w-8 text-primary" />}
        </div>
        <CardTitle className="text-2xl">Personal Vault</CardTitle>
        <CardDescription>Enter your password to access your secure files and notes</CardDescription>
      </CardHeader>
      <form onSubmit={handleUnlock}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Vault Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your vault password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Your vault is protected with end-to-end encryption</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Unlocking..." : "Unlock Vault"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
