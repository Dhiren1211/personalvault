"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"

export default function Home() {
  const router = useRouter()

  // Check if we already have an auth token
  useEffect(() => {
    const hasToken = document.cookie.includes("auth_token=")
    if (hasToken) {
      router.push("/dashboard")
    }
  }, [router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">MyPersonalVault</h1>
          <p className="mt-2 text-muted-foreground">Your secure personal file management system</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
