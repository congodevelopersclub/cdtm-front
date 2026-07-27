import type { ApiProfile } from "../model/api-types"
import type { TalentProfile } from "../model/types"
import { inferTalentCategories } from "./infer-talent-categories"

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

export function mapApiProfileToTalentProfile(api: ApiProfile): TalentProfile {
  const skills = api.skills.map((skill) => skill.name)

  return {
    id: api.id,
    name: api.name,
    email: api.email,
    avatar: api.avatar_url ?? undefined,
    title: api.headline?.trim() || "—",
    location: api.location?.trim() || "",
    experienceYears: getExperienceYears(api.skills),
    status: "open_to_opportunities",
    verified: api.account_status === "VALIDATED",
    bio: api.bio?.trim() || "",
    superpowerSkills: getSuperpowerSkills(api.skills),
    skills,
    projects: api.projects.map((project) => ({
      title: project.title,
      description: project.description,
      year: extractYear(project.created_at),
    })),
    experience: [],
    socialLinks: {},
    employmentStatus: api.status,
    showAvailabilityBadge: false,
    categories: inferTalentCategories({
      title: api.headline?.trim() || "",
      bio: api.bio?.trim() || "",
      skills,
    }),
  }
}
