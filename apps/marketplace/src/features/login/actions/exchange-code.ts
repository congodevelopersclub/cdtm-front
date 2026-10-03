"use server"

import { cookies } from "next/headers"

import { getUserAction } from "@/entities/user"
import type { AuthUser, ExchangeCodeResponse } from "@/entities/user"
import { TOKEN_COOKIE_NAME } from "@/shared/auth/constants"
import { createServerApiClient } from "@/shared/api/server-client"

const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

export async function exchangeCodeAction(code: string): Promise<{ user: AuthUser }> {
  const apiClient = createServerApiClient()
  const { data } = await apiClient.post<ExchangeCodeResponse>("/auth/exchange-code", {
    code,
  })

  const cookieStore = await cookies()
  cookieStore.set(TOKEN_COOKIE_NAME, data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TOKEN_MAX_AGE_SECONDS,
  })

  const user = await getUserAction(data.user.id)

  return { user }
}
