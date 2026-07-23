import { describe, expect, it } from "vitest"
import { renderWithProviders, screen, userEvent } from "@/test/render"

import { STORY_DASHBOARD_USER } from "@/widgets/dashboard-shell/storybook/fixtures"

import { DashboardShell } from "./dashboard-shell"

describe("DashboardShell", () => {
  it("renders header and child content", () => {
    renderWithProviders(
      <DashboardShell role="talent" user={STORY_DASHBOARD_USER}>
        <p>Dashboard child content</p>
      </DashboardShell>
    )

    expect(screen.getByText("Dashboard child content")).toBeInTheDocument()
    expect(
      screen.getByRole("searchbox", {
        name: /search for jobs, skills, and people/i,
      })
    ).toBeInTheDocument()
  })

  it("toggles sidebar via trigger button", async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <DashboardShell role="talent" user={STORY_DASHBOARD_USER}>
        <p>Dashboard child content</p>
      </DashboardShell>
    )

    const trigger = screen.getAllByRole("button", { name: /toggle sidebar/i })[0]!
    await user.click(trigger)

    expect(document.cookie).toContain("sidebar_state=false")
  })
})
