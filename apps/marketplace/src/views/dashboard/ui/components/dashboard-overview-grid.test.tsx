import { describe, expect, it, vi } from "vitest"
import { renderWithProviders, screen } from "@/test/render"

import { DashboardOverviewGrid } from "./dashboard-overview-grid"

vi.mock("@/entities/talent/hooks/use-profile", () => ({
  useProfile: () => ({
    data: undefined,
    isLoading: false,
    isError: false,
  }),
}))

describe("DashboardOverviewGrid", () => {
  it("renders the signed-in user's greeting and profile link", () => {
    renderWithProviders(<DashboardOverviewGrid />)

    expect(screen.getByRole("heading", { name: /hello, demo/i })).toBeInTheDocument()
    expect(screen.getAllByText("Demo User").length).toBeGreaterThan(0)
    expect(screen.getByText("Nothing scheduled")).toBeInTheDocument()
    expect(screen.getAllByText("Skills").length).toBeGreaterThan(0)
    expect(screen.getByText("Projects")).toBeInTheDocument()
    expect(screen.getByText("Years of experience")).toBeInTheDocument()
    expect(screen.queryByText("2,500+")).not.toBeInTheDocument()
    expect(screen.queryByText("Profile onboarding session")).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: /view profile/i })).toHaveAttribute(
      "href",
      "/profile",
    )
  })
})
