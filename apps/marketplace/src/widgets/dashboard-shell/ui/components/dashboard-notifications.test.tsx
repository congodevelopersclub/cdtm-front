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

  it("opens an empty state when the bell is clicked", async () => {
    const user = userEvent.setup()

    renderWithProviders(<DashboardNotifications />)

    expect(screen.queryByText("2")).not.toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: /notifications/i }))

    expect(screen.getByText("No notifications yet")).toBeInTheDocument()
    expect(screen.queryByText("New job invite")).not.toBeInTheDocument()
  })
})
