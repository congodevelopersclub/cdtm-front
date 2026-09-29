"use server"

import { cookies } from "next/headers"

import { mapApiProfileToTalentProfile } from "../lib/map-api-profile"
import type { ApiProfileResponse } from "../model/api-types"
import type { TalentProfile } from "../model/types"

import { getUserAction } from "@/entities/user/actions/get-user"
import { createServerApiClient } from "@/shared/api/server-client"
import { TOKEN_COOKIE_NAME } from "@/shared/auth/constants"
import { getSessionFromToken } from "@/shared/auth/session"

export type UpdateProfileSkillInput = {
  name: string
  proficiency: number
  years_experience: number
}

export type UpdateProfileInput = {
  name: string
  headline: string
  bio: string
  location: string
  status: string
  skills: UpdateProfileSkillInput[]
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
  const { data } = await apiClient.put<ApiProfileResponse>(
    `/profiles/${id}`,
    {
      name: input.name,
      headline: input.headline,
      bio: input.bio,
      location: input.location,
      status: input.status,
      skills: input.skills,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return mapApiProfileToTalentProfile(data.data)
}
