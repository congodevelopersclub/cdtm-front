import { TalentsPage } from "@/views/talents"
import { createPageMetadata } from "@/shared/lib/metadata"

type TalentsRouteProps = {
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata() {
  return createPageMetadata("talents")
}

export default async function Page({ searchParams }: TalentsRouteProps) {
  const { page: pageParam } = await searchParams
  const page = Number(pageParam ?? "1") || 1

  return <TalentsPage page={page > 0 ? page : 1} />
}
