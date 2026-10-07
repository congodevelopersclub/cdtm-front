import { mapApiProfileToPublicTalent } from "../lib/map-api-profile"
import type { ApiProfilesPaginatedResponse } from "../model/api-types"
import type { PublicTalentsPage } from "../model/types"

import { getApiUrl } from "@/shared/config/env"

export type PublicProfilesQuery = {
  location?: string
  category?: string
  skills?: string
}

export async function getPublicProfiles(
  page: number,
  filters: PublicProfilesQuery = {}
): Promise<PublicTalentsPage> {
  const params = new URLSearchParams({ page: String(page) })

  if (filters.location) {
    params.set("location", filters.location)
  }

  if (filters.category) {
    params.set("category", filters.category)
  }

  if (filters.skills) {
    params.set("skills", filters.skills)
  }

  const response = await fetch(`${getApiUrl()}/profiles/search?${params.toString()}`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to load talents")
  }

  const data = (await response.json()) as ApiProfilesPaginatedResponse

  return {
    profiles: data.data.map(mapApiProfileToPublicTalent),
    pagination: {
      currentPage: data.current_page,
      lastPage: data.last_page,
      total: data.total,
      from: data.from ?? 0,
      to: data.to ?? 0,
    },
  }
}
