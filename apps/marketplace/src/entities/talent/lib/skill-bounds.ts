export const SKILL_PROFICIENCY_MIN = 1
export const SKILL_PROFICIENCY_MAX = 5
export const SKILL_YEARS_MIN = 1
export const SKILL_YEARS_MAX = 100

export function clampSkillProficiency(value: number) {
  return Math.min(
    SKILL_PROFICIENCY_MAX,
    Math.max(SKILL_PROFICIENCY_MIN, Math.trunc(value))
  )
}

export function clampSkillYears(value: number) {
  return Math.min(SKILL_YEARS_MAX, Math.max(SKILL_YEARS_MIN, Math.trunc(value)))
}

export function isValidSkillProficiency(value: number) {
  return (
    Number.isInteger(value) &&
    value >= SKILL_PROFICIENCY_MIN &&
    value <= SKILL_PROFICIENCY_MAX
  )
}

export function isValidSkillYears(value: number) {
  return Number.isInteger(value) && value >= SKILL_YEARS_MIN && value <= SKILL_YEARS_MAX
}
