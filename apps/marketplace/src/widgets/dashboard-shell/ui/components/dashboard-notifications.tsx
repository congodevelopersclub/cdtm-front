"use client"

import { useTranslations } from "next-intl"
import { IconBell } from "@tabler/icons-react"

import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

export function DashboardNotifications() {
  const t = useTranslations("DashboardShell")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative size-10 shrink-0 rounded-full sm:size-12"
          aria-label={t("notifications")}
        >
          <IconBell className="size-5 sm:size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[min(20rem,calc(100vw-2rem))] rounded-lg"
      >
        <DropdownMenuLabel>{t("notifications")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-6 text-center">
          <p className="text-sm font-medium text-foreground">
            {t("noNotifications")}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("noNotificationsDescription")}
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
