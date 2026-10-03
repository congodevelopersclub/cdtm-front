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

export function getProfileCompletion(profile: TalentProfile): ProfileCompletion {
  const items: ProfileCompletionItem[] = [
    {
      key: "location",
      labelKey: "addLocation",
      percent: 15,
      href: "/profile",
      done: Boolean(profile.location),
    },
    {
      key: "role",
      labelKey: "addRole",
      percent: 30,
      href: "/profile",
      done: Boolean(profile.title),
    },
    {
      key: "skills",
      labelKey: "addSkills",
      percent: 15,
      href: "/profile",
      done: profile.skills.length >= 5,
    },
    {
      key: "topSkills",
      labelKey: "addTopSkills",
      percent: 15,
      href: "/profile",
      done: profile.superpowerSkills.length >= 3,
    },
    {
      key: "experience",
      labelKey: "addExperience",
      percent: 15,
      href: "/profile",
      done: profile.experience.length >= 1,
    },
  ]

  const percent = items.reduce(
    (sum, item) => sum + (item.done ? item.percent : 0),
    0
  )

  return { percent, items }
}
