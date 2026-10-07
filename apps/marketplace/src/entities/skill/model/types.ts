export type Skill = {
  id: string
  name: string
  slug: string
}

export type SkillsPagination = {
  currentPage: number
  lastPage: number
  total: number
}

export type SkillsResult = {
  skills: Skill[]
  pagination: SkillsPagination
}

export type ApiSkillResponse = {
  data: Skill
}

export type ApiSkillsResponse = {
  data: Skill[]
  meta: {
    current_page: number
    last_page: number
    total: number
  }
}
