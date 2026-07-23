"use client"

import { useTranslations } from "next-intl"
import { IconSearch } from "@tabler/icons-react"

import { Input } from "@workspace/ui/components/input"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"

import type { DashboardUser } from "../../config/types"

import { DashboardNotifications } from "./dashboard-notifications"
import { DashboardUserMenu } from "./dashboard-user-menu"

type DashboardSearchHeaderProps = {
  user: DashboardUser
}

export function DashboardSearchHeader({ user }: DashboardSearchHeaderProps) {
  const t = useTranslations("DashboardShell")

  return (
    <header className="flex shrink-0 flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-3 sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <SidebarTrigger
          aria-label={t("toggleSidebar")}
          className="size-10 shrink-0 sm:size-12"
        />
        <div className="relative min-w-0 flex-1">
          <IconSearch className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground sm:size-5" />
          <Input
            type="search"
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchAriaLabel")}
            className="h-10 rounded-full border-input bg-background pl-11 text-sm shadow-none sm:h-12"
          />
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-end gap-2 self-end sm:self-auto">
        <DashboardNotifications />
        <DashboardUserMenu user={user} />
      </div>
    </header>
  )
}
