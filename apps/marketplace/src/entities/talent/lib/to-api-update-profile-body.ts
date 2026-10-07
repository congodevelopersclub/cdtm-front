import type {
  UpdateProfileInput,
  UpdateProfileProjectInput,
  UpdateProfileSkillInput,
} from "../actions/update-profile"
import { toAbsoluteProjectLink } from "./to-absolute-project-link"

export type ApiUpdateProfileBody = Omit<
  UpdateProfileInput,
  "projects" | "status" | "account_status"
> & {
  status?: string
  account_status?: string
  projects: Array<Omit<UpdateProfileProjectInput, "id" | "link"> & {
    id: number | string | null
    link: string | null
  }>
}

function toApiProjectId(id: string | null) {
  if (id == null) {
    return null
  }

  const trimmed = id.trim()

  if (!trimmed) {
    return null
  }

  if (/^\d+$/.test(trimmed)) {
    return Number(trimmed)
  }

  return trimmed
}

function toApiProjectLink(link: string) {
  const absolute = toAbsoluteProjectLink(link)

  if (!absolute) {
    return null
  }

  try {
    const url = new URL(absolute)
    const isLocalApp =
      url.hostname === "localhost" || url.hostname === "127.0.0.1"
    const recovered = `${url.pathname}${url.search}${url.hash}`.replace(/^\/+/, "")

    if (isLocalApp && recovered.includes(".")) {
      return toAbsoluteProjectLink(recovered)
    }
  } catch {
    return null
  }

  return absolute
}

function toApiSkills(skills: UpdateProfileSkillInput[]) {
  return skills
    .map((skill) => ({
      name: skill.name.trim(),
      proficiency: Math.trunc(skill.proficiency),
      years_experience: Math.min(5, Math.max(0, Math.trunc(skill.years_experience))),
    }))
    .filter((skill) => skill.name)
}

export function toApiUpdateProfileBody(input: UpdateProfileInput): ApiUpdateProfileBody {
  const status = input.status.trim()
  const accountStatus = input.account_status.trim()

  return {
    name: input.name.trim(),
    email: input.email.trim(),
    bio: input.bio.trim(),
    headline: input.headline.trim(),
    location: input.location.trim(),
    ...(status ? { status } : {}),
    ...(accountStatus ? { account_status: accountStatus } : {}),
    skills: toApiSkills(input.skills),
    projects: input.projects.map((project) => ({
      id: toApiProjectId(project.id),
      title: project.title.trim(),
      description: project.description.trim(),
      link: toApiProjectLink(project.link),
    })),
  }
}
