import type { TalentsDirectoryFilters } from "./talents-directory-filter-types"
import {
  isTalentDirectoryCategory,
  type TalentDirectoryCategory,
} from "./talent-directory-categories"

function parseTalentCategory(value: string | null): TalentDirectoryCategory | null {
  if (!value || !isTalentDirectoryCategory(value)) {
    return null
  }

  return value
}

function parseVerifiedFilter(value: string | null) {
  if (value === "1") {
    return true
  }

  if (value === "0") {
    return false
  }

  return null
}

export function parseTalentsDirectoryFilters(
  searchParams: URLSearchParams
): TalentsDirectoryFilters {
  return {
    search: searchParams.get("q") ?? "",
    category: parseTalentCategory(searchParams.get("category")),
    verified: parseVerifiedFilter(searchParams.get("verified")),
  }
}

export function toProfilesQuery(
  filters: TalentsDirectoryFilters,
  page: number
) {
  return {
    page,
    search: filters.search.trim() || undefined,
    category: filters.category ?? undefined,
    verified: filters.verified ?? undefined,
  }
}

export function buildTalentsDirectorySearchParams(
  filters: TalentsDirectoryFilters,
  page = 1
) {
  const params = new URLSearchParams()

  if (page > 1) {
    params.set("page", String(page))
  }

  if (filters.search.trim()) {
    params.set("q", filters.search.trim())
  }

  if (filters.category) {
    params.set("category", filters.category)
  }

  if (filters.verified != null) {
    params.set("verified", filters.verified ? "1" : "0")
  }

  return params
}
