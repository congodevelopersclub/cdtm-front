import { createPageMetadata } from "@/shared/lib/metadata"

export { HomePage as default } from "@/pages/home"

export async function generateMetadata() {
  return createPageMetadata("home")
}
