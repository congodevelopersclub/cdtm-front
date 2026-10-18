import { describe, expect, it, beforeEach } from "vitest"

import { clearUserId, getUserId, setUserId } from "./user-id"

describe("user-id storage", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("stores and retrieves user id", () => {
    setUserId("019f9f69-8cdd-715a-826e-431c67189663")

    expect(getUserId()).toBe("019f9f69-8cdd-715a-826e-431c67189663")
  })

  it("clears user id", () => {
    setUserId("019f9f69-8cdd-715a-826e-431c67189663")
    clearUserId()

    expect(getUserId()).toBeNull()
  })
})
