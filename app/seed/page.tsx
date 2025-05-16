import { redirect } from "next/navigation"

export default function SeedPage() {
  // Redirect to home page since we're using demo data now
  redirect("/")
}
