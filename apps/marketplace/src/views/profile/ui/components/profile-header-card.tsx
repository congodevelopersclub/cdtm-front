"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconCheck,
  IconMail,
  IconMapPin,
  IconShare,
  IconWorld,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"

import { getInitials, type TalentProfile } from "@/entities/talent"

type ProfileHeaderCardProps = {
  profile: TalentProfile
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

export function ProfileHeaderCard({ profile }: ProfileHeaderCardProps) {
  const t = useTranslations("Profile")

  const socialItems = [
    { href: profile.socialLinks.website, icon: IconWorld, label: "Website" },
    { href: profile.socialLinks.twitter, icon: IconBrandX, label: "Twitter" },
    {
      href: profile.socialLinks.linkedin,
      icon: IconBrandLinkedin,
      label: "LinkedIn",
    },
    { href: profile.socialLinks.github, icon: IconBrandGithub, label: "GitHub" },
  ].filter((item) => item.href)

  return (
    <Card className="relative w-full min-w-0 overflow-hidden rounded-3xl border-border bg-card px-4 py-6 shadow-none ring-0 sm:px-6 sm:py-8">
      <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start">
        <div className="flex shrink-0 flex-col items-start gap-3">
          <div className="relative pb-1">
            <Avatar className="size-24 rounded-full sm:size-28 lg:size-32">
              {profile.avatar ? (
                <AvatarImage src={profile.avatar} alt={profile.name} />
              ) : null}
              <AvatarFallback className="rounded-full text-xl sm:text-2xl">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-3 left-0">
              <StatusBadge status={profile.status} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
            <IconMapPin className="size-4 shrink-0" />
            <span>{profile.location}</span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {profile.name}
            </h2>
            {profile.verified ? (
              <span
                className="inline-flex size-7 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange"
                title={t("verified")}
              >
                <IconCheck className="size-4" />
              </span>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {socialItems.map(({ href, icon: Icon, label }) => (
              <Button
                key={label}
                variant="outline"
                size="icon"
                className="rounded-full"
                asChild
              >
                <Link href={href!} target="_blank" rel="noopener noreferrer">
                  <Icon className="size-4" />
                  <span className="sr-only">{label}</span>
                </Link>
              </Button>
            ))}
            <Button className="w-full rounded-full px-5 sm:w-auto">
              <IconMail className="size-4" />
              {t("message")}
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-full px-5 sm:w-auto"
            >
              <IconShare className="size-4" />
              {t("share")}
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:max-w-none">
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">{t("role")}</p>
              <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                {profile.title}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">{t("experience")}</p>
              <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                {t("years", { count: profile.experienceYears })}
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-3">
            <p className="text-sm font-medium">{t("superpowerSkills")}</p>
            <div className="flex flex-wrap gap-2">
              {profile.superpowerSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm"
                >
                  <span className="text-brand-orange">★</span>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
