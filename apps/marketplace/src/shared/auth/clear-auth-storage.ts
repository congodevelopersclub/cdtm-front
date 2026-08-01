import { clearUserId } from "./user-id"
import { clearUserSession } from "./user-session"

export function clearAuthStorage() {
  clearUserId()
  clearUserSession()
}
