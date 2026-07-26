import { describe, expect, it, vi } from "vitest"
import { renderWithProviders, screen, userEvent } from "@/test/render"

import { STORY_DASHBOARD_USER } from "@/widgets/dashboard-shell/storybook/fixtures"

import { DashboardUserMenu } from "./dashboard-user-menu"

const { logoutMock } = vi.hoisted(() => ({
  logoutMock: vi.fn(),
}))

vi.mock("@/features/auth", () => ({
  useAuth: () => ({
    session: { userId: "1", email: "demo@example.com", name: "Demo User" },
    user: {
      id: "1",
      name: "Demo User",
      email: "demo@example.com",
    },
    isAuthenticated: true,
    isLoading: false,
    refreshSession: vi.fn(),
  }),
  useLogout: () => logoutMock,
}))

describe("DashboardUserMenu", () => {
  it("renders user avatar button", () => {
    renderWithProviders(<DashboardUserMenu user={STORY_DASHBOARD_USER} />)

    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("opens menu with account settings", async () => {
    const user = userEvent.setup()

    renderWithProviders(<DashboardUserMenu user={STORY_DASHBOARD_USER} />)

    await user.click(screen.getByRole("button"))

    expect(screen.getByText(/account settings/i)).toBeInTheDocument()
    expect(screen.getByText(/log out/i)).toBeInTheDocument()
  })

  it("calls logout when log out is clicked", async () => {
    const user = userEvent.setup()

    renderWithProviders(<DashboardUserMenu user={STORY_DASHBOARD_USER} />)

    await user.click(screen.getByRole("button"))
    await user.click(screen.getByText(/log out/i))

    expect(logoutMock).toHaveBeenCalled()
  })
})
