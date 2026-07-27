"use client"

import { useQuery } from "@tanstack/react-query"

import { getProfilesAction } from "../actions/get-profiles"

export function profilesQueryKey(page: number) {
  return ["profiles", page] as const
}

export function useProfiles(page: number) {
  return useQuery({
    queryKey: profilesQueryKey(page),
    queryFn: () => getProfilesAction(page),
  })
}
