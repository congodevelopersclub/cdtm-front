import { Suspense } from "react"

import { CtaSection } from "@/widgets/cta-section"
import { EventsSection } from "@/widgets/events-section"
import {
  GithubContributorsSection,
  GithubContributorsSkeleton,
} from "@/widgets/github-contributors"
import { HeroSection } from "@/widgets/hero"
import { ImpactSection } from "@/widgets/impact-section"
import { NewsSection } from "@/widgets/news-section"
import { TestimonialsSection } from "@/widgets/testimonials-section"

import { HOME_EVENTS } from "@/shared/config/home-events"

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ImpactSection />
      <Suspense fallback={<GithubContributorsSkeleton />}>
        <GithubContributorsSection />
      </Suspense>
      <EventsSection events={HOME_EVENTS} />
      <NewsSection />
      <CtaSection />
      <TestimonialsSection />
    </>
  )
}
