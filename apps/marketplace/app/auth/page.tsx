import { Suspense } from "react"
import { IconLoader2 } from "@tabler/icons-react"

import { AuthPageGuard, LoginPage } from "@/pages/login"
import { serverEnv } from "@/shared/config/env.server"
import { createPageMetadata } from "@/shared/lib/metadata"

export async function generateMetadata() {
  return createPageMetadata("auth")
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center p-6">
          <IconLoader2 className="size-8 animate-spin text-primary" />
        </div>
      }
    >
      <AuthPageGuard>
        <LoginPage homeHref={serverEnv.LOGOUT_REDIRECT_URL} />
      </AuthPageGuard>
    </Suspense>
  )
}
