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

  return (
    <div
      className={cn(
        isDashboard
          ? "text-foreground"
          : "mx-2 rounded-lg bg-surface-elevated-dark p-3 text-surface-elevated-dark-foreground",
      )}
    >
      <p className={cn("text-sm leading-snug font-medium", isDashboard && "text-base")}>
        {t("profileComplete", { percent })}
      </p>
      <p
        className={cn(
          "mt-2 text-xs leading-relaxed",
          isDashboard ? "text-muted-foreground" : "text-surface-elevated-dark-muted",
        )}
      >
        {t("profileCompleteDescription")}
      </p>
      <div
        className={cn(
          "mt-4 h-3 overflow-hidden rounded-full",
          isDashboard ? "bg-muted" : "bg-[var(--progress-track)]",
        )}
      >
        <div
          className="h-full rounded-full bg-brand-orange transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item.key}
            className="flex items-center justify-between gap-2 text-xs sm:text-sm"
          >
            <span className="flex min-w-0 flex-1 items-center gap-2">
              {item.done ? (
                <IconCircleCheck className="size-4 shrink-0 text-brand-mint" />
              ) : (
                <IconCircle className="size-4 shrink-0 text-muted-foreground" />
              )}
              <span className="flex flex-wrap items-center gap-1">
                {!item.done ? t("addPrefix") : null}
                <Link
                  href={item.href}
                  className={cn(
                    "underline-offset-2 hover:underline",
                    item.done
                      ? "text-muted-foreground line-through"
                      : isDashboard
                        ? "text-primary hover:text-brand-orange"
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
    </div>
  )
}
