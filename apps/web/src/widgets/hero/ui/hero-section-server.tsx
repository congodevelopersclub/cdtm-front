import { getContributors } from "@/entities/github-contributor"

import { HeroSection as HeroSectionClient } from "./hero-section"

export async function HeroSection() {
  const contributors = await getContributors()

  return (
    <HeroSectionClient
      contributorCount={contributors.length}
      contributors={contributors.slice(0, 12)}
    />
  )
}