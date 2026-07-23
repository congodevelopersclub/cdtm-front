export type TalentProfileStatus =
  | "looking_for_work"
  | "open_to_opportunities"
  | "not_looking"

export type TalentProject = {
  title: string
  description: string
  year: string
}

export type TalentExperience = {
  role: string
  company: string
  period: string
  description: string
}

export type TalentSocialLinks = {
  website?: string
  twitter?: string
  linkedin?: string
  github?: string
}

export type TalentProfile = {
  id: string
  name: string
  email: string
  avatar?: string
  title: string
  location: string
  experienceYears: number
  status: TalentProfileStatus
  verified: boolean
  bio: string
  superpowerSkills: string[]
  skills: string[]
  projects: TalentProject[]
  experience: TalentExperience[]
  socialLinks: TalentSocialLinks
}
