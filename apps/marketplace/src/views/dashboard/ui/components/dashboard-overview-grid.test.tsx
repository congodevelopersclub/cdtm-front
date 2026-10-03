import { describe, expect, it } from "vitest"
import { renderWithProviders, screen } from "@/test/render"

import { DashboardOverviewGrid } from "./dashboard-overview-grid"

describe("DashboardOverviewGrid", () => {
  it("renders greeting, platform stats, upcoming events, and profile link", () => {
    renderWithProviders(<DashboardOverviewGrid />)

    expect(screen.getByRole("heading", { name: /hello, demo/i })).toBeInTheDocument()
    expect(screen.getByText("2,500+")).toBeInTheDocument()
    expect(screen.getByText("120+")).toBeInTheDocument()
    expect(screen.getByText("350+")).toBeInTheDocument()
    expect(screen.getByText("Profile onboarding session")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /view profile/i })).toHaveAttribute(
      "href",
      "/profile",
    )
  })
})
