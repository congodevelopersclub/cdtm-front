import "server-only"

import { cookies } from "next/headers"

import { createApiClient } from "@workspace/api"

import { TOKEN_COOKIE_NAME } from "@/shared/auth/constants"
import { serverEnv } from "@/shared/config/env.server"

export function createServerApiClient() {
  return createApiClient({
    baseURL: serverEnv.API_URL,
    getToken: async () => {
      const cookieStore = await cookies()
      return cookieStore.get(TOKEN_COOKIE_NAME)?.value ?? null
    },
  })
}
