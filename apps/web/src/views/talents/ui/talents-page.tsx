import Link from "next/link"
import { getTranslations } from "next-intl/server"

import { Button } from "@workspace/ui/components/button"

import {
  filterPublicTalents,
  hasActiveTalentDirectoryFilters,
  talentDirectoryHref,
  type TalentDirectoryFilters,
} from "../lib/talent-directory-filters"
import { TalentCard } from "./talent-card"
import { TalentDirectoryFilters as TalentFilters } from "./talent-directory-filters"

import { getPublicProfiles, type PublicTalentsPage } from "@/entities/talent"

type TalentsPageProps = {
  page: number
  filters: TalentDirectoryFilters
}

export async function TalentsPage({ page, filters }: TalentsPageProps) {
  const t = await getTranslations("talents")
  let result: PublicTalentsPage | null = null
  let hasError = false

  try {
    result = await getPublicProfiles(page, {
      search: filters.search.trim() || undefined,
      category: filters.category ?? undefined,
      verified: filters.verified ?? undefined,
    })
  } catch {
    hasError = true
  }

  const visibleProfiles = result ? filterPublicTalents(result.profiles, filters) : []
  const hasFilters = hasActiveTalentDirectoryFilters(filters)
  const showPagination = result != null && result.pagination.lastPage > 1

  return (
    <section className="py-16">
      <div className="page-container">
        <h1 className="text-foreground text-4xl font-black tracking-tighter md:text-5xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">{t("subtitle")}</p>

        <div className="mt-8">
          <TalentFilters filters={filters} />
        </div>

        {hasError ? (
          <p className="text-muted-foreground mt-12 text-sm">{t("loadError")}</p>
        ) : null}

        {result && !hasFilters && result.profiles.length === 0 ? (
          <p className="text-muted-foreground mt-12 text-sm">{t("empty")}</p>
        ) : null}

        {result && hasFilters && visibleProfiles.length === 0 ? (
          <div className="mt-12">
            <p className="text-foreground text-sm font-medium">{t("filteredEmptyTitle")}</p>
            <p className="text-muted-foreground mt-1 text-sm">{t("filteredEmptyDescription")}</p>
          </div>
        ) : null}

        {visibleProfiles.length > 0 ? (
          <>
            <p className="text-muted-foreground mt-8 text-sm">
              {hasFilters
                ? t("showingFiltered", { count: visibleProfiles.length })
                : t("directoryCount", { total: result?.pagination.total ?? visibleProfiles.length })}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProfiles.map((profile) => (
                <TalentCard key={profile.id} profile={profile} />
              ))}
            </div>
          </>
        ) : null}

        {showPagination && result ? (
          <div className="mt-10 flex items-center justify-center gap-3">
            {result.pagination.currentPage > 1 ? (
              <Button variant="outline" className="rounded-full" asChild>
                <Link href={talentDirectoryHref(filters, result.pagination.currentPage - 1)}>
                  {t("previous")}
                </Link>
              </Button>
            ) : null}
            <span className="text-muted-foreground text-sm">
              {t("pageOf", {
                page: result.pagination.currentPage,
                lastPage: result.pagination.lastPage,
              })}
            </span>
            {result.pagination.currentPage < result.pagination.lastPage ? (
              <Button variant="outline" className="rounded-full" asChild>
                <Link href={talentDirectoryHref(filters, result.pagination.currentPage + 1)}>
                  {t("next")}
                </Link>
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
