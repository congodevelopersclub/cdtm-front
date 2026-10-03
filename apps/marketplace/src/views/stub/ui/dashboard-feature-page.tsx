import { getTranslations } from "next-intl/server"

import {
  DashboardEmptyState,
  DashboardPageShell,
  type DashboardTab,
} from "@/widgets/dashboard-shell"

type FeaturePageKey = "jobs" | "skills" | "projects" | "talents" | "learn"

const PAGE_CONFIG: Record<
  FeaturePageKey,
  {
    subNav: Array<{
      labelKey: string
      value: string
      emptyTitleKey: string
      emptyDescriptionKey: string
    }>
  }
> = {
  jobs: {
    subNav: [
      {
        labelKey: "invites",
        value: "invites",
        emptyTitleKey: "jobsEmptyTitle",
        emptyDescriptionKey: "jobsEmptyDescription",
      },
      {
        labelKey: "applications",
        value: "applications",
        emptyTitleKey: "applicationsEmptyTitle",
        emptyDescriptionKey: "applicationsEmptyDescription",
      },
      {
        labelKey: "saved",
        value: "saved",
        emptyTitleKey: "savedJobsEmptyTitle",
        emptyDescriptionKey: "savedJobsEmptyDescription",
      },
    ],
  },
  skills: {
    subNav: [
      {
        labelKey: "allSkills",
        value: "all",
        emptyTitleKey: "skillsEmptyTitle",
        emptyDescriptionKey: "skillsEmptyDescription",
      },
      {
        labelKey: "endorsed",
        value: "endorsed",
        emptyTitleKey: "endorsedEmptyTitle",
        emptyDescriptionKey: "endorsedEmptyDescription",
      },
      {
        labelKey: "learning",
        value: "learning",
        emptyTitleKey: "learningEmptyTitle",
        emptyDescriptionKey: "learningEmptyDescription",
      },
    ],
  },
  projects: {
    subNav: [
      {
        labelKey: "activeProjects",
        value: "active",
        emptyTitleKey: "projectsEmptyTitle",
        emptyDescriptionKey: "projectsEmptyDescription",
      },
      {
        labelKey: "completedProjects",
        value: "completed",
        emptyTitleKey: "completedProjectsEmptyTitle",
        emptyDescriptionKey: "completedProjectsEmptyDescription",
      },
      {
        labelKey: "draftProjects",
        value: "drafts",
        emptyTitleKey: "draftProjectsEmptyTitle",
        emptyDescriptionKey: "draftProjectsEmptyDescription",
      },
    ],
  },
  talents: {
    subNav: [
      {
        labelKey: "directory",
        value: "directory",
        emptyTitleKey: "talentsEmptyTitle",
        emptyDescriptionKey: "talentsEmptyDescription",
      },
      {
        labelKey: "savedTalents",
        value: "saved",
        emptyTitleKey: "savedTalentsEmptyTitle",
        emptyDescriptionKey: "savedTalentsEmptyDescription",
      },
      {
        labelKey: "following",
        value: "following",
        emptyTitleKey: "followingEmptyTitle",
        emptyDescriptionKey: "followingEmptyDescription",
      },
    ],
  },
  learn: {
    subNav: [
      {
        labelKey: "courses",
        value: "courses",
        emptyTitleKey: "learnEmptyTitle",
        emptyDescriptionKey: "learnEmptyDescription",
      },
      {
        labelKey: "paths",
        value: "paths",
        emptyTitleKey: "pathsEmptyTitle",
        emptyDescriptionKey: "pathsEmptyDescription",
      },
      {
        labelKey: "certificates",
        value: "certificates",
        emptyTitleKey: "certificatesEmptyTitle",
        emptyDescriptionKey: "certificatesEmptyDescription",
      },
    ],
  },
}

type DashboardFeaturePageProps = {
  pageKey: FeaturePageKey
}

export async function DashboardFeaturePage({
  pageKey,
}: DashboardFeaturePageProps) {
  const t = await getTranslations("DashboardShell")
  const config = PAGE_CONFIG[pageKey]

  const tabs: DashboardTab[] = config.subNav.map((item) => ({
    value: item.value,
    label: t(item.labelKey),
    content: (
      <DashboardEmptyState
        title={t(item.emptyTitleKey)}
        description={t(item.emptyDescriptionKey)}
      />
    ),
  }))

  return (
    <DashboardPageShell
      tabs={tabs}
      defaultTab={config.subNav[0]!.value}
    />
  )
}
