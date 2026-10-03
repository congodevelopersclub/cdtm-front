import { redirect } from "next/navigation"

import { createPageMetadata } from "@/shared/lib/metadata"

export async function generateMetadata() {
  return createPageMetadata("auth")
}

export default function Page() {
  redirect("/auth")
}
