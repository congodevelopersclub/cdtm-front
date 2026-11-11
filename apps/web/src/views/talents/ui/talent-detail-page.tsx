import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Check, MapPin } from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

import { TalentAvatar } from "./talent-avatar"

import { getPublicProfile } from "@/entities/talent"

type TalentDetailPageProps = {
  id: string
}

export async function TalentDetailPage({ id }: TalentDetailPageProps) {
  const t = await getTranslations("talents")
  let profile = null
  let hasError = false

  try {
    profile = await getPublicProfile(id)
  } catch {
    hasError = true
  }

  if (hasError) {
    return (
      <section className="py-16">
        <div className="page-container">
          <p className="text-muted-foreground text-sm">{t("loadError")}</p>
        </div>
      </section>
    )
  }

  if (!profile) {
    notFound()
  }

  const paragraphs = profile.bio.split("\n\n").filter(Boolean)

  return (
    <section className="py-16">
      <div className="page-container flex flex-col gap-10">
        <Button variant="outline" className="w-fit rounded-full" asChild>
          <Link href="/talents">{t("backToDirectory")}</Link>
        </Button>

        <Card className="relative w-full min-w-0 overflow-hidden rounded-3xl border-border bg-card px-4 py-6 shadow-none ring-0 sm:px-6 sm:py-8">
          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start">
            <div className="flex shrink-0 flex-col items-start gap-3">
              <TalentAvatar
                name={profile.name}
                avatar={profile.avatar}
                className="size-24 rounded-full sm:size-28 lg:size-32"
                fallbackClassName="rounded-full text-xl sm:text-2xl"
              />
              {profile.location ? (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4 shrink-0" />
                  <span>{profile.location}</span>
                </div>
              ) : null}
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {profile.name}
                </h1>
                {profile.verified ? (
                  <span
                    className="inline-flex size-7 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange"
                    title={t("verified")}
                  >
                    <Check className="size-4" />
                  </span>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                {profile.title ? (
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">{t("role")}</p>
                    <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {profile.title}
                    </p>
                  </div>
                ) : null}
                {profile.experienceYears > 0 ? (
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">{t("experience")}</p>
                    <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {t("years", { count: profile.experienceYears })}
                    </p>
                  </div>
                ) : null}
              </div>

              {profile.superpowerSkills.length > 0 ? (
                <div className="flex min-w-0 flex-col gap-3">
                  <p className="text-sm font-medium">{t("superpowerSkills")}</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.superpowerSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm"
                      >
                        <span className="text-brand-orange">★</span>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </Card>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t("story")}
          </h2>
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

        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{t("skills")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("skillsDescription")}</p>
          </div>
          {profile.skills.length > 0 ? (
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
          ) : (
            <p className="text-sm text-muted-foreground">{t("noSkills")}</p>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{t("projects")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("projectsDescription")}
            </p>
          </div>
          {profile.projects.length > 0 ? (
            <div className="grid gap-4">
              {profile.projects.map((project) => (
                <Card key={project.title} className="rounded-2xl px-6 py-5 ring-0">
                  <CardHeader className="px-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge variant="secondary">{project.year}</Badge>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{t("noProjects")}</p>
          )}
        </div>
      </div>
    </section>
  )
}
