"use client"

import { useTranslations } from "next-intl"

import type { TalentProfile } from "../model/types"

type MyStoryTabProps = {
  profile: TalentProfile
}

export function MyStoryTab({ profile }: MyStoryTabProps) {
  const t = useTranslations("Profile")
  const paragraphs = profile.bio.split("\n\n").filter(Boolean)

  return (
    <div className="grid gap-8 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
      <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
        {t("myStory")}
      </h3>
      <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))
        ) : (
          <p>{t("noBio")}</p>
        )}
      </div>
    </div>
  )
}
