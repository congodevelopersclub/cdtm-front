import { LegalPage } from "@/pages/legal"
import { createPageMetadata } from "@/shared/lib/metadata"

export async function generateMetadata() {
  return createPageMetadata("terms")
}

export default function TermsPage() {
  return <LegalPage page="terms" />
}
