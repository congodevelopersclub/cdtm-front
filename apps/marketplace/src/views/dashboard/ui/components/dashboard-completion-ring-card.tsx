"use client"

import { useTranslations } from "next-intl"

import { cn } from "@workspace/ui/lib/utils"

type DashboardCompletionRingCardProps = {
  percent: number
  className?: string
}

export function DashboardCompletionRingCard({
  percent,
  className,
}: DashboardCompletionRingCardProps) {
  const t = useTranslations("DashboardOverview")
  const clamped = Math.min(100, Math.max(0, percent))

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-6",
        className,
      )}
    >
      <p className="mb-4 text-sm font-medium text-muted-foreground">
        {t("profileCompletionTitle")}
      </p>
      <div
        className="relative flex size-28 items-center justify-center rounded-full sm:size-32 lg:size-36"
        style={{
          background: `conic-gradient(var(--color-brand-orange) ${clamped * 3.6}deg, var(--color-muted) 0deg)`,
        }}
      >
        <div className="flex size-[calc(100%-16px)] flex-col items-center justify-center rounded-full bg-card">
          <span className="text-3xl font-semibold tabular-nums text-foreground">
            {clamped}%
          </span>
        </div>
      </div>
    </div>
  )
}
