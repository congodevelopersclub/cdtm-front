import { describe, expect, it } from "vitest"
import { NextRequest } from "next/server"

import { TOKEN_COOKIE_NAME } from "./constants"
import { authMiddleware } from "./middleware"

describe("authMiddleware", () => {
  it("redirects authenticated users away from /auth", () => {
    const request = new NextRequest("http://localhost:3001/auth", {
      headers: {
        cookie: `${TOKEN_COOKIE_NAME}=4%7Cabc123`,
      },
    })

    const response = authMiddleware(request)

    expect(response.status).toBe(307)
    expect(response.headers.get("location")).toBe("http://localhost:3001/dashboard")
  })

  it("allows unauthenticated users to access /auth", () => {
    const request = new NextRequest("http://localhost:3001/auth")

    const response = authMiddleware(request)

    expect(response.status).toBe(200)
  })
})
