import { describe, expect, it } from "vitest"
import { renderWithProviders, screen, userEvent } from "@/test/render"

import { STORY_DASHBOARD_USER } from "@/widgets/dashboard-shell/storybook/fixtures"

import { DashboardUserMenu } from "./dashboard-user-menu"

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
})
