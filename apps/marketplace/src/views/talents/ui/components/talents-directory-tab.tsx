"use client"

import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"
import { useSidebar } from "@workspace/ui/components/sidebar"

import { TalentCardSkeleton } from "./talent-card-skeleton"
import { TalentProfileCard } from "./talent-profile-card"
import { TalentsPagination } from "./talents-pagination"
import { getTalentsGridClassName } from "../../lib/get-talents-grid-class-name"
import { DashboardEmptyState, DashboardPanel } from "@/widgets/dashboard-shell"

import { useProfiles } from "@/entities/talent"

const SKELETON_COUNT = 12

export function TalentsDirectoryTab() {
  const t = useTranslations("Talents")
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page") ?? "1") || 1
  const { open: isSidebarOpen } = useSidebar()
  const gridClassName = getTalentsGridClassName(isSidebarOpen)
  const { data, isLoading, isError, refetch, isFetching } = useProfiles(page)

  if (isLoading || (isFetching && !data)) {
    return (
      <div className={gridClassName}>
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <TalentCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <DashboardPanel className="flex flex-col items-center justify-center gap-4 px-4 py-12 text-center sm:px-6 sm:py-16">
        <p className="text-sm text-muted-foreground">{t("loadError")}</p>
        <Button className="rounded-full" onClick={() => refetch()}>
          {t("retry")}
        </Button>
      </DashboardPanel>
    )
  }

  if (!data || data.profiles.length === 0) {
    return (
      <DashboardEmptyState
        title={t("emptyTitle")}
        description={t("emptyDescription")}
      />
    )
  }

  const { profiles, pagination } = data

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-foreground">
        {t("showingRange", {
          from: pagination.from,
          to: pagination.to,
          total: pagination.total,
        })}
      </p>

      <div className={gridClassName}>
        {profiles.map((profile) => (
          <TalentProfileCard key={profile.id} profile={profile} />
        ))}
      </div>

      {pagination.lastPage > 1 ? (
        <TalentsPagination
          currentPage={pagination.currentPage}
          lastPage={pagination.lastPage}
          total={pagination.total}
        />
      ) : null}
    </div>
  )
}
