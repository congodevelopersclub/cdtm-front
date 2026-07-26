"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { IconArrowRight } from "@tabler/icons-react"

import { cn } from "@workspace/ui/lib/utils"

type DashboardProfileCtaCardProps = {
  name: string
  title: string
  avatarUrl?: string | null
  className?: string
}

export function DashboardProfileCtaCard({
  name,
  title,
  avatarUrl,
  className,
}: DashboardProfileCtaCardProps) {
  const t = useTranslations("DashboardOverview")

  return (
    <Link
      href="/profile"
      className={cn(
        "group relative flex min-h-[160px] flex-col justify-end overflow-hidden rounded-3xl border border-border bg-card p-5 sm:min-h-[180px] sm:p-6",
        className,
      )}
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt=""
          fill
          className="object-cover opacity-40 transition-opacity group-hover:opacity-50"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-brand-steel-blue/80 to-brand-orange/60" />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
      <div className="relative">
        <p className="text-lg font-semibold text-white">{t("viewProfile")}</p>
        <p className="mt-1 text-sm text-white/80">{t("viewProfileDescription")}</p>
        <p className="mt-3 truncate text-xs text-white/70">
          {name} · {title}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-orange">
          {t("viewProfile")}
          <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
