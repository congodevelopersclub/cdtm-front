import type { ApiProfile } from "../model/api-types"
import type { TalentProfile } from "../model/types"
import { inferTalentCategories } from "./infer-talent-categories"
import { toAbsoluteProjectLink } from "./to-absolute-project-link"

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
  const skillDetails = api.skills.map((skill) => ({
    id: String(skill.id),
    name: skill.name,
    slug: skill.slug,
    proficiency: skill.details.proficiency,
    yearsExperience: skill.details.years_experience,
  }))
  const skills = skillDetails.map((skill) => skill.name)

  return {
    id: String(api.id),
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
    skillDetails,
    projects: api.projects.map((project) => ({
      id: String(project.id),
      title: project.title,
      description: project.description,
      year: extractYear(project.created_at),
      link: toAbsoluteProjectLink(project.link ?? ""),
    })),
    accountStatus: api.account_status,
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
