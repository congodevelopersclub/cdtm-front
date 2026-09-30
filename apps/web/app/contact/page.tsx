import { createPageMetadata } from "@/shared/lib/metadata"

export { ContactPage as default } from "@/pages/contact"

export async function generateMetadata() {
  return createPageMetadata("contact")
}
