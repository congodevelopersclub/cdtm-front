import { mapApiProfileToPublicTalent } from "../lib/map-api-profile"
import type { ApiProfilesPaginatedResponse } from "../model/api-types"
import type { PublicTalentsPage } from "../model/types"

import { getApiUrl } from "@/shared/config/env"

export async function getPublicProfiles(page: number): Promise<PublicTalentsPage> {
  const response = await fetch(`${getApiUrl()}/profiles?page=${page}`, {
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
