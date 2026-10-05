export const JOIN_URL = "https://dev.congodevelopers.club/"

export const NAV_PATHS = [
  { key: "home", path: "/" },
  { key: "talents", path: "/talents" },
  { key: "contact", path: "/contact" },
] as const

export const FOOTER_NAV_PATHS = NAV_PATHS.filter(
  ({ key }) => key !== "activities"
)

export const SOCIAL_LINKS = [
  {
    href: "https://github.com/congodevelopersclub",
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/company/congo-developers-club",
    label: "LinkedIn",
  },
  {
    href: "mailto:hello@congodevelopers.club",
    label: "Email",
  },
] as const

export const LEGAL_LINKS = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
  { key: "cookies", href: "/cookies" },
] as const
