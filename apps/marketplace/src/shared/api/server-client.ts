import "server-only"

import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

import { createApiClient } from "@workspace/api"

import { clearAllCookies } from "@/shared/auth/clear-all-cookies"
import { TOKEN_COOKIE_NAME } from "@/shared/auth/constants"
import {
  expiredSessionPlan,
  pathnameFromRequestHeaders,
  UnauthenticatedError,
} from "@/shared/auth/expired-session"
import { serverEnv } from "@/shared/config/env.server"

export function createServerApiClient(accessToken?: string | null) {
  const client = createApiClient({
    baseURL: serverEnv.API_URL,
    getToken: async () => {
      if (accessToken) {
        return accessToken
      }

      const cookieStore = await cookies()
      return cookieStore.get(TOKEN_COOKIE_NAME)?.value ?? null
    },
    onUnauthorized: async (context) => {
      const headerStore = await headers()
      const plan = expiredSessionPlan({
        ...context,
        pathname: pathnameFromRequestHeaders(headerStore),
      })

      if (plan === "ignore") {
        return
      }

      if (context.hadAuthorization) {
        await clearAllCookies()
      }

      if (plan === "logout") {
        redirect(serverEnv.LOGOUT_REDIRECT_URL)
      }

      throw new UnauthenticatedError()
    },
  })

  client.interceptors.request.use((request) => {
    if (request.url?.includes("/auth/exchange-code")) {
      request.headers.delete("Authorization")
    }

    return request
  })

  return client
}
