"use server"

import type { ApiCategoriesResponse, TalentCategoryOption } from "../model/types"

import { createServerApiClient } from "@/shared/api/server-client"

function toOption(category: ApiCategoriesResponse["data"][number]): TalentCategoryOption {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    sortOrder: category.sort_order,
  }
}

export async function getCategoriesAction(): Promise<TalentCategoryOption[]> {
  const apiClient = createServerApiClient()
  const categories: TalentCategoryOption[] = []
  let page = 1
  let lastPage = 1

  do {
    const { data } = await apiClient.get<ApiCategoriesResponse>("/categories", {
      params: { page },
    })
    lastPage = data.last_page

    for (const category of data.data) {
      if (category.is_active) {
        categories.push(toOption(category))
      }
    }

    page += 1
  } while (page <= lastPage)

  return categories.sort((left, right) => left.sortOrder - right.sortOrder || left.name.localeCompare(right.name))
}
