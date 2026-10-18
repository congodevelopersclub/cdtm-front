"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"

import { logoutAction } from "../actions/logout"

import { clearAuthStorage, notifyAuthSessionChanged } from "@/shared/auth"
import { clearBrowserCookies } from "@/shared/auth/clear-browser-cookies"

export function useLogout() {
  const queryClient = useQueryClient()

  return useCallback(async () => {
    const redirectUrl = await logoutAction()
    clearAuthStorage()
    clearBrowserCookies()
    queryClient.removeQueries({ queryKey: ["user"] })
    notifyAuthSessionChanged()
    window.location.assign(redirectUrl)
  }, [queryClient])
}
