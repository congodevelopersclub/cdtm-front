import { describe, expect, it, vi } from "vitest"
import { renderWithProviders, screen } from "@/test/render"

import { getDashboardNav } from "@/widgets/dashboard-shell/config/menus"

import { NavMain } from "./nav-main"

describe("NavMain", () => {
  it("highlights the active dashboard route", () => {
    renderWithProviders(<NavMain items={getDashboardNav("talent")} />, {
      withSidebar: true,
    })

    const dashboardLink = screen.getByRole("link", { name: /dashboard/i })
    expect(dashboardLink.className).toContain("bg-sidebar-primary")
    expect(dashboardLink.className).toContain("text-sidebar-primary-foreground")
    expect(dashboardLink.className).toContain("rounded-lg")
    expect(dashboardLink.className).not.toContain("rounded-full")

    const profileLink = screen.getByRole("link", { name: /profile/i })
    expect(profileLink.className).toContain("text-sidebar-foreground")
    expect(profileLink.className).not.toContain("bg-sidebar-primary")
    expect(profileLink.className).toContain("rounded-lg")
  })

  it("renders translated labels in French locale", () => {
    renderWithProviders(<NavMain items={getDashboardNav("talent")} />, {
      locale: "fr",
      withSidebar: true,
    })

    expect(screen.getByRole("link", { name: /tableau de bord/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /projets/i })).toBeInTheDocument()
    expect(screen.queryByRole("link", { name: /emplois/i })).not.toBeInTheDocument()
  })

  it("uses pathname to determine active item", async () => {
    const navigation = await import("next/navigation")

    vi.mocked(navigation.usePathname).mockReturnValue("/projects")

    renderWithProviders(<NavMain items={getDashboardNav("talent")} />, {
      withSidebar: true,
    })

    const projectsLink = screen.getByRole("link", { name: /projects/i })
    expect(projectsLink.className).toContain("bg-sidebar-primary")
  })
})
