import { getTranslations } from "next-intl/server"

import {
  DashboardEmptyState,
  DashboardPageShell,
  type DashboardTab,
} from "@/widgets/dashboard-shell"

type FeaturePageKey = "jobs" | "talents" | "learn"

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
      title={t(pageKey === "jobs" ? "navJobs" : pageKey === "learn" ? "navLearn" : "navTalents")}
      tabs={tabs}
      defaultTab={config.subNav[0]!.value}
    />
  )
}
