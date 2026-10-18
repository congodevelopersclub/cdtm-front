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
    expect(screen.getByText("Your profile is 0% complete")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Location" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Role" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Top skills" })).toBeInTheDocument()
    expect(screen.queryByRole("link", { name: /work experience/i })).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Skills" })).toHaveAttribute("href", "/skills")
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects")
    expect(screen.getByText("Years of experience")).toBeInTheDocument()
    expect(screen.queryByText("2,500+")).not.toBeInTheDocument()
    expect(screen.queryByText("Profile onboarding session")).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: /view profile/i })).toHaveAttribute(
      "href",
      "/profile",
    )
    expect(screen.getByRole("link", { name: /update profile/i })).toHaveAttribute(
      "href",
      "/profile",
    )
  })
})
