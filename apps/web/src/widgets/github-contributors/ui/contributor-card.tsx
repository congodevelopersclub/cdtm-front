"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

import type { GitHubContributor } from "@/entities/github-contributor"

import { GithubIcon } from "@/shared/ui/brand-icons"

type ContributorCardProps = {
  user: GitHubContributor
  rank: number
}

export function ContributorCard({ user, rank }: ContributorCardProps) {
  const t = useTranslations("github")
  const contributionLabel =
    user.totalContributions === 1
      ? t("contribution_singular")
      : t("contributions")

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(rank - 1, 8) * 0.05 }}
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
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                tabIndex={0}
                className="bg-background border-border text-primary absolute -right-2 -bottom-2 flex h-6 w-6 cursor-help items-center justify-center rounded-full border text-[10px] font-black"
                onClick={(event) => event.preventDefault()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                  }
                }}
              >
                {rank}
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">{t("tooltips.rank")}</TooltipContent>
          </Tooltip>
        </div>
        <h3 className="text-foreground group-hover:text-primary mb-1 w-full truncate text-sm font-bold transition-colors">
          @{user.login}
        </h3>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="text-muted-foreground flex cursor-help items-center justify-center gap-1 text-[10px] tracking-widest uppercase">
              <GithubIcon className="h-3 w-3" />
              <span>{t("profile")}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">{t("tooltips.profile")}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="text-primary mt-2 cursor-help text-center font-mono text-xs">
              {user.totalContributions} {contributionLabel}
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {t("tooltips.contributions")}
          </TooltipContent>
        </Tooltip>
      </a>
    </motion.div>
  )
}
