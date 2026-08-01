import { describe, expect, it, vi, beforeEach } from "vitest"

import { getUserAction } from "./get-user"

const { getMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
}))

vi.mock("@/shared/api/server-client", () => ({
  createServerApiClient: () => ({
    get: getMock,
  }),
}))

describe("getUserAction", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns user profile from backend", async () => {
    getMock.mockResolvedValue({
      data: {
        data: {
          id: "019f9f69-8cdd-715a-826e-431c67189663",
          name: "Christian Siku",
          email: "chrissiku5@gmail.com",
          role: "USER",
        },
      },
    })

    const user = await getUserAction("019f9f69-8cdd-715a-826e-431c67189663")

    expect(getMock).toHaveBeenCalledWith("/users/019f9f69-8cdd-715a-826e-431c67189663")
    expect(user.email).toBe("chrissiku5@gmail.com")
  })
})
