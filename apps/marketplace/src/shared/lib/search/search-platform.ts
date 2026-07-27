import { normalizeQuery, tokenizeQuery } from "./normalize-query"
import type { ScoredSearchResult, SearchResult } from "./types"

const TYPE_ORDER: SearchResult["type"][] = [
  "page",
  "person",
  "job",
  "skill",
  "project",
  "course",
  "notification",
]

function scoreField(value: string | undefined, tokens: string[]) {
  if (!value) {
    return 0
  }

  const normalized = normalizeQuery(value)

  return tokens.reduce((score, token) => {
    if (normalized === token) {
      return score + 100
    }

    if (normalized.startsWith(token)) {
      return score + 60
    }

    if (normalized.includes(token)) {
      return score + 30
    }

    return score
  }, 0)
}

function scoreItem(item: SearchResult, tokens: string[]) {
  if (tokens.length === 0) {
    return 0
  }

  const titleScore = scoreField(item.title, tokens) * 3
  const keywordScore = item.keywords.reduce(
    (total, keyword) => total + scoreField(keyword, tokens) * 2,
    0,
  )
  const subtitleScore = scoreField(item.subtitle, tokens)

  return titleScore + keywordScore + subtitleScore
}

export function searchPlatform(query: string, index: SearchResult[]): ScoredSearchResult[] {
  const tokens = tokenizeQuery(query)

  if (tokens.length === 0) {
    return index
      .filter((item) => item.type === "page")
      .slice(0, 6)
      .map((item) => ({ ...item, score: 0 }))
  }

  return index
    .map((item) => ({
      ...item,
      score: scoreItem(item, tokens),
    }))
    .filter((item) => item.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score
      }

      const typeDiff =
        TYPE_ORDER.indexOf(left.type) - TYPE_ORDER.indexOf(right.type)

      if (typeDiff !== 0) {
        return typeDiff
      }

      return left.title.localeCompare(right.title)
    })
}
