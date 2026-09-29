"use server"

import type { ApiSkillResponse, ApiSkillsResponse, Skill, SkillsResult } from "../model/types"

import { createServerApiClient } from "@/shared/api/server-client"

export async function getSkillsAction(page: number): Promise<SkillsResult> {
  const apiClient = createServerApiClient()
  const { data } = await apiClient.get<ApiSkillsResponse>("/skills", {
    params: { page },
  })

  return {
    skills: data.data,
    pagination: {
      currentPage: data.meta.current_page,
      lastPage: data.meta.last_page,
      total: data.meta.total,
    },
  }
}

export async function getSkillAction(id: number): Promise<Skill> {
  const apiClient = createServerApiClient()
  const { data } = await apiClient.get<ApiSkillResponse>(`/skills/${id}`)

  return data.data
}

export async function createSkillAction(name: string): Promise<Skill> {
  const apiClient = createServerApiClient()
  const { data } = await apiClient.post<ApiSkillResponse>("/skills", { name })

  return data.data
}

export async function updateSkillAction(id: number, name: string): Promise<Skill> {
  const apiClient = createServerApiClient()
  const { data } = await apiClient.put<ApiSkillResponse>(`/skills/${id}`, { name })

  return data.data
}

export async function deleteSkillAction(id: number): Promise<void> {
  const apiClient = createServerApiClient()
  await apiClient.delete(`/skills/${id}`)
}
