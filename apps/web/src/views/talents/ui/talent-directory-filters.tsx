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

import { formatCategoryLabel } from "../lib/talent-card-styles"
import {
  hasActiveTalentDirectoryFilters,
  talentDirectoryHref,
  type TalentDirectoryFilters,
} from "../lib/talent-directory-filters"

import { isTalentCategory, TALENT_CATEGORIES } from "@/entities/talent"

const SEARCH_DEBOUNCE_MS = 300

function pushFilters(router: ReturnType<typeof useRouter>, filters: TalentDirectoryFilters) {
  router.push(talentDirectoryHref(filters))
}

type DebouncedSearchInputProps = {
  value: string
  filters: TalentDirectoryFilters
  placeholder: string
  ariaLabel: string
}

function DebouncedSearchInput({
  value,
  filters,
  placeholder,
  ariaLabel,
}: DebouncedSearchInputProps) {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState(value)

  useEffect(() => {
    if (searchValue === value) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      pushFilters(router, { ...filters, search: searchValue })
    }, SEARCH_DEBOUNCE_MS)

    return () => window.clearTimeout(timeoutId)
  }, [filters, router, searchValue, value])

  return (
    <div className="relative min-w-0 flex-1">
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
      <Input
        type="search"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="h-10 rounded-full bg-background pl-9"
      />
    </div>
  )
}

type TalentDirectoryFiltersProps = {
  filters: TalentDirectoryFilters
}

export function TalentDirectoryFilters({ filters }: TalentDirectoryFiltersProps) {
  const t = useTranslations("talents")
  const router = useRouter()
  const hasActiveFilters = hasActiveTalentDirectoryFilters(filters)

  function updateFilters(nextFilters: TalentDirectoryFilters) {
    pushFilters(router, nextFilters)
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-background/80 p-3 sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <DebouncedSearchInput
          key={filters.search}
          value={filters.search}
          filters={filters}
          placeholder={t("searchPlaceholder")}
          ariaLabel={t("searchAriaLabel")}
        />

        <Select
          value={filters.category ?? "all"}
          onValueChange={(value) =>
            updateFilters({
              ...filters,
              category: value === "all" || !isTalentCategory(value) ? null : value,
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
            {TALENT_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {formatCategoryLabel(category)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={
            filters.verified == null ? "all" : filters.verified ? "verified" : "unverified"
          }
          onValueChange={(value) =>
            updateFilters({
              ...filters,
              verified: value === "all" ? null : value === "verified",
            })
          }
        >
          <SelectTrigger
            className="w-full rounded-full sm:w-auto sm:min-w-44"
            aria-label={t("verifiedFilterLabel")}
          >
            <SelectValue placeholder={t("verifiedFilterLabel")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allProfiles")}</SelectItem>
            <SelectItem value="verified">{t("verifiedOnly")}</SelectItem>
            <SelectItem value="unverified">{t("unverifiedOnly")}</SelectItem>
          </SelectContent>
        </Select>

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
