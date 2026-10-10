"use client"

import Image from "next/image"
import Link from "next/link"
import { IconMapPin } from "@tabler/icons-react"
import { useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { getInitials } from "@/entities/talent"

type DashboardProfileHeroCardProps = {
  name: string
  title: string
  avatarUrl?: string | null
  location?: string
  className?: string
}

export function DashboardProfileHeroCard({
  name,
  title,
  avatarUrl,
  location,
  className,
}: DashboardProfileHeroCardProps) {
  const t = useTranslations("DashboardOverview")
  const initials = getInitials(name)

  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-3xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6",
        className,
      )}
    >
      <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-brand-steel-blue text-xl font-semibold text-primary-foreground sm:size-20">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="80px"
            priority
          />
        ) : (
          initials
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xl font-semibold text-foreground sm:text-2xl">{name}</p>
        {title ? <p className="mt-1 truncate text-sm text-muted-foreground">{title}</p> : null}
        {location ? (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            <IconMapPin className="size-3.5" />
            {location}
          </p>
        ) : null}
      </div>
      <Button
        asChild
        className="shrink-0 self-start rounded-xl sm:self-center"
      >
        <Link href="/profile">{t("viewProfile")}</Link>
      </Button>
    </div>
  )
}
