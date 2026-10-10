"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import type { ComponentType } from "react"

import { cn } from "@workspace/ui/lib/utils"

type DashboardStatTileProps = {
  value: string
  labelKey: string
  icon: ComponentType<{ className?: string }>
  href?: string
  className?: string
}

export function DashboardStatTile({
  value,
  labelKey,
  icon: Icon,
  href,
  className,
}: DashboardStatTileProps) {
  const t = useTranslations("DashboardOverview")
  const label = t(labelKey)
  const classNames = cn(
    "flex flex-col rounded-3xl border border-border bg-card p-5 sm:p-6",
    href && "transition-colors hover:border-primary/30",
    className,
  )
  const content = (
    <>
      <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-foreground">
        <Icon className="size-5" />
      </span>
      <p className="mt-6 text-3xl font-semibold tabular-nums text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
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
