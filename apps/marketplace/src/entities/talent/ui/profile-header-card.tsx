"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { useTranslations } from "next-intl"
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconCheck,
  IconMail,
  IconMapPin,
  IconWorld,
} from "@tabler/icons-react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

import { TalentAvatar } from "./talent-avatar"
import type { TalentProfile } from "../model/types"

type ProfileHeaderCardProps = {
  profile: TalentProfile
  action?: ReactNode
}

function formatEmploymentStatus(
  status: string,
  t: (key: "fullTime" | "partTime" | "freelance") => string
) {
  if (status === "full-time") {
    return t("fullTime")
  }

  if (status === "part-time") {
    return t("partTime")
  }

  if (status === "feelance" || status === "freelance") {
    return t("freelance")
  }

  return status
}

function formatAccountStatus(
  status: string,
  t: (key: "pendingValidation" | "validated" | "rejected") => string
) {
  if (status === "PENDING_VALIDATION") {
    return t("pendingValidation")
  }

  if (status === "VALIDATED") {
    return t("validated")
  }

  if (status === "REJECTED") {
    return t("rejected")
  }

  return status
}

function isConfiguredLink(href?: string): href is string {
  return Boolean(href?.trim())
}

function SocialLinkButton({
  href,
  icon: Icon,
  label,
  unavailableLabel,
}: {
  href?: string
  icon: typeof IconBrandLinkedin
  label: string
  unavailableLabel: string
}) {
  if (isConfiguredLink(href)) {
    return (
      <Button variant="outline" size="icon" className="rounded-xl" asChild>
        <Link href={href} target="_blank" rel="noopener noreferrer">
          <Icon className="size-4" />
          <span className="sr-only">{label}</span>
        </Link>
      </Button>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span tabIndex={0} className="inline-flex rounded-xl">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="pointer-events-none rounded-xl"
            disabled
            aria-label={label}
          >
            <Icon className="size-4" />
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>{unavailableLabel}</TooltipContent>
    </Tooltip>
  )
}

function StatusBadge({ status }: { status: TalentProfile["status"] }) {
  const t = useTranslations("Profile")

  const label =
    status === "looking_for_work"
      ? t("lookingForWork")
      : status === "open_to_opportunities"
        ? t("openToOpportunities")
        : t("notLooking")

  return (
    <Badge className="rounded-full border-0 bg-brand-mint px-3 py-1 text-xs font-medium text-primary-foreground">
      <IconCheck className="size-3.5" />
      {label}
    </Badge>
  )
}

export function ProfileHeaderCard({ profile, action }: ProfileHeaderCardProps) {
  const t = useTranslations("Profile")
  const showAvailabilityBadge = profile.showAvailabilityBadge !== false
  const showExperienceYears = profile.experienceYears > 0
  const showSuperpowerSkills = profile.superpowerSkills.length > 0

  const optionalSocialItems = [
    { href: profile.socialLinks.website, icon: IconWorld, label: t("website") },
    { href: profile.socialLinks.twitter, icon: IconBrandX, label: t("twitter") },
  ].filter((item) => isConfiguredLink(item.href))
  const profileLinks = [
    {
      href: profile.socialLinks.linkedin,
      icon: IconBrandLinkedin,
      label: t("linkedin"),
    },
    {
      href: profile.socialLinks.github,
      icon: IconBrandGithub,
      label: t("github"),
    },
  ]

  return (
    <Card className="relative w-full min-w-0 overflow-hidden rounded-3xl border border-border bg-card p-5 text-card-foreground shadow-none ring-0 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
        <div className="relative shrink-0">
          <TalentAvatar
            name={profile.name}
            avatar={profile.avatar}
            className="size-16 rounded-2xl bg-brand-steel-blue sm:size-20"
            fallbackClassName="rounded-2xl bg-brand-steel-blue text-xl text-primary-foreground"
          />
          {showAvailabilityBadge ? (
            <div className="absolute -bottom-3 left-0">
              <StatusBadge status={profile.status} />
            </div>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {profile.name}
                </h2>
                {profile.verified ? (
                  <span
                    className="inline-flex size-7 items-center justify-center rounded-full bg-brand-orange/20 text-brand-orange"
                    title={t("verified")}
                  >
                    <IconCheck className="size-4" />
                  </span>
                ) : null}
              </div>
              {profile.title ? (
                <p className="mt-1 truncate text-sm text-muted-foreground">{profile.title}</p>
              ) : null}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {profile.location ? (
                  <p className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    <IconMapPin className="size-3.5" />
                    {profile.location}
                  </p>
                ) : null}
                {profile.email ? (
                  <p className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    <IconMail className="size-3.5 shrink-0" />
                    <span className="truncate">{profile.email}</span>
                  </p>
                ) : null}
                {profile.employmentStatus ? (
                  <p className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    {formatEmploymentStatus(profile.employmentStatus, t)}
                  </p>
                ) : null}
                {profile.accountStatus ? (
                  <p className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    {formatAccountStatus(profile.accountStatus, t)}
                  </p>
                ) : null}
                {showExperienceYears ? (
                  <p className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    {t("years", { count: profile.experienceYears })}
                  </p>
                ) : null}
              </div>
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
          </div>
          <TooltipProvider delayDuration={200}>
            <div className="flex flex-wrap items-center gap-2">
              {optionalSocialItems.map(({ href, icon, label }) => (
                <SocialLinkButton
                  key={label}
                  href={href}
                  icon={icon}
                  label={label}
                  unavailableLabel={t("notConfigured")}
                />
              ))}
              {profileLinks.map(({ href, icon, label }) => (
                <SocialLinkButton
                  key={label}
                  href={href}
                  icon={icon}
                  label={label}
                  unavailableLabel={t("notConfigured")}
                />
              ))}
            </div>
          </TooltipProvider>

          {showSuperpowerSkills ? (
            <div className="flex min-w-0 flex-col gap-2">
              <p className="text-sm font-medium text-foreground">{t("superpowerSkills")}</p>
              <div className="flex flex-wrap gap-2">
                {profile.superpowerSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm text-foreground"
                  >
                    <span className="text-brand-orange">★</span>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  )
}
