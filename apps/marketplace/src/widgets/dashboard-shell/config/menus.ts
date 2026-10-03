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
  { titleKey: "navDashboard", href: "/dashboard", icon: IconDashboard },
  { titleKey: "navTalents", href: "/talents", icon: IconUsers },
  { titleKey: "navJobs", href: "/jobs", icon: IconBriefcase },
  { titleKey: "navProjects", href: "/projects", icon: IconFolder },
  { titleKey: "navLearn", href: "/learn", icon: IconBook },
  { titleKey: "navSkills", href: "/skills", icon: IconCertificate },
]

const AGENCY_NAV: NavItem[] = [
  { titleKey: "navDashboard", href: "/dashboard", icon: IconDashboard },
  { titleKey: "navJobs", href: "/jobs", icon: IconBriefcase },
  { titleKey: "navTalents", href: "/talents", icon: IconUsers },
  { titleKey: "navProjects", href: "/projects", icon: IconFolder },
  { titleKey: "navAnalytics", href: "/analytics", icon: IconChartBar },
  { titleKey: "navSettings", href: "/settings", icon: IconSettings },
]

const ADMIN_NAV: NavItem[] = [
  { titleKey: "navDashboard", href: "/dashboard", icon: IconDashboard },
  { titleKey: "navAgencies", href: "/agencies", icon: IconBuildingStore },
  { titleKey: "navTalents", href: "/talents", icon: IconUsers },
  { titleKey: "navModeration", href: "/moderation", icon: IconShield },
  { titleKey: "navReports", href: "/reports", icon: IconChartBar },
  { titleKey: "navSettings", href: "/settings", icon: IconSettings },
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
    return match.titleKey
  }

  if (pathname === "/profile" || pathname.startsWith("/profile/")) {
    return "navProfile"
  }

  if (pathname.startsWith("/talents/")) {
    return "navTalents"
  }

  return "navDashboard"
}

export const MOCK_TALENT_USER = {
  name: "Christian Siku",
  email: "chrissiku5@gmail.com",
  title: "Full Stack Developer",
  avatar:
    "https://media.licdn.com/dms/image/v2/D4D03AQFgArQdG55T_g/profile-displayphoto-shrink_400_400/B4DZTqL5NKHYAk-/0/1739095774596?e=1786579200&v=beta&t=I97Jrd7doGW-vxMWLU9g929nX0UpZt5b3MrdxWQJFQU",
}
