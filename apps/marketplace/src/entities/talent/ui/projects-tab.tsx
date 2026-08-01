"use client"

import { useTranslations } from "next-intl"

import { Badge } from "@workspace/ui/components/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

import type { TalentProfile } from "../model/types"

type ProjectsTabProps = {
  profile: TalentProfile
}

export function ProjectsTab({ profile }: ProjectsTabProps) {
  const t = useTranslations("Profile")

  if (profile.projects.length === 0) {
    return (
      <p className="py-8 text-sm text-muted-foreground">{t("noProjects")}</p>
    )
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">
          {t("projects")}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("projectsDescription")}
        </p>
      </div>
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
    </div>
  )
}
