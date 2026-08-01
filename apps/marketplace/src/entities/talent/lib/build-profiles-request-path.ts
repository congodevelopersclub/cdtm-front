import type { ProfilesQuery } from "../model/api-types"

export function buildProfilesRequestPath(query: ProfilesQuery) {
  const params = new URLSearchParams()
  params.set("page", String(query.page))

  if (query.search) {
    params.set("search", query.search)
  }

  if (query.category) {
    params.set("category", query.category)
  }

  if (query.verified != null) {
    params.set("verified", query.verified ? "1" : "0")
  }

  return `/profiles?${params.toString()}`
}
