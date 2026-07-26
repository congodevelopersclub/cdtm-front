import { Suspense } from "react"

import { AuthPageGuard, LoginPage } from "@/pages/login"
import { Skeleton } from "@workspace/ui/components/skeleton"

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-svh lg:grid-cols-2">
          <Skeleton className="hidden lg:block" />
          <div className="flex items-center justify-center p-6">
            <Skeleton className="h-80 w-full max-w-md rounded-3xl" />
          </div>
        </div>
      }
    >
      <AuthPageGuard>
        <LoginPage />
      </AuthPageGuard>
    </Suspense>
  )
}
