export const TALENT_DIRECTORY_CATEGORIES = [
  "fullstack",
  "frontend",
  "backend",
  "mobile",
  "devops",
  "data",
  "ai",
  "security",
  "design",
  "product",
  "marketing",
  "sales",
  "hr",
  "legal",
  "finance",
] as const

export type TalentDirectoryCategory =
  (typeof TALENT_DIRECTORY_CATEGORIES)[number]

export function isTalentDirectoryCategory(
  value: string
): value is TalentDirectoryCategory {
  return (TALENT_DIRECTORY_CATEGORIES as readonly string[]).includes(value)
}

export function formatTalentDirectoryCategory(category: string) {
  if (category === "ai") {
    return "AI"
  }

  if (category === "hr") {
    return "HR"
  }

  return category.charAt(0).toUpperCase() + category.slice(1)
}
