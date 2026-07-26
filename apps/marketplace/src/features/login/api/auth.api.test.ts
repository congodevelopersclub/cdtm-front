import { describe, expect, it, vi } from "vitest"

import { exchangeCodeRequest, getLinkedInAuthUrl } from "./auth.api"

const { postMock } = vi.hoisted(() => ({
  postMock: vi.fn(),
}))

vi.mock("@/shared/axios/client", () => ({
  apiClient: {
    post: postMock,
  },
}))

describe("auth.api", () => {
  it("returns LinkedIn auth URL from API base", () => {
    expect(getLinkedInAuthUrl()).toContain("/auth")
  })

  it("posts code to exchange endpoint", async () => {
    postMock.mockResolvedValue({
      data: {
        token: "test-token",
        user: { id: "1", name: "Test", email: "test@example.com" },
      },
    })

    const result = await exchangeCodeRequest("mock-code")

    expect(postMock).toHaveBeenCalledWith("/auth/exchange-code", {
      code: "mock-code",
    })
    expect(result.token).toBe("test-token")
    expect(result.user.email).toBe("test@example.com")
  })
})
