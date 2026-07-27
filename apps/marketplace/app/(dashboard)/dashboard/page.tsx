import { createPageMetadata } from "@/shared/lib/metadata"

export { DashboardPage as default } from "@/pages/dashboard"

export async function generateMetadata() {
  return createPageMetadata("dashboard")
}
