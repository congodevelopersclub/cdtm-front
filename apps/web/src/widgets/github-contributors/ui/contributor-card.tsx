"use client"

import { motion } from "framer-motion"

import type { GitHubContributor } from "@/entities/github-contributor"

import { GithubIcon } from "@/shared/ui/brand-icons"

type ContributorCardProps = {
  user: GitHubContributor
  index: number
  labels: {
    profile: string
    contributions: string
    contribution_singular: string
  }
}

export function ContributorCard({ user, index, labels }: ContributorCardProps) {
  const contributionLabel =
    user.totalContributions === 1
      ? labels.contribution_singular
      : labels.contributions

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="group bg-card border-border hover:border-primary block rounded-xl border p-6 text-center transition-all hover:-translate-y-1 hover:shadow-primary-hover"
      >
        <div className="relative mb-4 inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.avatar_url}
            alt={user.login}
            className="border-border h-20 w-20 rounded-full border object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          />
          <div className="bg-background border-border text-primary absolute -right-2 -bottom-2 flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-black">
            {index + 1}
          </div>
        </div>
        <h3 className="text-foreground group-hover:text-primary mb-1 w-full truncate text-sm font-bold transition-colors">
          @{user.login}
        </h3>
        <div className="text-muted-foreground flex items-center justify-center gap-1 text-[10px] tracking-widest uppercase">
          <GithubIcon className="h-3 w-3" />
          <span>{labels.profile}</span>
        </div>
        <div className="text-primary mt-2 text-center font-mono text-xs">
          {user.totalContributions} {contributionLabel}
        </div>
      </a>
    </motion.div>
  )
}
