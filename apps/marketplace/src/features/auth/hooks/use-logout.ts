"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"

import { logoutAction } from "../actions/logout"

import { clearAuthStorage, notifyAuthSessionChanged } from "@/shared/auth"

export function useLogout() {
  const queryClient = useQueryClient()

  return useCallback(async () => {
    const redirectUrl = await logoutAction()
    clearAuthStorage()
    queryClient.removeQueries({ queryKey: ["user"] })
    notifyAuthSessionChanged()
    window.location.assign(redirectUrl)
  }, [queryClient])
}
