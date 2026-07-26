import { describe, expect, it, vi, beforeEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"

import { createQueryWrapper } from "@/test/query-wrapper"

import { useExchangeCode } from "./use-exchange-code"

const { exchangeMock, getUserMock, setTokenMock, setUserIdMock, setUserSessionMock, notifyMock } =
  vi.hoisted(() => ({
    exchangeMock: vi.fn(),
    getUserMock: vi.fn(),
    setTokenMock: vi.fn(),
    setUserIdMock: vi.fn(),
    setUserSessionMock: vi.fn(),
    notifyMock: vi.fn(),
  }))

const replaceMock = vi.fn()

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

vi.mock("../api/auth.api", () => ({
  exchangeCodeRequest: exchangeMock,
}))

vi.mock("@/entities/user", () => ({
  getUserRequest: getUserMock,
  userQueryKey: (userId: string | null) => ["user", userId],
}))

vi.mock("@/shared/auth", () => ({
  setToken: setTokenMock,
  notifyAuthSessionChanged: notifyMock,
}))

vi.mock("@/shared/auth/user-id", () => ({
  setUserId: setUserIdMock,
}))

vi.mock("@/shared/auth/user-session", () => ({
  setUserSession: setUserSessionMock,
}))

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
  useSearchParams: () => new URLSearchParams(),
}))

describe("useExchangeCode", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("saves user id and fetched profile after exchange", async () => {
    exchangeMock.mockResolvedValue({
      token: "test-token",
      user: { id: "user-1", name: "Test", email: "test@example.com" },
    })

    getUserMock.mockResolvedValue({
      id: "user-1",
      name: "Christian Siku",
      email: "chrissiku5@gmail.com",
      role: "USER",
    })

    const { result } = renderHook(() => useExchangeCode(), {
      wrapper: createQueryWrapper(),
    })

    result.current.mutate("mock-code")

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(setTokenMock).toHaveBeenCalledWith("test-token")
    expect(setUserIdMock).toHaveBeenCalledWith("user-1")
    expect(getUserMock).toHaveBeenCalledWith("user-1")
    expect(setUserSessionMock).toHaveBeenCalledWith({
      id: "user-1",
      name: "Christian Siku",
      email: "chrissiku5@gmail.com",
      role: "USER",
    })
    expect(notifyMock).toHaveBeenCalled()
    expect(replaceMock).toHaveBeenCalledWith("/dashboard")
  })
})
