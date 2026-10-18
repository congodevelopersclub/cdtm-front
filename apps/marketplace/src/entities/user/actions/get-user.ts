"use server"

import type { AuthUser, GetUserResponse } from "../types"

import { createServerApiClient } from "@/shared/api/server-client"

export async function getUserAction(
  userId: string,
  accessToken?: string
): Promise<AuthUser> {
  const apiClient = createServerApiClient(accessToken)
  const { data } = await apiClient.get<GetUserResponse>(`/users/${userId}`)

  return data.data
}
