import { describe, expect, it } from "vitest"

import { getBreadcrumbTrail } from "./get-breadcrumbs"

describe("getBreadcrumbTrail", () => {
  it("returns a single segment for top-level dashboard routes", () => {
    expect(getBreadcrumbTrail("/jobs", "talent")).toEqual([
      { kind: "current", labelKey: "navJobs" },
    ])
  })

  it("returns profile segment for own profile route", () => {
    expect(getBreadcrumbTrail("/profile", "talent")).toEqual([
      { kind: "current", labelKey: "navProfile" },
    ])
  })

  it("returns talents parent plus dynamic segment for talent detail", () => {
    expect(getBreadcrumbTrail("/talents/profile-1", "talent")).toEqual([
      { kind: "link", labelKey: "navTalents", href: "/talents" },
      { kind: "dynamic" },
    ])
  })

  it("falls back to dashboard when route is unknown", () => {
    expect(getBreadcrumbTrail("/unknown", "talent")).toEqual([
      { kind: "current", labelKey: "navDashboard" },
    ])
  })
})
