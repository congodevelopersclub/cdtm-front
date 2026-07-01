import { NextResponse, type NextRequest } from "next/server"

import {
  PROTECTED_ROUTE_PREFIXES,
  PUBLIC_ROUTES,
  TOKEN_COOKIE_NAME,
} from "./constants"
import { isTokenExpired } from "./session"

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )
}

function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTE_PREFIXES.some((route) => pathname.startsWith(route))
}

export function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value

  if (isProtectedRoute(pathname)) {
    if (!token || isTokenExpired(token)) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (pathname === "/login" && token && !isTokenExpired(token)) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (!isPublicRoute(pathname) && !isProtectedRoute(pathname)) {
    return NextResponse.next()
  }

  return NextResponse.next()
}
