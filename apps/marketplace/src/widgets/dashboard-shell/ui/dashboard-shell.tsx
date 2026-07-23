"use client"

import * as React from "react"

import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar"

import type { DashboardRole, DashboardUser } from "../config/types"

import { DashboardSearchHeader } from "./components/dashboard-search-header"
import { AppSidebar } from "./app-sidebar"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_STATE_EVENT = "sidebar-state-change"

function readSidebarOpenState() {
  if (typeof document === "undefined") {
    return true
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${SIDEBAR_COOKIE_NAME}=(true|false)`)
  )

  if (!match) {
    return true
  }

  return match[1] === "true"
}

function subscribeToSidebarState(onStoreChange: () => void) {
  window.addEventListener(SIDEBAR_STATE_EVENT, onStoreChange)
  return () => window.removeEventListener(SIDEBAR_STATE_EVENT, onStoreChange)
}

function usePersistedSidebarOpen() {
  const open = React.useSyncExternalStore(
    subscribeToSidebarState,
    readSidebarOpenState,
    () => true
  )

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState =
        typeof value === "function" ? value(readSidebarOpenState()) : value

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      window.dispatchEvent(new Event(SIDEBAR_STATE_EVENT))
    },
    []
  )

  return [open, setOpen] as const
}

type DashboardShellProps = {
  role: DashboardRole
  user: DashboardUser
  children: React.ReactNode
}

export function DashboardShell({ role, user, children }: DashboardShellProps) {
  const [open, setOpen] = usePersistedSidebarOpen()

  return (
    <SidebarProvider
      open={open}
      onOpenChange={setOpen}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 16)",
        } as React.CSSProperties
      }
    >
      <AppSidebar role={role} user={user} variant="inset" />
      <SidebarInset className="bg-background">
        <DashboardSearchHeader user={user} />
        <div className="flex flex-1 flex-col px-4 pb-6 sm:px-6 sm:pb-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
