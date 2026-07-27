"use client"

import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"

import {
  TooltipProvider,
} from "@workspace/ui/components/tooltip"

import { ContributorCard } from "./contributor-card"

import type { GitHubContributor } from "@/entities/github-contributor"

type GithubCarouselProps = {
  contributors: GitHubContributor[]
}

export function GithubCarousel({ contributors }: GithubCarouselProps) {
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
    <TooltipProvider delayDuration={200}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-6 flex touch-pan-y">
          {contributors.map((user, index) => (
            <div
              key={user.login}
              className="min-w-0 flex-[0_0_50%] py-2 pl-6 md:flex-[0_0_33%] lg:flex-[0_0_16.66%]"
            >
              <ContributorCard user={user} rank={index + 1} />
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}
