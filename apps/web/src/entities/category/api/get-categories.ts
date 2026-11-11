import { getApiUrl } from "@/shared/config/env"

export type TalentCategoryOption = {
  id: number
  name: string
  slug: string
  sortOrder: number
}

type ApiCategory = {
  id: number
  name: string
  slug: string
  is_active: boolean
  sort_order: number
}

type ApiCategoriesResponse = {
  current_page: number
  data: ApiCategory[]
  last_page: number
}

export async function getPublicCategories(): Promise<TalentCategoryOption[]> {
  const categories: TalentCategoryOption[] = []
  let page = 1
  let lastPage = 1

  do {
    const response = await fetch(`${getApiUrl()}/categories?page=${page}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to load categories")
    }

    const data = (await response.json()) as ApiCategoriesResponse
    lastPage = data.last_page

    for (const category of data.data) {
      if (category.is_active) {
        categories.push({
          id: category.id,
          name: category.name,
          slug: category.slug,
          sortOrder: category.sort_order,
        })
      }
    }

    page += 1
  } while (page <= lastPage)

  return categories.sort(
    (left, right) => left.sortOrder - right.sortOrder || left.name.localeCompare(right.name)
  )
}
