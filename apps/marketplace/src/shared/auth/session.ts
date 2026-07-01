type JwtPayload = {
  sub?: string
  email?: string
  exp?: number
  iat?: number
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const payload = token.split(".")[1]

    if (!payload) {
      return null
    }

    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    return JSON.parse(decoded) as JwtPayload
  } catch {
    return null
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJwt(token)

  if (!payload?.exp) {
    return true
  }

  return payload.exp * 1000 <= Date.now()
}

export function getSessionFromToken(token: string) {
  const payload = decodeJwt(token)

  if (!payload || isTokenExpired(token)) {
    return null
  }

  return {
    userId: payload.sub ?? "",
    email: payload.email ?? "",
  }
}
