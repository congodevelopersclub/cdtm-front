"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

import {
  getProfileCompletion,
  MOCK_TALENT_PROFILE,
} from "@/entities/talent"

export function ProfileCompletionCard() {
  const t = useTranslations("DashboardShell")
  const { percent, items } = getProfileCompletion(MOCK_TALENT_PROFILE)

  return (
    <div className="mx-2 rounded-lg bg-surface-elevated-dark p-3 text-surface-elevated-dark-foreground">
      <p className="text-sm leading-snug font-medium">
        {t("profileComplete", { percent })}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-surface-elevated-dark-muted">
        {t("profileCompleteDescription")}
      </p>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--progress-track)]">
        <div
          className="h-full rounded-full bg-brand-orange transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li
            key={item.key}
            className="flex items-center justify-between gap-2 text-xs"
          >
            <span className="flex flex-wrap items-center gap-1">
              {t("addPrefix")}
              <Link
                href={item.href}
                className="rounded-full underline underline-offset-2 hover:text-brand-orange"
              >
                {t(item.labelKey)}
              </Link>
            </span>
            <span className="shrink-0 text-surface-elevated-dark-muted">
              {item.percent}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
