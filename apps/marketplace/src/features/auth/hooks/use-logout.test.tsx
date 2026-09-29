import { describe, expect, it, vi, beforeEach } from "vitest"
import { renderHook } from "@testing-library/react"

import { useLogout } from "./use-logout"

const { clearAuthStorageMock, notifyMock, assignMock, removeQueriesMock, logoutMock } =
  vi.hoisted(() => ({
    clearAuthStorageMock: vi.fn(),
    notifyMock: vi.fn(),
    assignMock: vi.fn(),
    removeQueriesMock: vi.fn(),
    logoutMock: vi.fn(),
  }))

vi.mock("../actions/logout", () => ({
  logoutAction: logoutMock,
}))

vi.mock("@/shared/auth", () => ({
  clearAuthStorage: clearAuthStorageMock,
  notifyAuthSessionChanged: notifyMock,
}))

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({
    removeQueries: removeQueriesMock,
  }),
}))

describe("useLogout", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    logoutMock.mockResolvedValue("https://example.com/signed-out")
    vi.stubGlobal("location", { assign: assignMock })
  })

  it("clears the session after logout, then redirects to the server url", async () => {
    const { result } = renderHook(() => useLogout())

    await result.current()

    expect(logoutMock).toHaveBeenCalled()
    expect(clearAuthStorageMock).toHaveBeenCalled()
    expect(removeQueriesMock).toHaveBeenCalledWith({ queryKey: ["user"] })
    expect(notifyMock).toHaveBeenCalled()
    expect(assignMock).toHaveBeenCalledWith("https://example.com/signed-out")
  })
})
