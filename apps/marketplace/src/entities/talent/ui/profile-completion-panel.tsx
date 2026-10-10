"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { IconCircleCheck, IconCircle } from "@tabler/icons-react"

import { cn } from "@workspace/ui/lib/utils"

import { getProfileCompletion } from "../lib/get-profile-completion"
import type { TalentProfile } from "../model/types"

type ProfileCompletionPanelProps = {
  profile: TalentProfile
  variant?: "sidebar" | "dashboard"
}

export function ProfileCompletionPanel({
  profile,
  variant = "sidebar",
}: ProfileCompletionPanelProps) {
  const t = useTranslations("DashboardShell")
  const { percent, items } = getProfileCompletion(profile)
  const isDashboard = variant === "dashboard"

  if (percent >= 100) {
    return null
  }

  const checklist = (
    <ul className={cn("space-y-3", isDashboard ? "mt-5" : "mt-4")}>
      {items.map((item) => (
        <li
          key={item.key}
          className="flex items-center justify-between gap-3 text-sm"
        >
          <span className="flex min-w-0 flex-1 items-center gap-2">
            {item.done ? (
              <IconCircleCheck className="size-4 shrink-0 text-brand-mint" />
            ) : isDashboard ? null : (
              <IconCircle className="size-4 shrink-0 text-muted-foreground" />
            )}
            <span
              className={cn(
                "inline-flex min-w-0 items-center gap-1.5",
                !item.done &&
                  isDashboard &&
                  "rounded-full bg-brand-orange px-3 py-1 text-accent-foreground",
              )}
            >
              {!item.done && isDashboard ? (
                <IconCircle className="size-4 shrink-0" />
              ) : null}
              {!item.done ? <span>{t("addPrefix")}</span> : null}
              <Link
                href={item.href}
                className={cn(
                  "underline-offset-2 hover:underline",
                  item.done
                    ? isDashboard
                      ? "text-foreground"
                      : "text-surface-elevated-dark-muted line-through"
                    : isDashboard
                      ? "text-accent-foreground"
                      : "rounded-full hover:text-brand-orange",
                )}
              >
                {t(item.labelKey)}
              </Link>
            </span>
          </span>
          <span
            className={cn(
              "shrink-0 tabular-nums",
              isDashboard ? "text-muted-foreground" : "text-surface-elevated-dark-muted",
            )}
          >
            {item.percent}%
          </span>
        </li>
      ))}
    </ul>
  )

  if (isDashboard) {
    return (
      <div className="text-foreground">
        <div className="flex items-center gap-4">
          <div
            className="relative flex size-20 shrink-0 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(var(--color-brand-orange) ${percent * 3.6}deg, var(--color-muted) 0deg)`,
            }}
          >
            <div className="flex size-[calc(100%-12px)] items-center justify-center rounded-full bg-card">
              <span className="text-lg font-semibold tabular-nums">{percent}%</span>
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-base font-semibold leading-snug">
              {t("profileComplete", { percent })}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {t("profileCompleteDescription")}
            </p>
          </div>
        </div>
        {checklist}
      </div>
    )
  }

  return (
    <div className="mx-2 rounded-lg bg-surface-elevated-dark p-3 text-sm text-surface-elevated-dark-foreground">
      <p className="leading-snug font-medium">{t("profileComplete", { percent })}</p>
      <p className="mt-2 text-xs leading-relaxed text-surface-elevated-dark-muted">
        {t("profileCompleteDescription")}
      </p>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--progress-track)]">
        <div
          className="h-full rounded-full bg-brand-orange transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      {checklist}
    </div>
  )
}
