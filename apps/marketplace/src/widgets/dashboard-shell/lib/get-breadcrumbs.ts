import { getDashboardNav } from "../config/menus"
import type { DashboardRole } from "../config/types"

export type BreadcrumbLinkSegment = {
  kind: "link"
  labelKey: string
  href: string
}

export type BreadcrumbCurrentSegment = {
  kind: "current"
  labelKey: string
}

export type BreadcrumbDynamicSegment = {
  kind: "dynamic"
}

export type BreadcrumbSegment =
  | BreadcrumbLinkSegment
  | BreadcrumbCurrentSegment
  | BreadcrumbDynamicSegment

const TALENT_DETAIL_PATTERN = /^\/talents\/[^/]+$/

export function getBreadcrumbTrail(
  pathname: string,
  role: DashboardRole
): BreadcrumbSegment[] {
  const cleanPath = pathname.split("?")[0] ?? pathname

  if (cleanPath === "/profile" || cleanPath.startsWith("/profile/")) {
    return [{ kind: "current", labelKey: "navProfile" }]
  }

  if (TALENT_DETAIL_PATTERN.test(cleanPath)) {
    return [
      { kind: "link", labelKey: "navTalents", href: "/talents" },
      { kind: "dynamic" },
    ]
  }

  const nav = getDashboardNav(role)
  const match = nav.find(
    (item) => cleanPath === item.href || cleanPath.startsWith(`${item.href}/`)
  )

  if (match) {
    return [{ kind: "current", labelKey: match.titleKey }]
  }

  return [{ kind: "current", labelKey: "navDashboard" }]
}
