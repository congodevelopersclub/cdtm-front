export type TalentDirectoryFilters = {
  name: string
  location: string
  category: string | null
  skills: string[]
}

type TalentDirectorySearchInput = {
  name?: string
  location?: string
  category?: string
  skills?: string
}

export function parseSkillList(value: string | undefined) {
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

export function parseTalentDirectoryFilters(
  input: TalentDirectorySearchInput
): TalentDirectoryFilters {
  return {
    name: input.name?.trim() ?? "",
    location: input.location?.trim() ?? "",
    category: input.category?.trim() || null,
    skills: parseSkillList(input.skills),
  }
}

export function filterProfilesByName<T extends { name: string }>(profiles: T[], query: string) {
  const needle = query.trim().toLowerCase()

  if (!needle) {
    return profiles
  }

  return profiles.filter((profile) => profile.name.toLowerCase().includes(needle))
}

export function hasActiveTalentDirectoryFilters(filters: TalentDirectoryFilters) {
  return (
    filters.name.trim().length > 0 ||
    filters.location.trim().length > 0 ||
    filters.category != null ||
    filters.skills.length > 0
  )
}

export function buildTalentDirectorySearchParams(filters: TalentDirectoryFilters, page = 1) {
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

export function talentDirectoryHref(filters: TalentDirectoryFilters, page = 1) {
  const query = buildTalentDirectorySearchParams(filters, page).toString()

  return query ? `/talents?${query}` : "/talents"
}
