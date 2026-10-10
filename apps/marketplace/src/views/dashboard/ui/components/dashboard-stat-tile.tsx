"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

import { cn } from "@workspace/ui/lib/utils"

type DashboardStatTileProps = {
  value: string
  labelKey: string
  href?: string
  className?: string
}

export function DashboardStatTile({
  value,
  labelKey,
  href,
  className,
}: DashboardStatTileProps) {
  const t = useTranslations("DashboardOverview")
  const label = t(labelKey)
  const classNames = cn(
    "flex flex-col justify-between rounded-3xl border border-border bg-card p-5 sm:p-6",
    href && "transition-colors hover:border-brand-orange/40 hover:bg-accent",
    className,
  )
  const content = (
    <>
      <p className="text-2xl font-semibold tabular-nums text-foreground sm:text-3xl">
        {value}
      </p>
      <p className="mt-3 text-sm font-medium text-foreground">{label}</p>
    </>
  )

  if (href) {
    return (
      <Link href={href} aria-label={label} className={classNames}>
        {content}
      </Link>
    )
  }

  return <div className={classNames}>{content}</div>
}
