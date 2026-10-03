import { getDashboardNav } from "../config/menus"
import { MOCK_NOTIFICATIONS } from "../config/notifications"
import {
  MOCK_SEARCH_COURSES,
  MOCK_SEARCH_JOBS,
  MOCK_SEARCH_TALENTS,
} from "../config/search-corpus"
import type { DashboardRole } from "../config/types"
import { MOCK_TALENT_PROFILE } from "@/entities/talent"

import type { SearchResult } from "@/shared/lib/search"

type TranslateFn = (key: string) => string

export function buildSearchIndex(role: DashboardRole, t: TranslateFn): SearchResult[] {
  const results: SearchResult[] = []

  for (const item of getDashboardNav(role)) {
    results.push({
      id: `page-${item.href}`,
      type: "page",
      title: t(item.titleKey),
      href: item.href,
      keywords: [t(item.titleKey), item.href.replace("/", "")],
    })
  }

  results.push({
    id: "page-profile",
    type: "page",
    title: t("navProfile"),
    href: "/profile",
    keywords: [t("navProfile"), "profile", "account"],
  })

  for (const talent of MOCK_SEARCH_TALENTS) {
    results.push({
      id: `person-${talent.id}`,
      type: "person",
      title: talent.name,
      subtitle: `${talent.title} · ${talent.location}`,
      href: talent.href,
      keywords: [talent.name, talent.title, talent.location, ...talent.skills],
    })
  }

  for (const job of MOCK_SEARCH_JOBS) {
    results.push({
      id: `job-${job.id}`,
      type: "job",
      title: job.title,
      subtitle: `${job.company} · ${job.location}`,
      href: job.href,
      keywords: [job.title, job.company, job.location, "job", "career"],
    })
  }

  const skillSet = new Set([
    ...MOCK_TALENT_PROFILE.skills,
    ...MOCK_TALENT_PROFILE.superpowerSkills,
    ...MOCK_SEARCH_TALENTS.flatMap((talent) => talent.skills),
  ])

  for (const skill of skillSet) {
    results.push({
      id: `skill-${skill.toLowerCase().replace(/\s+/g, "-")}`,
      type: "skill",
      title: skill,
      subtitle: MOCK_TALENT_PROFILE.superpowerSkills.includes(skill)
        ? "Superpower skill"
        : "Skill",
      href: "/skills",
      keywords: [skill, "skill", "technology"],
    })
  }

  for (const [index, project] of MOCK_TALENT_PROFILE.projects.entries()) {
    results.push({
      id: `project-${index}`,
      type: "project",
      title: project.title,
      subtitle: project.year,
      href: "/projects",
      keywords: [project.title, project.description, project.year, "project"],
    })
  }

  for (const course of MOCK_SEARCH_COURSES) {
    results.push({
      id: `course-${course.id}`,
      type: "course",
      title: course.title,
      subtitle: course.provider,
      href: course.href,
      keywords: [course.title, course.provider, "course", "learn", "path"],
    })
  }

  for (const notification of MOCK_NOTIFICATIONS) {
    results.push({
      id: `notification-${notification.id}`,
      type: "notification",
      title: notification.title,
      subtitle: notification.description,
      href: notification.href,
      keywords: [notification.title, notification.description, "notification"],
    })
  }

  return results
}
