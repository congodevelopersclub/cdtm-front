import { describe, expect, it } from "vitest"

import {
  expiredSessionPlan,
  isExternalSessionRedirect,
  isUnauthenticatedClientError,
  pathnameFromRequestHeaders,
  UnauthenticatedError,
} from "./expired-session"

describe("expired session", () => {
  it("logs out when an authenticated request is rejected", () => {
    expect(
      expiredSessionPlan({
        message: "Unauthenticated.",
        url: "/profiles/1",
        hadAuthorization: true,
        pathname: "/skills",
      })
    ).toBe("logout")
  })

  it("signals the client without leaving the login page", () => {
    expect(
      expiredSessionPlan({
        message: "Unauthenticated.",
        url: "/users/1",
        hadAuthorization: true,
        pathname: "/auth",
      })
    ).toBe("signal")
  })

  it("leaves login exchange errors to the form", () => {
    expect(
      expiredSessionPlan({
        message: "Unauthenticated.",
        url: "/auth/exchange-code",
        hadAuthorization: false,
        pathname: "/auth",
      })
    ).toBe("ignore")
  })

  it("reads the page path from the request", () => {
    expect(
      pathnameFromRequestHeaders({
        get: (name) => (name === "referer" ? "http://localhost:3000/skills?page=2" : null),
      })
    ).toBe("/skills")
  })

  it("recognizes the expired-session error on the client", () => {
    expect(isUnauthenticatedClientError(new UnauthenticatedError())).toBe(true)
    expect(
      isUnauthenticatedClientError({
        digest: "NEXT_REDIRECT;replace;http://localhost:3001;307;",
      })
    ).toBe(true)
    expect(
      isExternalSessionRedirect({
        digest: "NEXT_REDIRECT;push;/dashboard;307;",
      })
    ).toBe(false)
    expect(isUnauthenticatedClientError(new Error("The given data was invalid."))).toBe(false)
  })
})
