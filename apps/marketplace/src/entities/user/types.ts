import type { ApiResponse } from "@workspace/api"

export type UserProfile = {
  id: string
  user_id: string
  email: string
  name: string
  headline?: string | null
  bio?: string | null
  avatar_url?: string | null
  location?: string | null
  status?: string | null
  account_status?: string | null
  created_at?: string
  updated_at?: string
}

export type AuthUser = {
  id: string
  name: string
  email: string
  avatar_url?: string | null
  linkedin_id?: string | null
  email_verified_at?: string | null
  email_verified?: number
  role?: string
  created_at?: string
  updated_at?: string
  profile?: UserProfile | null
}

export type ExchangeCodeResponse = {
  token: string
  user: AuthUser
}

export type GetUserResponse = ApiResponse<AuthUser>

/** @deprecated Use AuthUser */
export type User = {
  id: string
  email: string
  name?: string
}
