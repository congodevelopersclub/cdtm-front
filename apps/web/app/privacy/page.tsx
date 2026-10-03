import { LegalPage } from "@/pages/legal"
import { createPageMetadata } from "@/shared/lib/metadata"

export async function generateMetadata() {
  return createPageMetadata("privacy")
}

export default function PrivacyPage() {
  return <LegalPage page="privacy" />
}
