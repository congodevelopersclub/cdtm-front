import { Suspense } from "react"

import { TalentsPage } from "@/pages/talents"

export default function Page() {
  return (
    <Suspense>
      <TalentsPage />
    </Suspense>
  )
}
