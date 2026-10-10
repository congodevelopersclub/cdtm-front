"use server"

import { clearAllCookies } from "@/shared/auth/clear-all-cookies"
import { serverEnv } from "@/shared/config/env.server"

export async function logoutAction(): Promise<string> {
  await clearAllCookies()

  return serverEnv.LOGOUT_REDIRECT_URL
}
