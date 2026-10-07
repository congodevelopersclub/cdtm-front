import { TalentsPage } from "@/views/talents"
import { parseTalentDirectoryFilters } from "@/views/talents/lib/talent-directory-filters"
import { createPageMetadata } from "@/shared/lib/metadata"

type TalentsRouteProps = {
  searchParams: Promise<{
    page?: string
    name?: string
    location?: string
    category?: string
    skills?: string
  }>
}

export async function generateMetadata() {
  return createPageMetadata("talents")
}

export default async function Page({ searchParams }: TalentsRouteProps) {
  const params = await searchParams
  const page = Number(params.page ?? "1") || 1

  return (
    <TalentsPage
      page={page > 0 ? page : 1}
      filters={parseTalentDirectoryFilters(params)}
    />
  )
}
