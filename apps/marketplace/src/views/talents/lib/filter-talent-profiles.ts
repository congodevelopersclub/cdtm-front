import type { TalentProfile } from "@/entities/talent"

import { matchesSearchQuery } from "@/shared/lib/search"

import { getTalentProfileSearchFields } from "./get-talent-profile-search-fields"
import type { TalentsDirectoryFilters } from "./talents-directory-filter-types"

export type { TalentsDirectoryFilters } from "./talents-directory-filter-types"

export function hasActiveTalentsDirectoryFilters(
  filters: TalentsDirectoryFilters
) {
  return (
    filters.search.trim().length > 0 ||
    filters.category != null ||
    filters.verified != null
  )
}

export function filterTalentProfiles(
  profiles: TalentProfile[],
  filters: TalentsDirectoryFilters
) {
  return profiles.filter((profile) => {
    if (filters.category && !profile.categories?.includes(filters.category)) {
      return false
    }

    if (filters.verified === true && !profile.verified) {
      return false
    }

    if (filters.verified === false && profile.verified) {
      return false
    }

    if (
      filters.search.trim() &&
      !matchesSearchQuery(filters.search, getTalentProfileSearchFields(profile))
    ) {
      return false
    }

    return true
  })
}
