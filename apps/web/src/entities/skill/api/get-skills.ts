import { getApiUrl } from "@/shared/config/env"

export type PublicSkillOption = {
  id: string
  name: string
}

type ApiSkill = {
  id: string | number
  name: string
  slug: string
}

type ApiSkillsResponse = {
  data: ApiSkill[]
  meta?: {
    last_page: number
  }
  last_page?: number
}

export async function getPublicSkills(): Promise<PublicSkillOption[]> {
  const skills: PublicSkillOption[] = []
  let page = 1
  let lastPage = 1

  do {
    const response = await fetch(`${getApiUrl()}/skills?page=${page}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to load skills")
    }

    const data = (await response.json()) as ApiSkillsResponse
    lastPage = data.meta?.last_page ?? data.last_page ?? page

    for (const skill of data.data) {
      skills.push({
        id: String(skill.id),
        name: skill.name,
      })
    }

    page += 1
  } while (page <= lastPage)

  return skills.sort((left, right) => left.name.localeCompare(right.name))
}
