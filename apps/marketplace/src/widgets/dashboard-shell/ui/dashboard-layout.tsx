"use client"

import { TooltipProvider } from "@workspace/ui/components/tooltip"

import { MOCK_TALENT_USER } from "../config/menus"

import { DashboardShell } from "./dashboard-shell"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <DashboardShell role="talent" user={MOCK_TALENT_USER}>
        {children}
      </DashboardShell>
    </TooltipProvider>
  )
}
