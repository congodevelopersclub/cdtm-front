"use client"

import { useTranslations } from "next-intl"

import type { TalentProfile } from "@/entities/talent"

type SkillsTabProps = {
  profile: TalentProfile
}

export function SkillsTab({ profile }: SkillsTabProps) {
  const t = useTranslations("Profile")

  return (
    <div className="flex flex-col gap-6 py-8">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">
          {t("allSkills")}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("allSkillsDescription")}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {profile.skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center rounded-full bg-muted px-4 py-2 text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
