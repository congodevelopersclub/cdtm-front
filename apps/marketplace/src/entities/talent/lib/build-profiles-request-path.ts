import type { ProfilesQuery } from "../model/api-types"

export function buildProfilesRequestPath(query: ProfilesQuery) {
  const params = new URLSearchParams()
  params.set("page", String(query.page))

  if (query.location) {
    params.set("location", query.location)
  }

  if (query.category) {
    params.set("category", query.category)
  }

  if (query.skills) {
    params.set("skills", query.skills)
  }

  return `/profiles/search?${params.toString()}`
}
