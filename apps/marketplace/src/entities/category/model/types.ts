export type ApiCategory = {
  id: number
  name: string
  slug: string
  description: string | null
  is_active: boolean
  sort_order: number
}

export type ApiCategoriesResponse = {
  current_page: number
  data: ApiCategory[]
  last_page: number
}

export type TalentCategoryOption = {
  id: number
  name: string
  slug: string
  sortOrder: number
}
