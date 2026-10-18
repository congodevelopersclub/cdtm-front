import type { TalentsDirectoryFilters } from "./talents-directory-filter-types"

export type { TalentsDirectoryFilters } from "./talents-directory-filter-types"

export function filterProfilesByName<T extends { name: string }>(profiles: T[], query: string) {
  const needle = query.trim().toLowerCase()

  if (!needle) {
    return profiles
  }

  return profiles.filter((profile) => profile.name.toLowerCase().includes(needle))
}

export function hasActiveTalentsDirectoryFilters(filters: TalentsDirectoryFilters) {
  return (
    filters.name.trim().length > 0 ||
    filters.location.trim().length > 0 ||
    filters.category != null ||
    filters.skills.length > 0
  )
}
