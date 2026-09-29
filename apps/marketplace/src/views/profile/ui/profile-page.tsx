"use client"

import { useTranslations } from "next-intl"

import { DashboardEmptyState } from "@/widgets/dashboard-shell"

import { useAuth } from "@/features/auth"
import {
  ProfileHeaderCard,
  ProfileTabs,
  TalentProfileSkeleton,
  useProfile,
  type TalentProfile,
} from "@/entities/talent"

type ProfilePageProps = {
  profile?: TalentProfile
}

export function ProfilePage({ profile: providedProfile }: ProfilePageProps) {
  const t = useTranslations("Talents")
  const { user, isLoading: isAuthLoading } = useAuth()
  const profileId = providedProfile ? "" : (user?.profile?.id ?? "")
  const profileQuery = useProfile(profileId)
  const profile = providedProfile ?? profileQuery.data
  const isLoading =
    !providedProfile && (isAuthLoading || (Boolean(profileId) && profileQuery.isLoading))

  if (isLoading) {
    return <TalentProfileSkeleton />
  }

  if (!profile) {
    return (
      <DashboardEmptyState
        title={t("notFound")}
        description={t("notFoundDescription")}
      />
    )
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      <ProfileHeaderCard profile={profile} />
      <ProfileTabs profile={profile} />
    </div>
  )
}
