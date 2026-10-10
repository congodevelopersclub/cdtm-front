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

function toSkill(skill: { id: string | number; name: string; slug: string }): Skill {
  return {
    id: String(skill.id),
    name: skill.name,
    slug: skill.slug,
  }
}

export async function getSkillsAction(page: number): Promise<SkillsResult> {
  const apiClient = createServerApiClient()
  const { data } = await apiClient.get<ApiSkillsResponse>("/skills", {
    params: { page },
  })

  return {
    skills: data.data.map(toSkill),
    pagination: {
      currentPage: data.meta.current_page,
      lastPage: data.meta.last_page,
      total: data.meta.total,
    },
  }
}

export async function getAllSkillsAction(): Promise<Skill[]> {
  const skills: Skill[] = []
  let page = 1
  let lastPage = 1

  do {
    const result = await getSkillsAction(page)
    skills.push(...result.skills)
    lastPage = result.pagination.lastPage
    page += 1
  } while (page <= lastPage)

  return skills.sort((left, right) => left.name.localeCompare(right.name))
}

export async function getSkillAction(id: string): Promise<Skill> {
  const apiClient = createServerApiClient()
  const { data } = await apiClient.get<ApiSkillResponse>(`/skills/${id}`)

  return toSkill(data.data)
}

export async function createSkillAction(name: string): Promise<Skill> {
  const apiClient = createServerApiClient()
  const { data } = await apiClient.post<ApiSkillResponse>("/skills", { name })

  return toSkill(data.data)
}

export async function updateSkillAction(id: string, name: string): Promise<Skill> {
  const apiClient = createServerApiClient()
  const { data } = await apiClient.put<ApiSkillResponse>(`/skills/${id}`, { name })

  return toSkill(data.data)
}

export async function deleteSkillAction(id: string): Promise<void> {
  const apiClient = createServerApiClient()
  await apiClient.delete(`/skills/${id}`)
}
