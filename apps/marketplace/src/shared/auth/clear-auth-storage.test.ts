import { describe, expect, it, beforeEach } from "vitest"

import { clearAuthStorage } from "./clear-auth-storage"
import { getUserId, setUserId } from "./user-id"
import { getUserSession, setUserSession } from "./user-session"

describe("clearAuthStorage", () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it("clears localStorage user id and session profile", () => {
    setUserId("user-1")
    setUserSession({ id: "user-1", name: "Test User", email: "test@example.com" })

    clearAuthStorage()

    expect(getUserId()).toBeNull()
    expect(getUserSession()).toBeNull()
  })
})
