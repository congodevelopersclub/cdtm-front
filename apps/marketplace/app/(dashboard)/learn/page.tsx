import { DashboardFeaturePage } from "@/pages/stub"
import { createPageMetadata } from "@/shared/lib/metadata"

export async function generateMetadata() {
  return createPageMetadata("learn")
}

export default function Page() {
  return <DashboardFeaturePage pageKey="learn" />
}
