export const TALENT_CATEGORIES = [
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

export type TalentCategory = (typeof TALENT_CATEGORIES)[number]

export function formatTalentCategory(category: TalentCategory) {
  if (category === "ai") {
    return "AI"
  }

  if (category === "hr") {
    return "HR"
  }

  return category.charAt(0).toUpperCase() + category.slice(1)
}
