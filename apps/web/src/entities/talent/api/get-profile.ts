import { mapApiProfileToPublicTalent } from "../lib/map-api-profile"
import type { ApiProfileResponse } from "../model/api-types"
import type { PublicTalent } from "../model/types"

import { getApiUrl } from "@/shared/config/env"

export async function getPublicProfile(id: string): Promise<PublicTalent | null> {
  const response = await fetch(
    `${getApiUrl()}/profiles/${encodeURIComponent(id)}`,
    { cache: "no-store" }
  )

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error("Failed to load talent profile")
  }

  const data = (await response.json()) as ApiProfileResponse

  return mapApiProfileToPublicTalent(data.data)
}
