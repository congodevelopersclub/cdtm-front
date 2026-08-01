"use client"

import { useTranslations } from "next-intl"

import { cn } from "@workspace/ui/lib/utils"

type DashboardStatTileProps = {
  valueKey: string
  labelKey: string
  deltaKey?: string
  accent?: "mint" | "orange" | "steel"
  className?: string
}

const accentClasses = {
  mint: "text-brand-mint",
  orange: "text-brand-orange",
  steel: "text-primary",
} as const

export function DashboardStatTile({
  valueKey,
  labelKey,
  deltaKey,
  accent = "mint",
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
        {t(valueKey)}
      </p>
      <div className="mt-3">
        <p className="text-sm font-medium text-foreground">{t(labelKey)}</p>
        {deltaKey ? (
          <p className={cn("mt-1 text-xs", accentClasses[accent])}>{t(deltaKey)}</p>
        ) : null}
      </div>
    </div>
  )
}
