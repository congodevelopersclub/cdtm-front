import type { AuthUser, GetUserResponse } from "../types"

import { apiClient } from "@/shared/axios/client"

export async function getUserRequest(userId: string): Promise<AuthUser> {
  const { data } = await apiClient.get<GetUserResponse>(`/users/${userId}`)

  return data.data
}
