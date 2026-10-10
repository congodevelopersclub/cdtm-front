export function normalizeQuery(query: string) {
  return query
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
}

export function tokenizeQuery(query: string) {
  const normalized = normalizeQuery(query)

  if (!normalized) {
    return []
  }

  return normalized.split(" ").filter(Boolean)
}
