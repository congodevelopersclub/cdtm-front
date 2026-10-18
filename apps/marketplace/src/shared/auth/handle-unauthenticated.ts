"use client"

import { logoutAction } from "@/features/auth/actions/logout"

import { clearAuthStorage } from "./clear-auth-storage"
import { clearBrowserCookies } from "./clear-browser-cookies"
import { isExternalSessionRedirect, isUnauthenticatedClientError } from "./expired-session"
import { notifyAuthSessionChanged } from "./session-events"

let handling = false

function isAuthPage() {
  return window.location.pathname === "/auth" || window.location.pathname.startsWith("/auth/")
}

export async function handleUnauthenticatedError(error: unknown) {
  if (typeof window === "undefined" || !isUnauthenticatedClientError(error)) {
    return
  }

  clearAuthStorage()
  clearBrowserCookies()
  notifyAuthSessionChanged()

  if (isExternalSessionRedirect(error) || isAuthPage() || handling) {
    return
  }

  handling = true
  const redirectUrl = await logoutAction()
  window.location.assign(redirectUrl)
}
