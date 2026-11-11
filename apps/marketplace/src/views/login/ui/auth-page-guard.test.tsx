import { describe, expect, it, vi, beforeEach } from "vitest"
import { renderWithProviders, screen } from "@/test/render"

import { AuthPageGuard } from "./auth-page-guard"

const { replaceMock } = vi.hoisted(() => ({
  replaceMock: vi.fn(),
}))

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
    push: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: vi.fn(() => "/auth"),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}))

const useAuthMock = vi.fn<() => {
  isAuthenticated: boolean
  isLoading: boolean
}>()

vi.mock("@/features/auth", () => ({
  useAuth: () => useAuthMock(),
}))

describe("AuthPageGuard", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders children when user is not authenticated", () => {
    useAuthMock.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    })

    renderWithProviders(
      <AuthPageGuard>
        <p>Sign in content</p>
      </AuthPageGuard>
    )

    expect(screen.getByText("Sign in content")).toBeInTheDocument()
    expect(replaceMock).not.toHaveBeenCalled()
  })

  it("redirects to dashboard when user is authenticated", () => {
    useAuthMock.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    })

    renderWithProviders(
      <AuthPageGuard>
        <p>Sign in content</p>
      </AuthPageGuard>
    )

    expect(replaceMock).toHaveBeenCalledWith("/dashboard")
  })

  it("shows loading state while auth is loading", () => {
    useAuthMock.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    })

    renderWithProviders(
      <AuthPageGuard>
        <p>Sign in content</p>
      </AuthPageGuard>
    )

    expect(screen.queryByText("Sign in content")).not.toBeInTheDocument()
  })
})
