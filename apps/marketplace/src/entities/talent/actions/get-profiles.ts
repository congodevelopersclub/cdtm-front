"use server"

import { mapApiProfileToTalentProfile } from "../lib/map-api-profile"
import type { ApiProfilesPaginatedResponse, ProfilesResult } from "../model/api-types"

import { createServerApiClient } from "@/shared/api/server-client"

export async function getProfilesAction(page: number): Promise<ProfilesResult> {
  const apiClient = createServerApiClient()
  const { data } = await apiClient.get<ApiProfilesPaginatedResponse>(`/profiles?page=${page}`)

  return {
    profiles: data.data.map(mapApiProfileToTalentProfile),
    pagination: {
      currentPage: data.current_page,
      lastPage: data.last_page,
      perPage: data.per_page,
      total: data.total,
      from: data.from ?? 0,
      to: data.to ?? 0,
    },
  }
}
