"use server"

import { cookies } from "next/headers"

import { mapApiProfileToTalentProfile } from "../lib/map-api-profile"
import { toApiUpdateProfileBody } from "../lib/to-api-update-profile-body"
import type { ApiProfileResponse } from "../model/api-types"
import type { TalentProfile } from "../model/types"

import { isApiError } from "@workspace/api"

import { ensureSkillAction } from "@/entities/skill/actions/skills"
import { getUserAction } from "@/entities/user/actions/get-user"
import { createServerApiClient } from "@/shared/api/server-client"
import { TOKEN_COOKIE_NAME } from "@/shared/auth/constants"
import { getSessionFromToken } from "@/shared/auth/session"

export type UpdateProfileSkillInput = {
  name: string
  proficiency: number
  years_experience: number
}

export type UpdateProfileProjectInput = {
  id: string | null
  title: string
  description: string
  link: string
}

export type UpdateProfileInput = {
  name: string
  email: string
  bio: string
  headline: string
  location: string
  status: string
  account_status: string
  category_id: number | null
  skills: UpdateProfileSkillInput[]
  projects: UpdateProfileProjectInput[]
}

function isUnknownSkillError(error: unknown) {
  if (!isApiError(error) || error.status !== 422) {
    return false
  }

  const details = error.details as { errors?: Record<string, string | string[]> } | undefined

  return Object.entries(details?.errors ?? {}).some(([field, messages]) => {
    if (!field.startsWith("skills")) {
      return false
    }

    const list = Array.isArray(messages) ? messages : [messages]

    return list.some((message) => /invalid|exist/i.test(message))
  })
}

export async function updateProfileAction(
  id: string,
  input: UpdateProfileInput,
  userId?: string
): Promise<TalentProfile> {
  const cookieStore = await cookies()
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value

  if (!token) {
    throw new Error("Unauthorized")
  }

  const session = getSessionFromToken(token)
  const resolvedUserId = session?.userId || userId

  if (!resolvedUserId) {
    throw new Error("Unauthorized")
  }

  if (session?.userId && userId && session.userId !== userId) {
    throw new Error("Unauthorized")
  }

  const user = await getUserAction(resolvedUserId, token)

  if (!user.profile?.id || String(user.profile.id) !== String(id)) {
    throw new Error("You can only update your own profile")
  }

  const apiClient = createServerApiClient(token)
  const body = toApiUpdateProfileBody(input)

  async function patchProfile() {
    const { data } = await apiClient.patch<ApiProfileResponse>(`/profiles/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return mapApiProfileToTalentProfile(data.data)
  }

  try {
    return await patchProfile()
  } catch (error) {
    if (!isUnknownSkillError(error)) {
      throw error
    }

    await Promise.all(body.skills.map((skill) => ensureSkillAction(skill.name)))
    return patchProfile()
  }
}
