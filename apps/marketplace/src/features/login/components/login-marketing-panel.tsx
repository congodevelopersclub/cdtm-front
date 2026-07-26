"use client"

import { useTranslations } from "next-intl"
import { IconStar } from "@tabler/icons-react"

export function LoginMarketingPanel() {
  const t = useTranslations("Login")

  const stats = [
    { value: t("statTalentsValue"), label: t("statTalentsLabel") },
    { value: t("statCompaniesValue"), label: t("statCompaniesLabel") },
    { value: t("statRolesValue"), label: t("statRolesLabel") },
  ]

  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-secondary/50 p-10 lg:flex lg:p-12 xl:p-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-brand-mint/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -bottom-16 size-64 rounded-full bg-brand-orange/10 blur-3xl"
      />

      <div className="relative z-10 flex flex-col gap-8">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
          <IconStar className="size-3.5 text-brand-orange" />
          {t("welcomeBadge")}
        </span>

        <div className="max-w-lg space-y-4">
          <h1 className="text-4xl leading-tight font-semibold tracking-tight text-foreground xl:text-5xl">
            {t("headline")}{" "}
            <span className="text-primary">{t("headlineAccent")}</span>
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            {t("subheadline")}
          </p>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-2xl font-semibold tracking-tight text-foreground">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
