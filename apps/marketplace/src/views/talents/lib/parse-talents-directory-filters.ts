import type { TalentsDirectoryFilters } from "./talents-directory-filter-types"

export function parseSkillList(value: string | null | undefined) {
  const skills: string[] = []
  const seen = new Set<string>()

  for (const part of (value ?? "").split(",")) {
    const name = part.trim()
    const key = name.toLowerCase()

    if (!name || seen.has(key)) {
      continue
    }

    seen.add(key)
    skills.push(name)
  }

  return skills
}

export function parseTalentsDirectoryFilters(
  searchParams: URLSearchParams
): TalentsDirectoryFilters {
  return {
    name: searchParams.get("name")?.trim() ?? "",
    location: searchParams.get("location")?.trim() ?? "",
    category: searchParams.get("category")?.trim() || null,
    skills: parseSkillList(searchParams.get("skills")),
  }
}

export function toProfilesQuery(filters: TalentsDirectoryFilters, page: number) {
  return {
    page,
    location: filters.location.trim() || undefined,
    category: filters.category ?? undefined,
    skills: filters.skills.length > 0 ? filters.skills.join(",") : undefined,
  }
}

export function buildTalentsDirectorySearchParams(
  filters: TalentsDirectoryFilters,
  page = 1
) {
  const params = new URLSearchParams()

  if (page > 1) {
    params.set("page", String(page))
  }

  if (filters.name.trim()) {
    params.set("name", filters.name.trim())
  }

  if (filters.location.trim()) {
    params.set("location", filters.location.trim())
  }

  if (filters.category) {
    params.set("category", filters.category)
  }

  if (filters.skills.length > 0) {
    params.set("skills", filters.skills.join(","))
  }

  return params
}
