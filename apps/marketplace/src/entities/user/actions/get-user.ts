"use server"

import type { AuthUser, GetUserResponse } from "../types"

import { createServerApiClient } from "@/shared/api/server-client"

export async function getUserAction(userId: string): Promise<AuthUser> {
  const apiClient = createServerApiClient()
  const { data } = await apiClient.get<GetUserResponse>(`/users/${userId}`)

  return data.data
}
