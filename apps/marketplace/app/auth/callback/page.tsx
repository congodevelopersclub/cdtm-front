import { Suspense } from "react"

import { AuthCallbackPage } from "@/pages/auth-callback"
import { Skeleton } from "@workspace/ui/components/skeleton"

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center p-6">
          <Skeleton className="h-48 w-full max-w-md rounded-3xl" />
        </div>
      }
    >
      <AuthCallbackPage />
    </Suspense>
  )
}
