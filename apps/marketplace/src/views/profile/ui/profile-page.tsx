"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"

import { DashboardEmptyState } from "@/widgets/dashboard-shell"

import { useAuth } from "@/features/auth"
import {
  ProfileHeaderCard,
  ProfileTabs,
  TalentProfileSkeleton,
  useProfile,
  type TalentProfile,
} from "@/entities/talent"

import { ProfileEditDialog } from "./profile-edit-dialog"

type ProfilePageProps = {
  profile?: TalentProfile
}

export function ProfilePage({ profile: providedProfile }: ProfilePageProps) {
  const t = useTranslations("Talents")
  const tProfile = useTranslations("Profile")
  const [isEditing, setIsEditing] = useState(false)
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

  const canEdit = !providedProfile

  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      {canEdit ? (
        <div className="flex justify-end">
          <Button className="rounded-full" onClick={() => setIsEditing(true)}>
            {tProfile("editProfile")}
          </Button>
        </div>
      ) : null}
      <ProfileHeaderCard profile={profile} />
      <ProfileTabs profile={profile} />
      {canEdit ? (
        <ProfileEditDialog
          profile={profile}
          open={isEditing}
          onOpenChange={setIsEditing}
        />
      ) : null}
    </div>
  )
}
