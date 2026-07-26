"use client"

import { useTranslations } from "next-intl"

import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"

import { UPCOMING_EVENTS } from "../../config/overview-content"

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
      <ul className="mt-4 divide-y divide-border">
        {UPCOMING_EVENTS.map((event) => (
          <li
            key={event.key}
            className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="font-medium text-foreground">{t(event.titleKey)}</p>
              <p className="text-sm text-muted-foreground">{t(event.scheduleKey)}</p>
            </div>
            <Badge
              variant="outline"
              className="border-brand-mint/30 bg-brand-mint/10 text-brand-mint"
            >
              {t(event.typeKey)}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  )
}
