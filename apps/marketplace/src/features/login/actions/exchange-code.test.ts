import { describe, expect, it, vi, beforeEach } from "vitest"

import { exchangeCodeAction } from "./exchange-code"

const { postMock, getMock, setMock, getUserActionMock } = vi.hoisted(() => ({
  postMock: vi.fn(),
  getMock: vi.fn(),
  setMock: vi.fn(),
  getUserActionMock: vi.fn(),
}))

vi.mock("@/shared/api/server-client", () => ({
  createServerApiClient: () => ({
    post: postMock,
    get: getMock,
  }),
}))

vi.mock("next/headers", () => ({
  cookies: vi.fn(() =>
    Promise.resolve({
      set: setMock,
    }),
  ),
}))

vi.mock("@/entities/user", () => ({
  getUserAction: getUserActionMock,
}))

describe("exchangeCodeAction", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("exchanges code, sets httpOnly cookie, and returns user profile", async () => {
    postMock.mockResolvedValue({
      data: {
        token: "test-token",
        user: { id: "user-1", name: "Test", email: "test@example.com" },
      },
    })

    getUserActionMock.mockResolvedValue({
      id: "user-1",
      name: "Christian Siku",
      email: "chrissiku5@gmail.com",
      role: "USER",
    })

    const result = await exchangeCodeAction("mock-code")

    expect(postMock).toHaveBeenCalledWith("/auth/exchange-code", {
      code: "mock-code",
    })
    expect(setMock).toHaveBeenCalledWith(
      "access_token",
      "test-token",
      expect.objectContaining({ httpOnly: true }),
    )
    expect(getUserActionMock).toHaveBeenCalledWith("user-1")
    expect(result.user.email).toBe("chrissiku5@gmail.com")
  })
})
