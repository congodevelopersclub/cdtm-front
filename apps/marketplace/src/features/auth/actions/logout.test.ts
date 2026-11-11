import { describe, expect, it, vi, beforeEach } from "vitest"

import { logoutAction } from "./logout"

const { deleteMock, getAllMock } = vi.hoisted(() => ({
  deleteMock: vi.fn(),
  getAllMock: vi.fn(),
}))

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({
    getAll: getAllMock,
    delete: deleteMock,
  })),
}))

vi.mock("@/shared/config/env.server", () => ({
  serverEnv: { LOGOUT_REDIRECT_URL: "http://localhost:3001" },
}))

describe("logoutAction", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getAllMock.mockReturnValue([{ name: "access_token" }, { name: "sidebar_state" }, { name: "NEXT_LOCALE" }])
  })

  it("clears every cookie and returns the logout url", async () => {
    await expect(logoutAction()).resolves.toBe("http://localhost:3001")
    expect(deleteMock).toHaveBeenCalledWith("access_token")
    expect(deleteMock).toHaveBeenCalledWith("sidebar_state")
    expect(deleteMock).toHaveBeenCalledWith("NEXT_LOCALE")
  })
})
