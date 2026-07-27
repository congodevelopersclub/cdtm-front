import type { TalentProfile } from "@/entities/talent"

import { formatTalentDirectoryCategory } from "./talent-directory-categories"

export function getTalentProfileSearchFields(profile: TalentProfile) {
  return {
    title: profile.name,
    subtitle: profile.title,
    keywords: [
      profile.location,
      profile.bio,
      ...profile.skills,
      ...profile.superpowerSkills,
      ...(profile.categories?.map((category) =>
        formatTalentDirectoryCategory(category)
      ) ?? []),
    ].filter(Boolean),
  }
}
