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
  id: string | number
  user_id: string
  email: string
  name: string
  headline: string | null
  bio: string | null
  avatar_url: string | null
  location: string | null
  status: string | null
  account_status: string
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
  from: number | null
  last_page: number
  to: number | null
  total: number
}
