"use client"

import { IconClock, IconFolder, IconStar } from "@tabler/icons-react"
import { useTranslations } from "next-intl"

import { cn } from "@workspace/ui/lib/utils"

import { DashboardProfileCtaCard } from "./dashboard-profile-cta-card"
import { DashboardProfileHeroCard } from "./dashboard-profile-hero-card"
import { DashboardProfileTasksCard } from "./dashboard-profile-tasks-card"
import { DashboardStatTile } from "./dashboard-stat-tile"
import { useAuth } from "@/features/auth"

import {
  getProfileCompletion,
  useProfile,
  type TalentProfile,
} from "@/entities/talent"
import type { AuthUser } from "@/entities/user"

function getFirstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? name
}

function displayTitle(title?: string | null) {
  const trimmed = title?.trim() ?? ""

  return trimmed === "—" ? "" : trimmed
}

function profileFromUser(user: AuthUser): TalentProfile {
  return {
    id: user.profile?.id ?? user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar_url ?? user.profile?.avatar_url ?? undefined,
    title: displayTitle(user.profile?.headline),
    location: user.profile?.location?.trim() || "",
    experienceYears: 0,
    status: "open_to_opportunities",
    verified: user.profile?.account_status === "VALIDATED",
    bio: user.profile?.bio?.trim() || "",
    superpowerSkills: [],
    skills: [],
    projects: [],
    experience: [],
    socialLinks: {},
  }
}

export function DashboardOverviewGrid() {
  const t = useTranslations("DashboardOverview")
  const { user, isLoading: isAuthLoading } = useAuth()
  const profileId = user?.profile?.id ?? ""
  const profileQuery = useProfile(profileId)
  const profile = profileQuery.data ?? (user ? profileFromUser(user) : null)
  const isLoading = isAuthLoading || (Boolean(profileId) && profileQuery.isLoading)

  if (isLoading || !profile) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-12">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="h-40 animate-pulse rounded-3xl border border-border bg-card md:col-span-1 lg:col-span-4"
          />
        ))}
      </div>
    )
  }

  const title = displayTitle(profile.title)
  const { percent } = getProfileCompletion(profile)
  const showProgress = percent < 100
  const firstName = getFirstName(profile.name)
  const stats = [
    {
      key: "skills",
      value: String(profile.skills.length),
      labelKey: "statSkillsLabel",
      href: "/skills",
      icon: IconStar,
    },
    {
      key: "projects",
      value: String(profile.projects.length),
      labelKey: "statProjectsLabel",
      href: "/projects",
      icon: IconFolder,
    },
    {
      key: "experience",
      value: String(profile.experienceYears),
      labelKey: "statExperienceLabel",
      href: undefined,
      icon: IconClock,
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        {t("greeting", { name: firstName })}
      </h1>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
        <DashboardProfileHeroCard
          name={profile.name}
          title={title}
          avatarUrl={profile.avatar}
          location={profile.location}
          className={showProgress ? "lg:col-span-8" : "lg:col-span-12"}
        />

        {showProgress ? (
          <DashboardProfileTasksCard
            profile={profile}
            className="lg:col-span-4 lg:row-span-2"
          />
        ) : null}

        <div
          className={cn(
            "grid grid-cols-1 gap-4 sm:grid-cols-3",
            showProgress ? "lg:col-span-8" : "lg:col-span-12",
          )}
        >
          {stats.map((stat) => (
            <DashboardStatTile
              key={stat.key}
              value={stat.value}
              labelKey={stat.labelKey}
              icon={stat.icon}
              href={stat.href}
            />
          ))}
        </div>

        <DashboardProfileCtaCard className="lg:col-span-12" />
      </div>
    </div>
  )
}
