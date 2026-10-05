"use server"

import { cookies } from "next/headers"

import { TOKEN_COOKIE_NAME } from "@/shared/auth/constants"
import { serverEnv } from "@/shared/config/env.server"

export async function logoutAction(): Promise<string> {
  const cookieStore = await cookies()
  cookieStore.delete(TOKEN_COOKIE_NAME)

  return serverEnv.LOGOUT_REDIRECT_URL
}
