import { ContactPage } from "@/pages/contact"
import { createPageMetadata } from "@/shared/lib/metadata"

export async function generateMetadata() {
  return createPageMetadata("contact")
}

export default function Page() {
  return <ContactPage />
}