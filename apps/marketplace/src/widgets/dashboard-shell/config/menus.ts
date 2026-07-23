import {
  IconBook,
  IconBriefcase,
  IconCertificate,
  IconDashboard,
  IconFolder,
  IconSettings,
  IconUsers,
  IconBuildingStore,
  IconShield,
  IconChartBar,
} from "@tabler/icons-react"

import type { DashboardRole, NavItem } from "./types"

const TALENT_NAV: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: IconDashboard },
  { title: "Jobs", href: "/jobs", icon: IconBriefcase },
  { title: "Skills", href: "/skills", icon: IconCertificate },
  { title: "Projects", href: "/projects", icon: IconFolder },
  { title: "Talents", href: "/talents", icon: IconUsers },
  { title: "Learn", href: "/learn", icon: IconBook },
]

const AGENCY_NAV: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: IconDashboard },
  { title: "Jobs", href: "/jobs", icon: IconBriefcase },
  { title: "Talents", href: "/talents", icon: IconUsers },
  { title: "Projects", href: "/projects", icon: IconFolder },
  { title: "Analytics", href: "/analytics", icon: IconChartBar },
  { title: "Settings", href: "/settings", icon: IconSettings },
]

const ADMIN_NAV: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: IconDashboard },
  { title: "Agencies", href: "/agencies", icon: IconBuildingStore },
  { title: "Talents", href: "/talents", icon: IconUsers },
  { title: "Moderation", href: "/moderation", icon: IconShield },
  { title: "Reports", href: "/reports", icon: IconChartBar },
  { title: "Settings", href: "/settings", icon: IconSettings },
]

const DASHBOARD_MENUS: Record<DashboardRole, NavItem[]> = {
  talent: TALENT_NAV,
  agency: AGENCY_NAV,
  admin: ADMIN_NAV,
}

export function getDashboardNav(role: DashboardRole): NavItem[] {
  return DASHBOARD_MENUS[role]
}

export function getPageTitle(pathname: string, role: DashboardRole): string {
  const nav = getDashboardNav(role)
  const match = nav.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  )

  if (match) {
    return match.title
  }

  if (pathname === "/profile" || pathname.startsWith("/profile/")) {
    return "Profile"
  }

  return "Dashboard"
}

export const MOCK_TALENT_USER = {
  name: "Christian Siku",
  email: "chrissiku5@gmail.com",
  title: "Full Stack Developer",
  avatar:
    "https://media.licdn.com/dms/image/v2/D4D03AQFgArQdG55T_g/profile-displayphoto-shrink_400_400/B4DZTqL5NKHYAk-/0/1739095774596?e=1786579200&v=beta&t=I97Jrd7doGW-vxMWLU9g929nX0UpZt5b3MrdxWQJFQU",
}
