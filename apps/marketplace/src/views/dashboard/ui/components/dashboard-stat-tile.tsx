"use client"

import { useTranslations } from "next-intl"

import { cn } from "@workspace/ui/lib/utils"

type DashboardStatTileProps = {
  value: string
  labelKey: string
  className?: string
}

export function DashboardStatTile({
  value,
  labelKey,
  className,
}: DashboardStatTileProps) {
  const t = useTranslations("DashboardOverview")

  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-3xl border border-border bg-card p-5 sm:p-6",
        className,
      )}
    >
      <p className="text-2xl font-semibold tabular-nums text-foreground sm:text-3xl">
        {value}
      </p>
      <p className="mt-3 text-sm font-medium text-foreground">{t(labelKey)}</p>
    </div>
  )
}
