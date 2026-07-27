import { describe, expect, it } from "vitest"
import { renderWithProviders, screen, userEvent } from "@/test/render"

import { STORY_SAMPLE_TABS } from "@/widgets/dashboard-shell/storybook/fixtures"

import { DashboardTabbedShell } from "./dashboard-tabbed-shell"

describe("DashboardTabbedShell", () => {
  it("renders all tab labels", () => {
    renderWithProviders(
      <DashboardTabbedShell tabs={STORY_SAMPLE_TABS} defaultTab="overview" />
    )

    expect(screen.getByRole("tab", { name: "Overview" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Activity" })).toBeInTheDocument()
  })

  it("shows default tab content", () => {
    renderWithProviders(
      <DashboardTabbedShell tabs={STORY_SAMPLE_TABS} defaultTab="overview" />
    )

    expect(screen.getByText("Overview panel content")).toBeInTheDocument()
  })

  it("switches panel content when a tab is clicked", async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <DashboardTabbedShell tabs={STORY_SAMPLE_TABS} defaultTab="overview" />
    )

    await user.click(screen.getByRole("tab", { name: "Activity" }))

    expect(screen.getByText("Activity panel content")).toBeInTheDocument()
    expect(screen.queryByText("Overview panel content")).not.toBeInTheDocument()
  })
})
