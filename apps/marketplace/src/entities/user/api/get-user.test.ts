import { describe, expect, it, vi } from "vitest"

import { getUserRequest } from "./get-user"

const { getMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
}))

vi.mock("@/shared/axios/client", () => ({
  apiClient: {
    get: getMock,
  },
}))

describe("getUserRequest", () => {
  it("fetches user by id and unwraps data", async () => {
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

    const user = await getUserRequest("019f9f69-8cdd-715a-826e-431c67189663")

    expect(getMock).toHaveBeenCalledWith("/users/019f9f69-8cdd-715a-826e-431c67189663")
    expect(user.name).toBe("Christian Siku")
    expect(user.email).toBe("chrissiku5@gmail.com")
  })
})
