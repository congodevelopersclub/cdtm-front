"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { IconSearch, IconX } from "@tabler/icons-react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

import { useCategories } from "@/entities/category"
import { useSkillCatalog } from "@/entities/skill"

import {
  buildTalentsDirectorySearchParams,
  parseTalentsDirectoryFilters,
} from "../../lib/parse-talents-directory-filters"
import { hasActiveTalentsDirectoryFilters } from "../../lib/filter-talent-profiles"
import type { TalentsDirectoryFilters } from "../../lib/talents-directory-filter-types"
import { TalentSkillsFilter } from "./talent-skills-filter"

const SEARCH_DEBOUNCE_MS = 300

function pushFilters(
  router: ReturnType<typeof useRouter>,
  filters: TalentsDirectoryFilters
) {
  const params = buildTalentsDirectorySearchParams(filters)
  const query = params.toString()

  router.push(query ? `/talents?${query}` : "/talents")
}

type DebouncedFilterInputProps = {
  value: string
  filters: TalentsDirectoryFilters
  router: ReturnType<typeof useRouter>
  field: "name" | "location"
  placeholder: string
  ariaLabel: string
  withIcon?: boolean
}

function DebouncedFilterInput({
  value,
  filters,
  router,
  field,
  placeholder,
  ariaLabel,
  withIcon = false,
}: DebouncedFilterInputProps) {
  const [fieldValue, setFieldValue] = useState(value)

  useEffect(() => {
    if (fieldValue === filters[field]) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      pushFilters(router, { ...filters, [field]: fieldValue })
    }, SEARCH_DEBOUNCE_MS)

    return () => window.clearTimeout(timeoutId)
  }, [field, fieldValue, filters, router])

  return (
    <div className={withIcon ? "relative min-w-0 flex-1" : "w-full sm:w-auto sm:min-w-44"}>
      {withIcon ? (
        <IconSearch className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      ) : null}
      <Input
        type={withIcon ? "search" : "text"}
        value={fieldValue}
        onChange={(event) => setFieldValue(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={withIcon ? "h-10 rounded-full bg-background pl-9" : "h-10 rounded-full bg-background"}
      />
    </div>
  )
}

export function TalentsDirectoryFilters() {
  const t = useTranslations("Talents")
  const router = useRouter()
  const searchParams = useSearchParams()
  const filters: TalentsDirectoryFilters = parseTalentsDirectoryFilters(searchParams)
  const categoriesQuery = useCategories()
  const skillsQuery = useSkillCatalog()
  const categories = categoriesQuery.data ?? []
  const skillOptions = (skillsQuery.data ?? []).map((skill) => ({
    id: skill.id,
    name: skill.name,
  }))
  const categorySelectValue = filters.category ?? "all"
  const categoryOptions =
    filters.category && !categories.some((category) => category.slug === filters.category)
      ? [{ id: 0, name: filters.category, slug: filters.category }, ...categories]
      : categories
  const hasActiveFilters = hasActiveTalentsDirectoryFilters(filters)

  function updateFilters(nextFilters: TalentsDirectoryFilters) {
    pushFilters(router, nextFilters)
  }

  function clearFilters() {
    router.push("/talents")
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-background/80 p-3 sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <DebouncedFilterInput
          key={`name-${filters.name}`}
          value={filters.name}
          filters={filters}
          router={router}
          field="name"
          placeholder={t("searchPlaceholder")}
          ariaLabel={t("searchAriaLabel")}
          withIcon
        />
        <DebouncedFilterInput
          key={`location-${filters.location}`}
          value={filters.location}
          filters={filters}
          router={router}
          field="location"
          placeholder={t("locationPlaceholder")}
          ariaLabel={t("locationAriaLabel")}
        />

        <Select
          value={categorySelectValue}
          onValueChange={(value) =>
            updateFilters({
              ...filters,
              category: value === "all" ? null : value,
            })
          }
        >
          <SelectTrigger
            className="w-full rounded-full sm:w-auto sm:min-w-44"
            aria-label={t("categoryFilterLabel")}
          >
            <SelectValue placeholder={t("categoryFilterLabel")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allCategories")}</SelectItem>
            {categoryOptions.map((category) => (
              <SelectItem key={category.slug} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <TalentSkillsFilter
          skills={filters.skills}
          options={skillOptions}
          onChange={(skills) => updateFilters({ ...filters, skills })}
        />

        {hasActiveFilters ? (
          <Button
            type="button"
            variant="ghost"
            className="rounded-full"
            onClick={clearFilters}
          >
            <IconX className="size-4" />
            {t("clearFilters")}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
