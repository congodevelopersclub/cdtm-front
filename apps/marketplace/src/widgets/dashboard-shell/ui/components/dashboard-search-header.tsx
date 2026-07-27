"use client"

import { useTranslations } from "next-intl"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"

import type { DashboardRole, DashboardUser } from "../../config/types"

import { DashboardNotifications } from "./dashboard-notifications"
import { DashboardGlobalSearch } from "./dashboard-global-search"
import { DashboardUserMenu } from "./dashboard-user-menu"

type DashboardSearchHeaderProps = {
  role: DashboardRole
  user: DashboardUser
}

export function DashboardSearchHeader({ role, user }: DashboardSearchHeaderProps) {
  const t = useTranslations("DashboardShell")

  return (
    <header className="flex shrink-0 flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-3 sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <SidebarTrigger
          aria-label={t("toggleSidebar")}
          className="size-10 shrink-0 sm:size-12"
        />
        <DashboardGlobalSearch role={role} />
      </div>
      <div className="flex shrink-0 items-center justify-end gap-2 self-end sm:self-auto">
        <DashboardNotifications />
        <DashboardUserMenu user={user} />
      </div>
    </header>
  )
}
