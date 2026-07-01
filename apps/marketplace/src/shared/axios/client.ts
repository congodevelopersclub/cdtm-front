import { createApiClient } from "@workspace/api"

import { getToken } from "@/shared/auth/token"
import { env } from "@/shared/config/env"

export const apiClient = createApiClient({
  baseURL: env.NEXT_PUBLIC_API_URL,
  getToken,
})
