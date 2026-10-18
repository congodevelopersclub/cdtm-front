import { LegalPage } from "@/pages/legal"
import { createPageMetadata } from "@/shared/lib/metadata"

export async function generateMetadata() {
  return createPageMetadata("cookies")
}

export default function CookiesPage() {
  return <LegalPage page="cookies" />
}
