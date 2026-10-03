const USER_ID_KEY = "cdc_marketplace_user_id"

export function getUserId(): string | null {
  if (typeof localStorage === "undefined") {
    return null
  }

  return localStorage.getItem(USER_ID_KEY)
}

export function setUserId(userId: string) {
  if (typeof localStorage === "undefined") {
    return
  }

  localStorage.setItem(USER_ID_KEY, userId)
}

export function clearUserId() {
  if (typeof localStorage === "undefined") {
    return
  }

  localStorage.removeItem(USER_ID_KEY)
}
