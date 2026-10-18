"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  createSkillAction,
  deleteSkillAction,
  getAllSkillsAction,
  getSkillAction,
  getSkillsAction,
  updateSkillAction,
} from "../actions/skills"

export function skillsQueryKey(page: number) {
  return ["skills", page] as const
}

export function skillQueryKey(id: string) {
  return ["skill", id] as const
}

export function skillCatalogQueryKey() {
  return ["skills", "all"] as const
}

export function useSkills(page: number) {
  return useQuery({
    queryKey: skillsQueryKey(page),
    queryFn: () => getSkillsAction(page),
  })
}

export function useSkillCatalog() {
  return useQuery({
    queryKey: skillCatalogQueryKey(),
    queryFn: () => getAllSkillsAction(),
  })
}

export function useSkill(id: string | null) {
  return useQuery({
    queryKey: skillQueryKey(id ?? ""),
    queryFn: () => getSkillAction(id!),
    enabled: id != null && id !== "",
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
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateSkillAction(id, name),
    onSuccess: invalidate,
  })
}

export function useDeleteSkill() {
  const invalidate = useInvalidateSkills()

  return useMutation({
    mutationFn: (id: string) => deleteSkillAction(id),
    onSuccess: invalidate,
  })
}
