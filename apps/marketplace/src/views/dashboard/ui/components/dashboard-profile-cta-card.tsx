"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

type DashboardProfileCtaCardProps = {
  className?: string
}

export function DashboardProfileCtaCard({ className }: DashboardProfileCtaCardProps) {
  const t = useTranslations("DashboardOverview")

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-3xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6",
        className,
      )}
    >
      <div className="min-w-0">
        <p className="text-base font-semibold text-foreground">{t("keepSharpTitle")}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t("keepSharpDescription")}</p>
      </div>
      <Button
        asChild
        className="shrink-0 self-start rounded-xl sm:self-center"
      >
        <Link href="/profile">{t("updateProfile")}</Link>
      </Button>
    </div>
  )
}
