export type PublicTalentProject = {
  title: string
  description: string
  year: string
}

export type PublicTalent = {
  id: string
  name: string
  title: string
  location: string
  avatar?: string
  verified: boolean
  bio: string
  skills: string[]
  superpowerSkills: string[]
  experienceYears: number
  categories: string[]
  projects: PublicTalentProject[]
}

export type PublicTalentsPage = {
  profiles: PublicTalent[]
  pagination: {
    currentPage: number
    lastPage: number
    total: number
    from: number
    to: number
  }
}
