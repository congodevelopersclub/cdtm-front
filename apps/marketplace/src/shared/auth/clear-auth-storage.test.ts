import { describe, expect, it, beforeEach } from "vitest"

import { TOKEN_COOKIE_NAME } from "./constants"
import { clearAuthStorage } from "./clear-auth-storage"
import { setToken } from "./token"
import { getUserId, setUserId } from "./user-id"
import { getUserSession, setUserSession } from "./user-session"

describe("clearAuthStorage", () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    document.cookie = ""
  })

  it("clears token cookie, localStorage user id, and session profile", () => {
    setToken("test-token")
    setUserId("user-1")
    setUserSession({ id: "user-1", name: "Test User", email: "test@example.com" })

    clearAuthStorage()

    expect(document.cookie).not.toContain(TOKEN_COOKIE_NAME)
    expect(getUserId()).toBeNull()
    expect(getUserSession()).toBeNull()
  })
})
