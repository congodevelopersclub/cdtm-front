import { Suspense } from "react"
import { IconLoader2 } from "@tabler/icons-react"

import { AuthCallbackPage } from "@/pages/auth-callback"

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center p-6">
          <IconLoader2 className="size-8 animate-spin text-primary" />
        </div>
      }
    >
      <AuthCallbackPage />
    </Suspense>
  )
}
