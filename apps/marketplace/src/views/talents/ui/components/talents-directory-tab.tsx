"use client"

import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"
import { useSidebar } from "@workspace/ui/components/sidebar"

import { TalentCardSkeleton } from "./talent-card-skeleton"
import { TalentsDirectoryFilters } from "./talents-directory-filters"
import { TalentProfileCard } from "./talent-profile-card"
import { TalentsPagination } from "./talents-pagination"
import {
  filterTalentProfiles,
  hasActiveTalentsDirectoryFilters,
} from "../../lib/filter-talent-profiles"
import { getTalentsGridClassName } from "../../lib/get-talents-grid-class-name"
import {
  parseTalentsDirectoryFilters,
  toProfilesQuery,
} from "../../lib/parse-talents-directory-filters"
import { DashboardEmptyState, DashboardPanel } from "@/widgets/dashboard-shell"

import { useProfiles } from "@/entities/talent"

const SKELETON_COUNT = 12

export function TalentsDirectoryTab() {
  const t = useTranslations("Talents")
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page") ?? "1") || 1
  const filters = parseTalentsDirectoryFilters(searchParams)
  const profilesQuery = toProfilesQuery(filters, page)
  const { open: isSidebarOpen } = useSidebar()
  const gridClassName = getTalentsGridClassName(isSidebarOpen)
  const { data, isLoading, isError, refetch, isFetching } =
    useProfiles(profilesQuery)
  const hasActiveFilters = hasActiveTalentsDirectoryFilters(filters)

  if (isLoading || (isFetching && !data)) {
    return (
      <div className="flex flex-col gap-6">
        <TalentsDirectoryFilters />
        <div className={gridClassName}>
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <TalentCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-6">
        <TalentsDirectoryFilters />
        <DashboardPanel className="flex flex-col items-center justify-center gap-4 px-4 py-12 text-center sm:px-6 sm:py-16">
          <p className="text-sm text-muted-foreground">{t("loadError")}</p>
          <Button className="rounded-full" onClick={() => refetch()}>
            {t("retry")}
          </Button>
        </DashboardPanel>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col gap-6">
        <TalentsDirectoryFilters />
        <DashboardEmptyState
          title={t("emptyTitle")}
          description={t("emptyDescription")}
        />
      </div>
    )
  }

  const { profiles, pagination } = data
  const visibleProfiles = filterTalentProfiles(profiles, filters)

  if (visibleProfiles.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <TalentsDirectoryFilters />
        <DashboardEmptyState
          title={hasActiveFilters ? t("filteredEmptyTitle") : t("emptyTitle")}
          description={
            hasActiveFilters
              ? t("filteredEmptyDescription")
              : t("emptyDescription")
          }
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <TalentsDirectoryFilters />

      <p className="text-sm text-muted-foreground">
        {hasActiveFilters
          ? t("showingFiltered", { count: visibleProfiles.length })
          : t("showingRange", {
              from: pagination.from,
              to: pagination.to,
              total: pagination.total,
            })}
      </p>

      <div className={gridClassName}>
        {visibleProfiles.map((profile) => (
          <TalentProfileCard key={profile.id} profile={profile} />
        ))}
      </div>

      {!hasActiveFilters && pagination.lastPage > 1 ? (
        <TalentsPagination
          currentPage={pagination.currentPage}
          lastPage={pagination.lastPage}
          total={pagination.total}
        />
      ) : null}
    </div>
  )
}
