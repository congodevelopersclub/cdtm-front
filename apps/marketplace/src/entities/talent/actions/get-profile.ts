"use server"

import { mapApiProfileToTalentProfile } from "../lib/map-api-profile"
import type { ApiProfileResponse } from "../model/api-types"
import type { TalentProfile } from "../model/types"

import { createServerApiClient } from "@/shared/api/server-client"

export async function getProfileAction(id: string): Promise<TalentProfile> {
  const apiClient = createServerApiClient()
  const { data } = await apiClient.get<ApiProfileResponse>(`/profiles/${id}`)

  return mapApiProfileToTalentProfile(data.data)
}
