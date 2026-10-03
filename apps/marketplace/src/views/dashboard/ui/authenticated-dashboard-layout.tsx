"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { IconLoader2 } from "@tabler/icons-react"
import { DashboardLayout, mapToDashboardUser } from "@/widgets/dashboard-shell"

import { useAuth } from "@/features/auth"

export function AuthenticatedDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <IconLoader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <DashboardLayout user={mapToDashboardUser(user)}>{children}</DashboardLayout>
  )
}
