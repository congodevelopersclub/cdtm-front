const SKILL_ACCENT_CLASSES = [
  "bg-brand-mint/15 text-brand-mint",
  "bg-brand-orange/15 text-brand-orange",
  "bg-brand-steel-blue/15 text-brand-steel-blue",
  "bg-secondary text-secondary-foreground",
  "bg-primary/10 text-primary",
] as const

export function getSkillAccentClass(skill: string) {
  let hash = 0

  for (const character of skill) {
    hash = (hash + character.charCodeAt(0)) % SKILL_ACCENT_CLASSES.length
  }

  return SKILL_ACCENT_CLASSES[hash]!
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
