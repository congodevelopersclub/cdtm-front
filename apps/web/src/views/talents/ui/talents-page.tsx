import Link from "next/link"
import { getTranslations } from "next-intl/server"

import { Button } from "@workspace/ui/components/button"

import {
  filterProfilesByName,
  hasActiveTalentDirectoryFilters,
  talentDirectoryHref,
  type TalentDirectoryFilters,
} from "../lib/talent-directory-filters"
import { TalentCard } from "./talent-card"
import { TalentDirectoryFilters as TalentFilters } from "./talent-directory-filters"

import { getPublicCategories, type TalentCategoryOption } from "@/entities/category"
import { getPublicSkills, type PublicSkillOption } from "@/entities/skill"
import { getPublicProfiles, type PublicTalentsPage } from "@/entities/talent"

type TalentsPageProps = {
  page: number
  filters: TalentDirectoryFilters
}

export async function TalentsPage({ page, filters }: TalentsPageProps) {
  const t = await getTranslations("talents")
  let result: PublicTalentsPage | null = null
  let hasError = false

  const [categoriesResult, skillsResult] = await Promise.allSettled([
    getPublicCategories(),
    getPublicSkills(),
  ])
  const categories: TalentCategoryOption[] =
    categoriesResult.status === "fulfilled" ? categoriesResult.value : []
  const skills: PublicSkillOption[] =
    skillsResult.status === "fulfilled" ? skillsResult.value : []

  try {
    result = await getPublicProfiles(page, {
      location: filters.location.trim() || undefined,
      category: filters.category ?? undefined,
      skills: filters.skills.length > 0 ? filters.skills.join(",") : undefined,
    })
  } catch {
    hasError = true
  }

  const profiles = filterProfilesByName(result?.profiles ?? [], filters.name)
  const nameQuery = filters.name.trim()
  const hasFilters = hasActiveTalentDirectoryFilters(filters)
  const visibleFrom = nameQuery ? (profiles.length > 0 ? 1 : 0) : (result?.pagination.from ?? 0)
  const visibleTo = nameQuery ? profiles.length : (result?.pagination.to ?? 0)
  const visibleTotal = nameQuery ? profiles.length : (result?.pagination.total ?? 0)
  const showPagination = result != null && result.pagination.lastPage > 1

  return (
    <section className="py-16">
      <div className="page-container">
        <h1 className="text-foreground text-4xl font-black tracking-tighter md:text-5xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">{t("subtitle")}</p>

        <div className="mt-8">
          <TalentFilters filters={filters} categories={categories} skills={skills} />
        </div>

        {hasError ? (
          <p className="text-muted-foreground mt-12 text-sm">{t("loadError")}</p>
        ) : null}

        {result && profiles.length === 0 ? (
          <div className="mt-12">
            <p className="text-foreground text-sm font-medium">
              {hasFilters ? t("filteredEmptyTitle") : t("empty")}
            </p>
            {hasFilters ? (
              <p className="text-muted-foreground mt-1 text-sm">{t("filteredEmptyDescription")}</p>
            ) : null}
          </div>
        ) : null}

        {profiles.length > 0 && result ? (
          <>
            <p className="text-muted-foreground mt-8 text-sm">
              {t("showingRange", {
                from: visibleFrom,
                to: visibleTo,
                total: visibleTotal,
              })}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {profiles.map((profile) => (
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
