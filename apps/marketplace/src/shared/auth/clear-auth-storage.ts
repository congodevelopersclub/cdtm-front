import { clearToken } from "./token"
import { clearUserId } from "./user-id"
import { clearUserSession } from "./user-session"

export function clearAuthStorage() {
  clearToken()
  clearUserId()
  clearUserSession()
}
