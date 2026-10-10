const ACCENT_CLASSES = [
  "bg-brand-mint/15 text-brand-mint",
  "bg-brand-orange/15 text-brand-orange",
  "bg-brand-steel-blue/15 text-brand-steel-blue",
  "bg-secondary text-secondary-foreground",
] as const

export function getHeadlineAccentClass(id: string) {
  let hash = 0

  for (const character of id) {
    hash = (hash + character.charCodeAt(0)) % ACCENT_CLASSES.length
  }

  return ACCENT_CLASSES[hash]!
}

export function getSkillOverflowLabel(overflowCount: number) {
  if (overflowCount <= 0) {
    return null
  }

  if (overflowCount > 9) {
    return "+9"
  }

  return `+${overflowCount}`
}

export function formatCategoryLabel(category: string) {
  if (category === "ai") {
    return "AI"
  }

  if (category === "hr") {
    return "HR"
  }

  return category.charAt(0).toUpperCase() + category.slice(1)
}
