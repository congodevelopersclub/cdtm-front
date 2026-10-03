import type { Icon } from "@tabler/icons-react"

export type DashboardRole = "talent" | "agency" | "admin"

export type DashboardUser = {
  name: string
  email: string
  avatar?: string
  title?: string
}

export type NavItem = {
  titleKey: string
  href: string
  icon: Icon
}
