import type { TalentCategory } from "./talent-category"

export type TalentProfileStatus =
  | "looking_for_work"
  | "open_to_opportunities"
  | "not_looking"

export type ProfileSkill = {
  id: string
  name: string
  slug: string
  proficiency: number
  yearsExperience: number
}

export type TalentProject = {
  id?: string
  title: string
  description: string
  year: string
  link?: string
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
  skillDetails?: ProfileSkill[]
  projects: TalentProject[]
  accountStatus?: string
  experience: TalentExperience[]
  socialLinks: TalentSocialLinks
  employmentStatus?: string | null
  showAvailabilityBadge?: boolean
  categories?: TalentCategory[]
}
