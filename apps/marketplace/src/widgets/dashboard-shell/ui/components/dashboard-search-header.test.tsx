import { describe, expect, it } from "vitest"
import { renderWithProviders, screen } from "@/test/render"

import { STORY_DASHBOARD_USER } from "@/widgets/dashboard-shell/storybook/fixtures"

import { DashboardSearchHeader } from "./dashboard-search-header"

describe("DashboardSearchHeader", () => {
  it("renders search input with accessible label", () => {
    renderWithProviders(
      <DashboardSearchHeader role="talent" user={STORY_DASHBOARD_USER} />,
      {
      withSidebar: true,
    })

    expect(
      screen.getByRole("combobox", {
        name: /search for jobs, skills, and people/i,
      })
    ).toBeInTheDocument()
  })

  it("renders notifications bell and user avatar", () => {
    renderWithProviders(
      <DashboardSearchHeader role="talent" user={STORY_DASHBOARD_USER} />,
      {
      withSidebar: true,
    })

    expect(
      screen.getByRole("button", { name: /notifications/i })
    ).toBeInTheDocument()
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(2)
  })
})
