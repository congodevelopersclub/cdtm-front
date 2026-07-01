import type { LoginFormValues } from "../validation"

import type { LoginResponse } from "@/entities/user"
import { apiClient } from "@/shared/axios/client"

export async function loginRequest(
  credentials: LoginFormValues
): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>(
    "/auth/login",
    credentials
  )

  return data
}
