import { Suspense } from "react"

import { LoginPage } from "@/pages/login"
import { Skeleton } from "@workspace/ui/components/skeleton"

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center p-6">
          <Skeleton className="h-80 w-full max-w-md rounded-xl" />
        </div>
      }
    >
      <LoginPage />
    </Suspense>
  )
}
