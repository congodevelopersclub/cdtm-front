import { createApiClient } from "@workspace/api"

import { env } from "@/shared/config/env"

export const apiClient = createApiClient({
  baseURL: env.NEXT_PUBLIC_API_URL,
})
