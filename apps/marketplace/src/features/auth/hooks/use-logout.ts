"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

import { logoutAction } from "../actions/logout"

import { clearAuthStorage, notifyAuthSessionChanged } from "@/shared/auth"

export function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useCallback(async () => {
    await logoutAction()
    clearAuthStorage()
    queryClient.removeQueries({ queryKey: ["user"] })
    notifyAuthSessionChanged()
    router.replace("/auth")
    router.refresh()
  }, [queryClient, router])
}
