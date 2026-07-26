import { describe, expect, it, vi, beforeEach } from "vitest"
import { renderHook } from "@testing-library/react"

import { useLogout } from "./use-logout"

const { clearAuthStorageMock, notifyMock, replaceMock, refreshMock, removeQueriesMock } =
  vi.hoisted(() => ({
    clearAuthStorageMock: vi.fn(),
    notifyMock: vi.fn(),
    replaceMock: vi.fn(),
    refreshMock: vi.fn(),
    removeQueriesMock: vi.fn(),
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
  })

  it("clears auth storage, query cache, and navigates to /auth", () => {
    const { result } = renderHook(() => useLogout())

    result.current()

    expect(clearAuthStorageMock).toHaveBeenCalled()
    expect(removeQueriesMock).toHaveBeenCalledWith({ queryKey: ["user"] })
    expect(notifyMock).toHaveBeenCalled()
    expect(replaceMock).toHaveBeenCalledWith("/auth")
    expect(refreshMock).toHaveBeenCalled()
  })
})
