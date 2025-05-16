"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Lock, Mail, User } from "lucide-react"
import { login } from "@/app/actions/auth"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [loginSuccess, setLoginSuccess] = useState(false)

  useEffect(() => {
    // If login was successful, navigate to dashboard
    if (loginSuccess) {
      router.push("/dashboard")
    }
  }, [loginSuccess, router])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // For demo, we'll just call login without validating
      const result = await login(new FormData())

      if (result.success) {
        setLoginSuccess(true)
        // Set a cookie directly from client-side as a backup
        document.cookie = "auth_token=demo-user-logged-in; path=/; max-age=604800; SameSite=Lax"

        // Force navigation after a short delay
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 500)
      } else {
        setError(result.message || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // For demo, we'll just call login
      const result = await login(new FormData())

      if (result.success) {
        setLoginSuccess(true)
        // Set a cookie directly from client-side as a backup
        document.cookie = "auth_token=demo-user-logged-in; path=/; max-age=604800; SameSite=Lax"

        // Force navigation after a short delay
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 500)
      } else {
        setError(result.message || "Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <Tabs defaultValue="login">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Access your personal vault securely</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && <div className="text-sm text-red-500">{error}</div>}

              <Alert>
                <AlertDescription>
                  <strong>Demo Mode:</strong>
                  <br />
                  For this demo, any login credentials will work.
                  <br />
                  Just click the Login button to continue.
                  <br />
                  <br />
                  <Link href="/dashboard" className="text-primary underline">
                    Or click here to go directly to the dashboard
                  </Link>
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="demo@example.com"
                    className="pl-10"
                    defaultValue="demo@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="p-0 h-auto text-xs">
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" name="password" type="password" className="pl-10" defaultValue="password123" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" name="remember" />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  document.cookie = "auth_token=demo-user-logged-in; path=/; max-age=604800; SameSite=Lax"
                  window.location.href = "/dashboard"
                }}
              >
                Skip Login (Demo Mode)
              </Button>
            </CardFooter>
          </form>
        </TabsContent>

        <TabsContent value="register">
          <form onSubmit={handleRegister}>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>Get started with your personal vault</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && <div className="text-sm text-red-500">{error}</div>}

              <Alert>
                <AlertDescription>
                  For demo purposes, any registration will log you in as the demo user.
                  <br />
                  Just click the Create account button to continue.
                  <br />
                  <br />
                  <Link href="/dashboard" className="text-primary underline">
                    Or click here to go directly to the dashboard
                  </Link>
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="name" name="name" placeholder="John Doe" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="register-password" name="password" type="password" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="confirm-password" name="confirm-password" type="password" className="pl-10" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  document.cookie = "auth_token=demo-user-logged-in; path=/; max-age=604800; SameSite=Lax"
                  window.location.href = "/dashboard"
                }}
              >
                Skip Registration (Demo Mode)
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
