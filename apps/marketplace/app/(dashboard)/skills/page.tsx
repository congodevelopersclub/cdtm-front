import { Suspense } from "react"

import { SkillsPage } from "@/pages/skills"
import { createPageMetadata } from "@/shared/lib/metadata"

export async function generateMetadata() {
  return createPageMetadata("skills")
}

export default function Page() {
  return (
    <Suspense>
      <SkillsPage />
    </Suspense>
  )
}
