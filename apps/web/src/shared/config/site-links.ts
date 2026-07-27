export const JOIN_URL = "https://dev.congodevelopers.club/"

export const NAV_PATHS = [
  { key: "home", path: "/" },
  { key: "activities", path: "/activities" },
  { key: "contact", path: "/contact" },
] as const

export const SOCIAL_LINKS = [
  {
    href: "https://github.com/congodevelopersclub",
    label: "GitHub",
  },
  {
    href: "https://x.com/congodevelopersclub",
    label: "X",
  },
  {
    href: "https://www.linkedin.com/company/congo-developers-club",
    label: "LinkedIn",
  },
  {
    href: "mailto:contact@congodevelopersclub.org",
    label: "Email",
  },
] as const

export const LEGAL_LINKS = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
  { key: "cookies", href: "/cookies" },
] as const
