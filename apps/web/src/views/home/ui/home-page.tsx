import { Suspense } from "react"

import { CtaSection } from "@/widgets/cta-section"
import {
  GithubContributorsSection,
  GithubContributorsSkeleton,
} from "@/widgets/github-contributors"
import { HeroSection } from "@/widgets/hero"
import { TestimonialsSection } from "@/widgets/testimonials-section"

import { HOME_EVENTS } from "@/shared/config/home-events"

export function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<GithubContributorsSkeleton />}>
        <GithubContributorsSection />
      </Suspense>
      <CtaSection />
      <TestimonialsSection />
    </>
  )
}
