"use client"

import { useTranslations } from "next-intl"

import type { TalentProfile } from "../model/types"

type ExperienceTabProps = {
  profile: TalentProfile
}

export function ExperienceTab({ profile }: ExperienceTabProps) {
  const t = useTranslations("Profile")

  if (profile.experience.length === 0) {
    return (
      <p className="py-8 text-sm text-muted-foreground">{t("noExperience")}</p>
    )
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">
          {t("experienceTab")}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("experienceDescription")}
        </p>
      </div>
      <div className="relative flex flex-col gap-8 border-l border-border pl-6">
        {profile.experience.map((item) => (
          <div key={`${item.company}-${item.role}`} className="relative">
            <span className="absolute -left-[calc(1.5rem+5px)] top-1.5 size-2.5 rounded-full bg-brand-steel-blue" />
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-lg font-semibold">{item.role}</h4>
                <span className="text-sm text-muted-foreground">
                  {item.period}
                </span>
              </div>
              <p className="text-sm font-medium text-brand-steel-blue">
                {item.company}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
