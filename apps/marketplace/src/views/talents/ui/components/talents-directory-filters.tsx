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

import {
  buildTalentsDirectorySearchParams,
  parseTalentsDirectoryFilters,
} from "../../lib/parse-talents-directory-filters"
import {
  hasActiveTalentsDirectoryFilters,
} from "../../lib/filter-talent-profiles"
import type { TalentsDirectoryFilters } from "../../lib/talents-directory-filter-types"
import {
  formatTalentDirectoryCategory,
  isTalentDirectoryCategory,
  TALENT_DIRECTORY_CATEGORIES,
} from "../../lib/talent-directory-categories"

const SEARCH_DEBOUNCE_MS = 300

function pushFilters(
  router: ReturnType<typeof useRouter>,
  filters: TalentsDirectoryFilters
) {
  const params = buildTalentsDirectorySearchParams(filters)
  const query = params.toString()

  router.push(query ? `/talents?${query}` : "/talents")
}

type DebouncedSearchInputProps = {
  value: string
  filters: TalentsDirectoryFilters
  router: ReturnType<typeof useRouter>
  placeholder: string
  ariaLabel: string
}

function DebouncedSearchInput({
  value,
  filters,
  router,
  placeholder,
  ariaLabel,
}: DebouncedSearchInputProps) {
  const [searchValue, setSearchValue] = useState(value)

  useEffect(() => {
    if (searchValue === filters.search) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      pushFilters(router, { ...filters, search: searchValue })
    }, SEARCH_DEBOUNCE_MS)

    return () => window.clearTimeout(timeoutId)
  }, [filters, router, searchValue])

  return (
    <div className="relative flex-1">
      <IconSearch className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
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

export function TalentsDirectoryFilters() {
  const t = useTranslations("Talents")
  const router = useRouter()
  const searchParams = useSearchParams()
  const filters: TalentsDirectoryFilters = parseTalentsDirectoryFilters(searchParams)
  const categorySelectValue = filters.category ?? "all"
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
        <DebouncedSearchInput
          key={filters.search}
          value={filters.search}
          filters={filters}
          router={router}
          placeholder={t("searchPlaceholder")}
          ariaLabel={t("searchAriaLabel")}
        />

        <Select
          value={categorySelectValue}
          onValueChange={(value) =>
            updateFilters({
              ...filters,
              category:
                value === "all" || !isTalentDirectoryCategory(value)
                  ? null
                  : value,
            })
          }
        >
          <SelectTrigger
            className="w-full rounded-full sm:w-44"
            aria-label={t("categoryFilterLabel")}
          >
            <SelectValue placeholder={t("categoryFilterLabel")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allCategories")}</SelectItem>
            {TALENT_DIRECTORY_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {formatTalentDirectoryCategory(category)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={
            filters.verified == null
              ? "all"
              : filters.verified
                ? "verified"
                : "unverified"
          }
          onValueChange={(value) =>
            updateFilters({
              ...filters,
              verified: value === "all" ? null : value === "verified",
            })
          }
        >
          <SelectTrigger
            className="w-full rounded-full sm:w-44"
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
