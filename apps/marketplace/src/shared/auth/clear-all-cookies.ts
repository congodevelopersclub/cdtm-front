import "server-only"

import { cookies } from "next/headers"

export async function clearAllCookies() {
  const cookieStore = await cookies()

  for (const cookie of cookieStore.getAll()) {
    cookieStore.delete(cookie.name)
  }
}
