import { getContributors, getProjectCount } from "@/entities/github-contributor"
import { getPublicProfiles } from "@/entities/talent"

import { HeroSection as HeroSectionClient } from "./hero-section"

export async function HeroSection() {
  const [contributors, projectCount, talents] = await Promise.all([
    getContributors(),
    getProjectCount(),
    getPublicProfiles(1),
  ])

  return (
    <HeroSectionClient
      developerCount={talents.pagination.total}
      projectCount={projectCount}
      contributors={contributors.slice(0, 12)}
    />
  )
}
