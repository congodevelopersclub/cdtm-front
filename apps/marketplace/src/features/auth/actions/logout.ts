"use server"

import { cookies } from "next/headers"

import { TOKEN_COOKIE_NAME } from "@/shared/auth/constants"

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(TOKEN_COOKIE_NAME)
}
