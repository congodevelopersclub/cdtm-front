"use client"

import { useQuery } from "@tanstack/react-query"

import { getProfilesAction } from "../actions/get-profiles"
import type { ProfilesQuery } from "../model/api-types"

export function profilesQueryKey(query: ProfilesQuery) {
  return [
    "profiles",
    query.page,
    query.location ?? "",
    query.category ?? "",
    query.skills ?? "",
  ] as const
}

export function useProfiles(query: ProfilesQuery) {
  return useQuery({
    queryKey: profilesQueryKey(query),
    queryFn: () => getProfilesAction(query),
  })
}
