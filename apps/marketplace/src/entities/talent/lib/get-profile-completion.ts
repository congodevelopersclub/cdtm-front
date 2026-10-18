import type { TalentProfile } from "../model/types"

export type ProfileCompletionItem = {
  key: string
  labelKey: string
  percent: number
  href: string
  done: boolean
}

export type ProfileCompletion = {
  percent: number
  items: ProfileCompletionItem[]
}

function hasLocation(profile: TalentProfile) {
  return Boolean(profile.location.trim())
}

function hasRole(profile: TalentProfile) {
  const title = profile.title.trim()
  return Boolean(title) && title !== "—"
}

function hasTopSkills(profile: TalentProfile) {
  const count = Math.max(
    profile.skillDetails?.length ?? 0,
    profile.skills.length,
    profile.superpowerSkills.length
  )

  return count >= 3
}

export function getProfileCompletion(profile: TalentProfile): ProfileCompletion {
  const items: ProfileCompletionItem[] = [
    {
      key: "location",
      labelKey: "addLocation",
      percent: 25,
      href: "/profile",
      done: hasLocation(profile),
    },
    {
      key: "role",
      labelKey: "addRole",
      percent: 50,
      href: "/profile",
      done: hasRole(profile),
    },
    {
      key: "topSkills",
      labelKey: "addTopSkills",
      percent: 25,
      href: "/skills",
      done: hasTopSkills(profile),
    },
  ]

  const percent = items.reduce(
    (sum, item) => sum + (item.done ? item.percent : 0),
    0
  )

  return { percent, items }
}
