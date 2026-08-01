"use client"

import { TooltipProvider } from "@workspace/ui/components/tooltip"

import type { DashboardUser } from "../config/types"

import { DashboardShell } from "./dashboard-shell"

type DashboardLayoutProps = {
  children: React.ReactNode
  user: DashboardUser
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  return (
    <TooltipProvider>
      <DashboardShell role="talent" user={user}>
        {children}
      </DashboardShell>
    </TooltipProvider>
  )
}
