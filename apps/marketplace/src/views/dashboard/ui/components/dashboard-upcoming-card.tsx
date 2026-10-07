"use client"

import { useTranslations } from "next-intl"

import { cn } from "@workspace/ui/lib/utils"

type DashboardUpcomingCardProps = {
  className?: string
}

export function DashboardUpcomingCard({ className }: DashboardUpcomingCardProps) {
  const t = useTranslations("DashboardOverview")

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6",
        className,
      )}
    >
      <h2 className="text-base font-semibold text-foreground">{t("upcomingTitle")}</h2>
      <p className="mt-2 text-sm font-medium text-foreground">{t("upcomingEmptyTitle")}</p>
      <p className="mt-1 text-sm text-muted-foreground">{t("upcomingEmptyDescription")}</p>
    </div>
  )
}
