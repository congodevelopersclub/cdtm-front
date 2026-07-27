"use client"

import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"

import { ContributorCard } from "./contributor-card"

import type {
  GitHubContributor,
  GitHubContributorLabels,
} from "@/entities/github-contributor"

type GithubCarouselProps = {
  contributors: GitHubContributor[]
  labels: GitHubContributorLabels
}

export function GithubCarousel({ contributors, labels }: GithubCarouselProps) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  )

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-6">
        {contributors.map((user, index) => (
          <div
            key={`${user.login}-${index}`}
            className="flex-[0_0_50%] md:flex-[0_0_33%] lg:flex-[0_0_16.66%]"
          >
            <ContributorCard user={user} index={index} labels={labels} />
          </div>
        ))}
      </div>
    </div>
  )
}
