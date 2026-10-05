import { mapApiProfileToPublicTalent } from "../lib/map-api-profile"
import type { ApiProfilesPaginatedResponse } from "../model/api-types"
import type { PublicTalentsPage } from "../model/types"

import { getApiUrl } from "@/shared/config/env"

export type PublicProfilesQuery = {
  search?: string
  category?: string
  verified?: boolean
}

export async function getPublicProfiles(
  page: number,
  filters: PublicProfilesQuery = {}
): Promise<PublicTalentsPage> {
  const params = new URLSearchParams({ page: String(page) })

  if (filters.search) {
    params.set("search", filters.search)
  }

  if (filters.category) {
    params.set("category", filters.category)
  }

  if (filters.verified != null) {
    params.set("verified", filters.verified ? "1" : "0")
  }

  const response = await fetch(`${getApiUrl()}/profiles?${params.toString()}`, {
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
    },
  }
}
