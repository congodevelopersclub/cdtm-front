"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  createSkillAction,
  deleteSkillAction,
  getSkillAction,
  getSkillsAction,
  updateSkillAction,
} from "../actions/skills"

export function skillsQueryKey(page: number) {
  return ["skills", page] as const
}

export function skillQueryKey(id: number) {
  return ["skill", id] as const
}

export function useSkills(page: number) {
  return useQuery({
    queryKey: skillsQueryKey(page),
    queryFn: () => getSkillsAction(page),
  })
}

export function useSkill(id: number | null) {
  return useQuery({
    queryKey: skillQueryKey(id ?? 0),
    queryFn: () => getSkillAction(id!),
    enabled: id != null,
  })
}

function useInvalidateSkills() {
  const queryClient = useQueryClient()

  return () => {
    void queryClient.invalidateQueries({ queryKey: ["skills"] })
    void queryClient.invalidateQueries({ queryKey: ["skill"] })
  }
}

export function useCreateSkill() {
  const invalidate = useInvalidateSkills()

  return useMutation({
    mutationFn: (name: string) => createSkillAction(name),
    onSuccess: invalidate,
  })
}

export function useUpdateSkill() {
  const invalidate = useInvalidateSkills()

  return useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      updateSkillAction(id, name),
    onSuccess: invalidate,
  })
}

export function useDeleteSkill() {
  const invalidate = useInvalidateSkills()

  return useMutation({
    mutationFn: (id: number) => deleteSkillAction(id),
    onSuccess: invalidate,
  })
}
