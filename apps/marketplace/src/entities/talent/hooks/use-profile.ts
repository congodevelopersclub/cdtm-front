"use client"

import { useQuery } from "@tanstack/react-query"

import { getProfileAction } from "../actions/get-profile"

export function profileQueryKey(id: string) {
  return ["profile", id] as const
}

export function useProfile(id: string) {
  return useQuery({
    queryKey: profileQueryKey(id),
    queryFn: () => getProfileAction(id),
    enabled: Boolean(id),
  })
}
