import type { LoginResponse } from "@/entities/user"
import { apiClient } from "@/shared/axios/client"

import type { LoginFormValues } from "../validation"

export async function loginRequest(
  credentials: LoginFormValues
): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>(
    "/auth/login",
    credentials
  )

  return data
}
