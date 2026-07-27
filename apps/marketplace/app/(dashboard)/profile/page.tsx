import { createPageMetadata } from "@/shared/lib/metadata"

export { ProfilePage as default } from "@/pages/profile"

export async function generateMetadata() {
  return createPageMetadata("profile")
}
