import type { GitHubContributor } from "../model/types"

import { GITHUB_MEMBERS } from "@/shared/config/github-members"

const GITHUB_CACHE_REVALIDATE_SECONDS = 3600

async function fetchContributorData(
  username: string
): Promise<GitHubContributor | null> {
  try {
    const [userRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        next: { revalidate: GITHUB_CACHE_REVALIDATE_SECONDS },
      }),
      fetch(`https://github-contributions-api.deno.dev/${username}.json`, {
        next: { revalidate: GITHUB_CACHE_REVALIDATE_SECONDS },
      }),
    ])

    if (!userRes.ok) {
      return null
    }

    const user = (await userRes.json()) as {
      login: string
      html_url: string
      avatar_url: string
    }
    const contribs = contribRes.ok
      ? ((await contribRes.json()) as { totalContributions?: number })
      : { totalContributions: 0 }

    return {
      login: user.login,
      html_url: user.html_url,
      avatar_url: user.avatar_url,
      totalContributions: contribs.totalContributions ?? 0,
    }
  } catch {
    return null
  }
}

export async function getContributors(): Promise<GitHubContributor[]> {
  const contributors = await Promise.all(
    GITHUB_MEMBERS.map((member) => fetchContributorData(member.githubUser))
  )

  return contributors
    .filter(
      (contributor): contributor is GitHubContributor => contributor !== null
    )
    .sort((a, b) => b.totalContributions - a.totalContributions)
}
