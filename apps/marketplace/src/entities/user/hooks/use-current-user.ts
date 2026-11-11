"use client"

import { useQuery } from "@tanstack/react-query"

import { getUserAction } from "../actions/get-user"

import { setUserSession } from "@/shared/auth/user-session"

export function userQueryKey(userId: string | null) {
  return ["user", userId] as const
}

export function useCurrentUser(userId: string | null) {
  return useQuery({
    queryKey: userQueryKey(userId),
    queryFn: async () => {
      const user = await getUserAction(userId!)

      setUserSession(user)

      return user
    },
    enabled: Boolean(userId),
  })
}
