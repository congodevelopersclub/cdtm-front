import { describe, expect, it } from "vitest"

import { isAuthenticatedToken } from "./session"

describe("isAuthenticatedToken", () => {
  it("treats opaque Sanctum tokens as valid when non-empty", () => {
    expect(isAuthenticatedToken("4|abc123")).toBe(true)
  })

  it("rejects empty tokens", () => {
    expect(isAuthenticatedToken("")).toBe(false)
  })

  it("rejects expired JWT tokens", () => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
    const payload = btoa(
      JSON.stringify({ sub: "1", exp: Math.floor(Date.now() / 1000) - 60 })
    )
    const expiredJwt = `${header}.${payload}.signature`

    expect(isAuthenticatedToken(expiredJwt)).toBe(false)
  })

  it("accepts non-expired JWT tokens", () => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
    const payload = btoa(
      JSON.stringify({ sub: "1", exp: Math.floor(Date.now() / 1000) + 3600 })
    )
    const validJwt = `${header}.${payload}.signature`

    expect(isAuthenticatedToken(validJwt)).toBe(true)
  })
})
