"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { IconBell } from "@tabler/icons-react"

import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

import { MOCK_NOTIFICATIONS } from "../../config/notifications"

function formatBadgeCount(count: number) {
  if (count > 99) {
    return "99+"
  }

  return String(count)
}

export function DashboardNotifications() {
  const t = useTranslations("DashboardShell")
  const unreadCount = MOCK_NOTIFICATIONS.filter((item) => !item.read).length

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
          {unreadCount > 0 ? (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-orange px-1 text-[10px] font-semibold text-primary-foreground sm:h-5 sm:min-w-5 sm:text-[11px]">
              {formatBadgeCount(unreadCount)}
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[min(20rem,calc(100vw-2rem))] rounded-lg"
      >
        <DropdownMenuLabel>{t("notifications")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {MOCK_NOTIFICATIONS.length === 0 ? (
          <div className="px-2 py-6 text-center">
            <p className="text-sm font-medium text-foreground">
              {t("noNotifications")}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("noNotificationsDescription")}
            </p>
          </div>
        ) : (
          MOCK_NOTIFICATIONS.map((notification) => (
            <DropdownMenuItem key={notification.id} asChild>
              <Link
                href={notification.href}
                className="flex flex-col items-start gap-0.5"
              >
                <span className="font-medium">{notification.title}</span>
                <span className="text-xs text-muted-foreground">
                  {notification.description}
                </span>
              </Link>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
