import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define public paths that don't require authentication
const publicPaths = ["/", "/api/auth/login", "/api/auth/register", "/seed"]

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the path is public
  if (publicPaths.some((p) => path === p || path.startsWith(p))) {
    return NextResponse.next()
  }

  // Get the token from the cookies
  const token = request.cookies.get("auth_token")?.value

  // Debug log
  console.log(`Middleware checking path: ${path}, token: ${token ? "exists" : "missing"}`)

  // If there's no token, redirect to login
  if (!token) {
    console.log("No auth token found, redirecting to login")
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Token exists, proceed
  console.log("Auth token found, proceeding to dashboard")
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except for static files, api routes, and _next
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
}
