export type StoredUserSession = {
  id: string
  name: string
  email: string
  avatar_url?: string | null
  linkedin_id?: string | null
  role?: string
  profile?: {
    avatar_url?: string | null
    [key: string]: unknown
  } | null
}

const USER_SESSION_KEY = "cdc_marketplace_user"

export function getUserSession(): StoredUserSession | null {
  if (typeof sessionStorage === "undefined") {
    return null
  }

  const raw = sessionStorage.getItem(USER_SESSION_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as StoredUserSession
  } catch {
    return null
  }
}

export function setUserSession(user: StoredUserSession) {
  if (typeof sessionStorage === "undefined") {
    return
  }

  sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(user))
}

export function clearUserSession() {
  if (typeof sessionStorage === "undefined") {
    return
  }

  sessionStorage.removeItem(USER_SESSION_KEY)
}
