import { inferTalentCategories } from "./infer-talent-categories"
import type { ApiProfile } from "../model/api-types"
import type { PublicTalent } from "../model/types"

function extractYear(isoDate: string) {
  return isoDate.slice(0, 4)
}

function getSuperpowerSkills(skills: ApiProfile["skills"]) {
  return [...skills]
    .sort((left, right) => right.details.proficiency - left.details.proficiency)
    .slice(0, 3)
    .map((skill) => skill.name)
}

function getExperienceYears(skills: ApiProfile["skills"]) {
  if (skills.length === 0) {
    return 0
  }

  return Math.max(...skills.map((skill) => skill.details.years_experience))
}

export function mapApiProfileToPublicTalent(api: ApiProfile): PublicTalent {
  const apiSkills = api.skills ?? []
  const skills = apiSkills.map((skill) => skill.name)
  const title = api.headline?.trim() || ""
  const bio = api.bio?.trim() || ""

  return {
    id: String(api.id),
    name: api.name,
    title,
    location: api.location?.trim() || "",
    avatar: api.avatar_url ?? undefined,
    verified: api.account_status === "VALIDATED",
    bio,
    skills,
    superpowerSkills: getSuperpowerSkills(apiSkills),
    experienceYears: getExperienceYears(apiSkills),
    categories: inferTalentCategories({ title, bio, skills }),
    projects: (api.projects ?? []).map((project) => ({
      title: project.title,
      description: project.description,
      year: extractYear(project.created_at),
    })),
  }
}
