import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { TalentDetailPage } from "@/views/talents"
import { getPublicProfile } from "@/entities/talent"
import { createPageMetadata } from "@/shared/lib/metadata"

type TalentDetailRouteProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: TalentDetailRouteProps): Promise<Metadata> {
  const { id } = await params
  const t = await getTranslations("Metadata")

  try {
    const profile = await getPublicProfile(id)

    if (!profile) {
      return createPageMetadata("talentNotFound")
    }

    return {
      title: profile.name,
      description: t("talentProfile.description", {
        name: profile.name,
        role: profile.title || profile.name,
      }),
    }
  } catch {
    return createPageMetadata("talentNotFound")
  }
}

export default async function Page({ params }: TalentDetailRouteProps) {
  const { id } = await params

  return <TalentDetailPage id={id} />
}
