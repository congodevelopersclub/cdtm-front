import "server-only"

import { cookies } from "next/headers"

import { createApiClient } from "@workspace/api"

import { TOKEN_COOKIE_NAME } from "@/shared/auth/constants"
import { serverEnv } from "@/shared/config/env.server"

export function createServerApiClient(accessToken?: string | null) {
  return createApiClient({
    baseURL: serverEnv.API_URL,
    getToken: async () => {
      if (accessToken) {
        return accessToken
      }

      const cookieStore = await cookies()
      return cookieStore.get(TOKEN_COOKIE_NAME)?.value ?? null
    },
  })
}
