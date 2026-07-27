"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"
import { DashboardEmptyState, useSetDashboardBreadcrumbLabel  } from "@/widgets/dashboard-shell"

import {
  ProfileHeaderCard,
  ProfileTabs,
  TalentProfileSkeleton,
  useProfile,
} from "@/entities/talent"

export function TalentDetailPage() {
  const t = useTranslations("Talents")
  const params = useParams<{ id: string }>()
  const id = params.id
  const { data: profile, isLoading, isError } = useProfile(id)

  useSetDashboardBreadcrumbLabel(
    isLoading ? null : isError || !profile ? t("notFound") : profile.name
  )

  if (isLoading) {
    return <TalentProfileSkeleton />
  }

  if (isError || !profile) {
    return (
      <div className="flex flex-col gap-4">
        <DashboardEmptyState
          title={t("notFound")}
          description={t("notFoundDescription")}
        />
        <Button className="w-fit rounded-full" asChild>
          <Link href="/talents">{t("backToDirectory")}</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex w-full min-w-0 max-w-full flex-col gap-6">
      <ProfileHeaderCard profile={profile} />
      <ProfileTabs profile={profile} />
    </div>
  )
}
