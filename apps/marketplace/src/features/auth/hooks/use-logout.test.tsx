import { describe, expect, it, vi, beforeEach } from "vitest"
import { renderHook } from "@testing-library/react"

import { useLogout } from "./use-logout"

const { clearAuthStorageMock, notifyMock, replaceMock, refreshMock, removeQueriesMock, logoutMock } =
  vi.hoisted(() => ({
    clearAuthStorageMock: vi.fn(),
    notifyMock: vi.fn(),
    replaceMock: vi.fn(),
    refreshMock: vi.fn(),
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

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
    refresh: refreshMock,
  }),
}))

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({
    removeQueries: removeQueriesMock,
  }),
}))

describe("useLogout", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    logoutMock.mockResolvedValue(undefined)
  })

  it("clears server cookie, auth storage, query cache, and navigates to /auth", async () => {
    const { result } = renderHook(() => useLogout())

    await result.current()

    expect(logoutMock).toHaveBeenCalled()
    expect(clearAuthStorageMock).toHaveBeenCalled()
    expect(removeQueriesMock).toHaveBeenCalledWith({ queryKey: ["user"] })
    expect(notifyMock).toHaveBeenCalled()
    expect(replaceMock).toHaveBeenCalledWith("/auth")
    expect(refreshMock).toHaveBeenCalled()
  })
})
