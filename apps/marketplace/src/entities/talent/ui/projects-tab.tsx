"use client"

import { useTranslations } from "next-intl"

import { Badge } from "@workspace/ui/components/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

import { toAbsoluteProjectLink } from "../lib/to-absolute-project-link"
import type { TalentProfile } from "../model/types"

type ProjectsTabProps = {
  profile: TalentProfile
}

export function ProjectsTab({ profile }: ProjectsTabProps) {
  const t = useTranslations("Profile")

  if (profile.projects.length === 0) {
    return (
      <p className="py-4 text-sm text-muted-foreground">{t("noProjects")}</p>
    )
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {t("projects")}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("projectsDescription")}
        </p>
      </div>
      <div className="grid gap-4">
        {profile.projects.map((project) => (
          <Card key={project.title} className="rounded-3xl border border-border bg-card px-5 py-5 shadow-none ring-0 sm:px-6">
            <CardHeader className="px-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <Badge variant="secondary">{project.year}</Badge>
              </div>
              <CardDescription className="text-sm leading-relaxed">
                {project.description}
              </CardDescription>
              {project.link ? (
                <a
                  href={toAbsoluteProjectLink(project.link)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {t("viewProject")}
                </a>
              ) : null}
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
