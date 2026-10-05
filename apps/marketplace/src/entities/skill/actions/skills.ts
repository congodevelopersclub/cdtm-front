"use server"

import { isApiError } from "@workspace/api"

import type { ApiSkillResponse, ApiSkillsResponse, Skill, SkillsResult } from "../model/types"

import { createServerApiClient } from "@/shared/api/server-client"

function isDuplicateSkillError(error: unknown) {
  if (!isApiError(error)) {
    return false
  }

  const details = error.details as { errors?: Record<string, string | string[]> } | undefined
  const nameErrors = details?.errors?.name
  const messages = [
    error.message,
    ...(Array.isArray(nameErrors) ? nameErrors : nameErrors ? [nameErrors] : []),
  ]

  return messages.some((message) => /already been taken|unique/i.test(message))
}

export async function ensureSkillAction(name: string): Promise<void> {
  const apiClient = createServerApiClient()

  try {
    await apiClient.post("/skills", { name: name.trim() })
  } catch (error) {
    if (isDuplicateSkillError(error)) {
      return
    }

    throw error
  }
}

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
