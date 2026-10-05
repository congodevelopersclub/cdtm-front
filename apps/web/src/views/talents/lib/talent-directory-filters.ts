import {
  isTalentCategory,
  type PublicTalent,
  type TalentCategory,
} from "@/entities/talent"

export type TalentDirectoryFilters = {
  search: string
  category: TalentCategory | null
  verified: boolean | null
}

type TalentDirectorySearchInput = {
  q?: string
  category?: string
  verified?: string
}

function parseVerifiedFilter(value: string | undefined) {
  if (value === "1") {
    return true
  }

  if (value === "0") {
    return false
  }

  return null
}

export function parseTalentDirectoryFilters(
  input: TalentDirectorySearchInput
): TalentDirectoryFilters {
  return {
    search: input.q ?? "",
    category: input.category && isTalentCategory(input.category) ? input.category : null,
    verified: parseVerifiedFilter(input.verified),
  }
}

export function hasActiveTalentDirectoryFilters(filters: TalentDirectoryFilters) {
  return (
    filters.search.trim().length > 0 ||
    filters.category != null ||
    filters.verified != null
  )
}

export function buildTalentDirectorySearchParams(
  filters: TalentDirectoryFilters,
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

export function talentDirectoryHref(filters: TalentDirectoryFilters, page = 1) {
  const query = buildTalentDirectorySearchParams(filters, page).toString()

  return query ? `/talents?${query}` : "/talents"
}

function matchesSearch(query: string, profile: PublicTalent) {
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean)

  if (tokens.length === 0) {
    return true
  }

  const haystack = [profile.name, profile.title, profile.location, profile.bio, ...profile.skills]
    .join(" ")
    .toLowerCase()

  return tokens.every((token) => haystack.includes(token))
}

export function filterPublicTalents(
  profiles: PublicTalent[],
  filters: TalentDirectoryFilters
) {
  return profiles.filter((profile) => {
    if (filters.category && !profile.categories.includes(filters.category)) {
      return false
    }

    if (filters.verified === true && !profile.verified) {
      return false
    }

    if (filters.verified === false && profile.verified) {
      return false
    }

    if (filters.search.trim() && !matchesSearch(filters.search, profile)) {
      return false
    }

    return true
  })
}
