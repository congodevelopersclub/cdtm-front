"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateProfileAction, type UpdateProfileInput } from "../actions/update-profile"
import { profileQueryKey } from "./use-profile"

export function useUpdateProfile(id: string, userId?: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateProfileInput) => updateProfileAction(id, input, userId),
    onSuccess: (profile) => {
      queryClient.setQueryData(profileQueryKey(id), profile)
    },
  })
}
