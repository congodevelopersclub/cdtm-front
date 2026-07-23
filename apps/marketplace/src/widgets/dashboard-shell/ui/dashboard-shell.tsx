"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar"

import type { DashboardRole, DashboardUser } from "../config/types"
import { getPageTitle } from "../config/menus"

import { AppSidebar } from "./app-sidebar"
import { SiteHeader } from "./site-header"

type DashboardShellProps = {
  role: DashboardRole
  user: DashboardUser
  children: React.ReactNode
}

export function DashboardShell({ role, user, children }: DashboardShellProps) {
  const pathname = usePathname()
  const title = getPageTitle(pathname, role)

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 60)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar role={role} user={user} variant="inset" />
      <SidebarInset>
        <SiteHeader title={title} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
