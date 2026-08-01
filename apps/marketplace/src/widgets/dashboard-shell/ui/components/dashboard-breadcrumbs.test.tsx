import { describe, expect, it, vi } from "vitest"
import { renderWithProviders, screen } from "@/test/render"

import { DashboardBreadcrumbs } from "./dashboard-breadcrumbs"
import { DashboardBreadcrumbProvider } from "../breadcrumb-context"

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/talents/profile-1"),
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}))

describe("DashboardBreadcrumbs", () => {
  it("renders parent link and dynamic current page for talent detail", () => {
    renderWithProviders(
      <DashboardBreadcrumbProvider>
        <DashboardBreadcrumbs role="talent" />
      </DashboardBreadcrumbProvider>
    )

    expect(screen.getByRole("link", { name: /talents/i })).toHaveAttribute(
      "href",
      "/talents"
    )
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it("renders a single current page label for top-level routes", async () => {
    const { usePathname } = await import("next/navigation")
    vi.mocked(usePathname).mockReturnValue("/jobs")

    renderWithProviders(
      <DashboardBreadcrumbProvider>
        <DashboardBreadcrumbs role="talent" />
      </DashboardBreadcrumbProvider>
    )

    expect(screen.getByText("Jobs")).toBeInTheDocument()
    expect(screen.queryByRole("link", { name: /jobs/i })?.tagName).not.toBe("A")
  })
})
