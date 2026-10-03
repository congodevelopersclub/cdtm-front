export type DashboardNotification = {
  id: string
  title: string
  description: string
  href: string
  read: boolean
  createdAt: string
}

export const MOCK_NOTIFICATIONS: DashboardNotification[] = [
  {
    id: "1",
    title: "New job invite",
    description: "You were invited to apply for Senior Frontend Developer.",
    href: "/jobs",
    read: false,
    createdAt: "2026-07-23T10:00:00Z",
  },
  {
    id: "2",
    title: "Profile viewed",
    description: "A recruiter viewed your profile this week.",
    href: "/profile",
    read: false,
    createdAt: "2026-07-22T14:30:00Z",
  },
  {
    id: "3",
    title: "Skill endorsement",
    description: "Alex endorsed your React skill.",
    href: "/skills",
    read: true,
    createdAt: "2026-07-21T09:15:00Z",
  },
]
