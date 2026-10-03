export const TOKEN_COOKIE_NAME = "access_token"

export const PUBLIC_ROUTES = ["/auth"] as const

export const PROTECTED_ROUTE_PREFIXES = [
  "/dashboard",
  "/listings",
  "/checkout",
  "/settings",
] as const
