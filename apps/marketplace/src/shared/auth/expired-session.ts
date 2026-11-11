export const UNAUTHENTICATED_MESSAGE = "Unauthenticated."
export const UNAUTHENTICATED_DIGEST = "UNAUTHENTICATED"

export class UnauthenticatedError extends Error {
  readonly digest = UNAUTHENTICATED_DIGEST

  constructor() {
    super(UNAUTHENTICATED_MESSAGE)
    this.name = "UnauthenticatedError"
  }
}

type ExpiredSessionInput = {
  message?: string
  url?: string
  hadAuthorization: boolean
  pathname: string
}

export type ExpiredSessionPlan = "ignore" | "signal" | "logout"

export function pathnameFromRequestHeaders(headerStore: { get(name: string): string | null }) {
  const nextUrl = headerStore.get("next-url")

  if (nextUrl) {
    return nextUrl.split("?")[0] ?? ""
  }

  const referer = headerStore.get("referer")

  if (!referer) {
    return ""
  }

  try {
    return new URL(referer).pathname
  } catch {
    return ""
  }
}

function isAuthPath(pathname: string) {
  return pathname === "/auth" || pathname.startsWith("/auth/")
}

export function expiredSessionPlan(input: ExpiredSessionInput): ExpiredSessionPlan {
  if (input.message !== UNAUTHENTICATED_MESSAGE) {
    return "ignore"
  }

  if (input.url?.includes("/auth/exchange-code")) {
    return "ignore"
  }

  if (input.hadAuthorization && !isAuthPath(input.pathname)) {
    return "logout"
  }

  return "signal"
}

function isExternalRedirectDigest(digest: string) {
  if (!digest.startsWith("NEXT_REDIRECT")) {
    return false
  }

  const destination = digest.split(";").slice(2, -2).join(";")
  return destination.startsWith("http://") || destination.startsWith("https://")
}

export function isExternalSessionRedirect(error: unknown) {
  if (typeof error !== "object" || error === null || !("digest" in error)) {
    return false
  }

  return typeof error.digest === "string" && isExternalRedirectDigest(error.digest)
}

export function isUnauthenticatedClientError(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return false
  }

  if ("digest" in error && error.digest === UNAUTHENTICATED_DIGEST) {
    return true
  }

  if (isExternalSessionRedirect(error)) {
    return true
  }

  return "message" in error && error.message === UNAUTHENTICATED_MESSAGE
}
