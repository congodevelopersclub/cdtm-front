import { TOKEN_COOKIE_NAME } from "./constants"

/** @deprecated Token is stored in an httpOnly cookie via server actions. */
export function getToken(): string | null {
  if (typeof document === "undefined") {
    return null
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${TOKEN_COOKIE_NAME}=([^;]*)`)
  )

  return match?.[1] ? decodeURIComponent(match[1]) : null
}

/** @deprecated Token is stored in an httpOnly cookie via server actions. */
export function setToken(token: string, maxAgeSeconds = 60 * 60 * 24 * 7) {
  if (typeof document === "undefined") {
    return
  }

  document.cookie = `${TOKEN_COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`
}

/** @deprecated Token is cleared via logoutAction on the server. */
export function clearToken() {
  if (typeof document === "undefined") {
    return
  }

  document.cookie = `${TOKEN_COOKIE_NAME}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
}
