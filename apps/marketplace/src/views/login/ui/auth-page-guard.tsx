"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { IconLoader2 } from "@tabler/icons-react"

import { useAuth } from "@/features/auth"

type AuthPageGuardProps = {
  children: ReactNode
}

export function AuthPageGuard({ children }: AuthPageGuardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const redirect = searchParams.get("redirect") ?? "/dashboard"
      router.replace(redirect)
    }
  }, [isAuthenticated, isLoading, router, searchParams])

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <IconLoader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <IconLoader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  return children
}
