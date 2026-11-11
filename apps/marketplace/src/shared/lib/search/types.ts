export type SearchResultType =
  | "page"
  | "person"
  | "job"
  | "skill"
  | "project"
  | "course"
  | "notification"

export type SearchResult = {
  id: string
  type: SearchResultType
  title: string
  subtitle?: string
  href: string
  keywords: string[]
}

export type ScoredSearchResult = SearchResult & {
  score: number
}
