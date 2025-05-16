"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Demo user data
const DEMO_USER = {
  id: 1,
  email: "demo@example.com",
  name: "Demo User",
}

// Simple token - just a marker that the user is logged in
const AUTH_TOKEN = "demo-user-logged-in"

export async function login(formData: FormData) {
  try {
    // Set auth cookie - for demo, we'll always succeed
    cookies().set({
      name: "auth_token",
      value: AUTH_TOKEN,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return {
      success: true,
      user: DEMO_USER,
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "An error occurred during login" }
  }
}

export async function register() {
  // For demo purposes, just use the login function
  return login(new FormData())
}

export async function logout() {
  cookies().delete("auth_token")
  redirect("/")
}

export async function getCurrentUser() {
  const token = cookies().get("auth_token")?.value

  if (!token || token !== AUTH_TOKEN) {
    return null
  }

  // Always return the demo user if token exists
  return DEMO_USER
}
