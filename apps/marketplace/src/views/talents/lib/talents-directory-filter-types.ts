import type { TalentDirectoryCategory } from "./talent-directory-categories"

export type TalentsDirectoryFilters = {
  search: string
  category: TalentDirectoryCategory | null
  verified: boolean | null
}
