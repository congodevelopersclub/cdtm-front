"use client"

import { useTranslations } from "next-intl"

import { Card, CardDescription, CardHeader } from "@workspace/ui/components/card"

import type { TalentProfile } from "../model/types"

type MyStoryTabProps = {
  profile: TalentProfile
}

export function MyStoryTab({ profile }: MyStoryTabProps) {
  const t = useTranslations("Profile")
  const paragraphs = profile.bio.split("\n\n").filter(Boolean)

  return (
    <div className="flex flex-col gap-6 py-8">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">{t("myStory")}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{t("myStoryDescription")}</p>
      </div>
      {paragraphs.length > 0 ? (
        <Card className="rounded-2xl px-6 py-5 ring-0">
          <CardHeader className="px-0">
            <CardDescription className="flex flex-col gap-4 text-sm leading-relaxed">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <p className="text-sm text-muted-foreground">{t("noBio")}</p>
      )}
    </div>
  )
}
