"use client"

import { useTranslations } from "next-intl"

import { PLATFORM_STATS } from "../../config/overview-content"

import { DashboardCompletionRingCard } from "./dashboard-completion-ring-card"
import { DashboardProfileCtaCard } from "./dashboard-profile-cta-card"
import { DashboardProfileHeroCard } from "./dashboard-profile-hero-card"
import { DashboardProfileTasksCard } from "./dashboard-profile-tasks-card"
import { DashboardStatTile } from "./dashboard-stat-tile"
import { DashboardUpcomingCard } from "./dashboard-upcoming-card"
import { useAuth } from "@/features/auth"

import {
  getProfileCompletion,
  MOCK_TALENT_PROFILE,
  type TalentProfile,
} from "@/entities/talent"
import type { AuthUser } from "@/entities/user"

function getFirstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? name
}

function resolveDashboardProfile(user: AuthUser | null): TalentProfile {
  if (!user) {
    return MOCK_TALENT_PROFILE
  }

  return {
    ...MOCK_TALENT_PROFILE,
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar_url ?? user.profile?.avatar_url ?? MOCK_TALENT_PROFILE.avatar,
  }
}

const statAccents = ["mint", "steel", "orange"] as const

export function DashboardOverviewGrid() {
  const t = useTranslations("DashboardOverview")
  const { user } = useAuth()
  const profile = resolveDashboardProfile(user)
  const { percent } = getProfileCompletion(profile)
  const firstName = getFirstName(profile.name)

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {t("greeting", { name: firstName })}
      </h1>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto]">
        <DashboardProfileHeroCard
          name={profile.name}
          title={profile.title}
          avatarUrl={profile.avatar}
          location={profile.location}
          className="lg:col-span-5"
        />

        <DashboardCompletionRingCard percent={percent} className="lg:col-span-3" />

        <DashboardProfileTasksCard profile={profile} className="lg:col-span-4 lg:row-span-2" />

        <DashboardUpcomingCard className="lg:col-span-8" />

        {PLATFORM_STATS.map((stat, index) => (
          <DashboardStatTile
            key={stat.key}
            valueKey={stat.valueKey}
            labelKey={stat.labelKey}
            deltaKey={stat.deltaKey}
            accent={statAccents[index]}
            className="lg:col-span-4"
          />
        ))}

        <DashboardProfileCtaCard
          name={profile.name}
          title={profile.title}
          avatarUrl={profile.avatar}
          className="lg:col-span-4"
        />
      </div>
    </div>
  )
}
