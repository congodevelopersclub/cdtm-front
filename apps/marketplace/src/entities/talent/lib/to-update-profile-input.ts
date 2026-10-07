import type {
  UpdateProfileInput,
  UpdateProfileProjectInput,
  UpdateProfileSkillInput,
} from "../actions/update-profile"
import type { TalentProfile } from "../model/types"
import { toAbsoluteProjectLink } from "./to-absolute-project-link"

export function toUpdateProfileInput(profile: TalentProfile): UpdateProfileInput {
  const skills: UpdateProfileSkillInput[] =
    profile.skillDetails && profile.skillDetails.length > 0
      ? profile.skillDetails.map((skill) => ({
          name: skill.name,
          proficiency: skill.proficiency,
          years_experience: skill.yearsExperience,
        }))
      : profile.skills.map((name) => ({
          name,
          proficiency: 1,
          years_experience: 0,
        }))

  const projects: UpdateProfileProjectInput[] = profile.projects.map((project) => ({
    id: project.id ?? null,
    title: project.title,
    description: project.description,
    link: toAbsoluteProjectLink(project.link ?? ""),
  }))

  return {
    name: profile.name,
    email: profile.email,
    bio: profile.bio,
    headline: profile.title === "—" ? "" : profile.title,
    location: profile.location,
    status: profile.employmentStatus || "",
    account_status: profile.accountStatus ?? "",
    category_id: profile.categoryId ?? null,
    skills,
    projects,
  }
}
