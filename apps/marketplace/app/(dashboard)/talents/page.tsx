import { Suspense } from "react"

import { TalentsPage } from "@/pages/talents"
import { createPageMetadata } from "@/shared/lib/metadata"

export async function generateMetadata() {
  return createPageMetadata("talents")
}

export default function Page() {
  return (
    <Suspense>
      <TalentsPage />
    </Suspense>
  )
}
