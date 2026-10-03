import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { getProfileAction } from "@/entities/talent/actions/get-profile"
import { createPageMetadata } from "@/shared/lib/metadata"

export { TalentDetailPage as default } from "@/pages/talent"

type TalentDetailPageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: TalentDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const t = await getTranslations("Metadata")

  try {
    const profile = await getProfileAction(id)

    return {
      title: profile.name,
      description: t("talentProfile.description", {
        name: profile.name,
        role: profile.title,
      }),
    }
  } catch {
    return createPageMetadata("talentNotFound")
  }
}
