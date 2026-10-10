"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { Search, X } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

import {
  hasActiveTalentDirectoryFilters,
  talentDirectoryHref,
  type TalentDirectoryFilters,
} from "../lib/talent-directory-filters"

import type { TalentCategoryOption } from "@/entities/category"
import type { PublicSkillOption } from "@/entities/skill"

import { TalentSkillsFilter } from "./talent-skills-filter"

const SEARCH_DEBOUNCE_MS = 300

function pushFilters(router: ReturnType<typeof useRouter>, filters: TalentDirectoryFilters) {
  router.push(talentDirectoryHref(filters))
}

type DebouncedFilterInputProps = {
  value: string
  filters: TalentDirectoryFilters
  field: "name" | "location"
  placeholder: string
  ariaLabel: string
  withIcon?: boolean
}

function DebouncedFilterInput({
  value,
  filters,
  field,
  placeholder,
  ariaLabel,
  withIcon = false,
}: DebouncedFilterInputProps) {
  const router = useRouter()
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
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
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

type TalentDirectoryFiltersProps = {
  filters: TalentDirectoryFilters
  categories: TalentCategoryOption[]
  skills: PublicSkillOption[]
}

export function TalentDirectoryFilters({
  filters,
  categories,
  skills,
}: TalentDirectoryFiltersProps) {
  const t = useTranslations("talents")
  const router = useRouter()
  const hasActiveFilters = hasActiveTalentDirectoryFilters(filters)
  const categoryOptions =
    filters.category && !categories.some((category) => category.slug === filters.category)
      ? [{ id: 0, name: filters.category, slug: filters.category, sortOrder: 0 }, ...categories]
      : categories

  function updateFilters(nextFilters: TalentDirectoryFilters) {
    pushFilters(router, nextFilters)
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-background/80 p-3 sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <DebouncedFilterInput
          key={`name-${filters.name}`}
          value={filters.name}
          filters={filters}
          field="name"
          placeholder={t("searchPlaceholder")}
          ariaLabel={t("searchAriaLabel")}
          withIcon
        />
        <DebouncedFilterInput
          key={`location-${filters.location}`}
          value={filters.location}
          filters={filters}
          field="location"
          placeholder={t("locationPlaceholder")}
          ariaLabel={t("locationAriaLabel")}
        />

        <Select
          value={filters.category ?? "all"}
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
          options={skills}
          onChange={(nextSkills) => updateFilters({ ...filters, skills: nextSkills })}
        />

        {hasActiveFilters ? (
          <Button
            type="button"
            variant="ghost"
            className="rounded-full"
            onClick={() => router.push("/talents")}
          >
            <X className="size-4" />
            {t("clearFilters")}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
