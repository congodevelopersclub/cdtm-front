import { describe, expect, it } from "vitest"
import { renderWithProviders, screen, userEvent } from "@/test/render"

import { DashboardNotifications } from "./dashboard-notifications"

describe("DashboardNotifications", () => {
  it("renders the notifications bell button", () => {
    renderWithProviders(<DashboardNotifications />)

    expect(
      screen.getByRole("button", { name: /notifications/i })
    ).toBeInTheDocument()
  })

  it("shows unread count badge", () => {
    renderWithProviders(<DashboardNotifications />)

    expect(screen.getByText("2")).toBeInTheDocument()
  })

  it("opens dropdown when bell is clicked", async () => {
    const user = userEvent.setup()

    renderWithProviders(<DashboardNotifications />)

    await user.click(screen.getByRole("button", { name: /notifications/i }))

    expect(screen.getByText("New job invite")).toBeInTheDocument()
  })
})
