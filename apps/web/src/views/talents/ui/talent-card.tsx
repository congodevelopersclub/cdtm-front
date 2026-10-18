"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Briefcase, CircleCheckBig, MapPin } from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { cn } from "@workspace/ui/lib/utils"

import { TalentAvatar } from "./talent-avatar"
import {
  formatCategoryLabel,
  getHeadlineAccentClass,
  getSkillOverflowLabel,
} from "../lib/talent-card-styles"

import type { PublicTalent } from "@/entities/talent"
import { GithubIcon } from "@/shared/ui/brand-icons"

const MAX_VISIBLE_SKILLS = 3

type TalentCardProps = {
  profile: PublicTalent
}

export function TalentCard({ profile }: TalentCardProps) {
  const t = useTranslations("talents")
  const visibleSkills = profile.skills.slice(0, MAX_VISIBLE_SKILLS)
  const hiddenSkills = profile.skills.slice(MAX_VISIBLE_SKILLS)
  const overflowLabel = getSkillOverflowLabel(hiddenSkills.length)
  const headlineAccentClass = getHeadlineAccentClass(profile.id)
  const primaryCategory = profile.categories[0]
  const otherCategories = profile.categories.slice(1)
  const primaryCategoryLabel = primaryCategory
    ? formatCategoryLabel(primaryCategory)
    : undefined
  const otherCategoryLabels = otherCategories.map(formatCategoryLabel)

  return (
    <Card className="group relative flex h-full flex-col gap-3 rounded-2xl border border-border bg-white p-2 shadow-none transition-colors hover:border-primary/30 hover:bg-muted/30 focus-within:ring-2 focus-within:ring-ring/50">
      <TooltipProvider delayDuration={200}>
        <Link
          href={`/talents/${profile.id}`}
          aria-label={t("viewProfileFor", { name: profile.name })}
          className="flex min-w-0 w-full flex-col gap-3 rounded-2xl outline-none sm:flex-row"
        >
          <div className="relative flex flex-col items-center gap-2 rounded-2xl bg-muted p-2">
            {profile.verified ? (
              <div className="absolute -top-1 -left-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className="inline-flex size-5 items-center justify-center rounded-full bg-secondary text-green-500"
                      aria-label={t("verified")}
                    >
                      <CircleCheckBig className="size-5" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top">{t("verified")}</TooltipContent>
                </Tooltip>
              </div>
            ) : null}
            <TalentAvatar
              name={profile.name}
              avatar={profile.avatar}
              className="size-16 rounded-full lg:size-20"
              fallbackClassName="rounded-full text-base"
            />
            <div className="flex flex-wrap items-center justify-center gap-1">
              <Button size="xs" className="rounded-md">
                Linkedin
              </Button>
              <Button
                size="icon-xs"
                className="rounded-md bg-black hover:bg-muted hover:text-black"
              >
                <GithubIcon className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {profile.title ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "h-6 w-full max-w-full min-w-0 overflow-hidden rounded-md border-0",
                      headlineAccentClass
                    )}
                  >
                    <span className="block truncate text-black">{profile.title}</span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="top">{profile.title}</TooltipContent>
              </Tooltip>
            ) : null}

            <Tooltip>
              <TooltipTrigger asChild>
                <h3 className="line-clamp-2 min-w-0 text-base font-semibold tracking-tight">
                  {profile.name}
                </h3>
              </TooltipTrigger>
              <TooltipContent side="top">{profile.name}</TooltipContent>
            </Tooltip>

            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              {profile.location ? (
                <div className="flex min-w-0 items-center gap-1.5">
                  <MapPin className="size-4 shrink-0" />
                  <span className="truncate">{profile.location}</span>
                </div>
              ) : null}

              {primaryCategoryLabel ? (
                otherCategoryLabels.length > 0 ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex min-w-0 items-center gap-1.5">
                        <Briefcase className="size-4 shrink-0" />
                        <span className="truncate">{primaryCategoryLabel}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      {otherCategoryLabels.join(", ")}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <div className="flex min-w-0 items-center gap-1.5">
                    <Briefcase className="size-4 shrink-0" />
                    <span className="truncate">{primaryCategoryLabel}</span>
                  </div>
                )
              ) : null}
            </div>

            {visibleSkills.length > 0 ? (
              <div className="flex min-w-0 flex-wrap items-center gap-1 sm:flex-nowrap sm:overflow-hidden">
                {visibleSkills.map((skill) => (
                  <span
                    key={skill}
                    className="max-w-24 shrink-0 truncate rounded-md bg-black/10 px-2 py-0.5 text-xs font-medium text-black"
                  >
                    {skill}
                  </span>
                ))}
                {overflowLabel ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                        aria-label={t("skillsOverflowTooltip", {
                          skills: hiddenSkills.join(", "),
                        })}
                      >
                        {overflowLabel}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      {hiddenSkills.join(", ")}
                    </TooltipContent>
                  </Tooltip>
                ) : null}
              </div>
            ) : null}
          </div>
        </Link>
      </TooltipProvider>
    </Card>
  )
}
