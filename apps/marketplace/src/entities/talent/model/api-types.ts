import type { TalentProfile } from "./types"

export type ApiAccountStatus = "PENDING_VALIDATION" | "VALIDATED" | "REJECTED"

export type ApiSkill = {
  id: string
  name: string
  slug: string
  details: {
    proficiency: number
    years_experience: number
  }
}

export type ApiProject = {
  id: string
  title: string
  description: string
  link: string
  profile_id: string
  created_at: string
  updated_at: string
}

export type ApiProfile = {
  id: string
  user_id: string
  email: string
  name: string
  headline: string | null
  bio: string | null
  avatar_url: string | null
  location: string | null
  status: string | null
  account_status: ApiAccountStatus
  created_at: string
  updated_at: string
  skills: ApiSkill[]
  projects: ApiProject[]
}

export type ApiProfileResponse = {
  data: ApiProfile
}

export type ApiProfilesPaginatedResponse = {
  current_page: number
  data: ApiProfile[]
  first_page_url: string
  from: number | null
  last_page: number
  last_page_url: string
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number | null
  total: number
}

export type ProfilesPagination = {
  currentPage: number
  lastPage: number
  perPage: number
  total: number
  from: number
  to: number
}

export type ProfilesResult = {
  profiles: TalentProfile[]
  pagination: ProfilesPagination
}
