import { getContributors, getProjectCount } from "@/entities/github-contributor"

import { HeroSection as HeroSectionClient } from "./hero-section"

export async function HeroSection() {
  const [contributors, projectCount] = await Promise.all([
    getContributors(),
    getProjectCount(),
  ])

  return (
    <HeroSectionClient
      contributorCount={contributors.length}
      projectCount={projectCount}
      contributors={contributors.slice(0, 12)}
    />
  )
}