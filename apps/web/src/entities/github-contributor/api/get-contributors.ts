import type { GitHubContributor } from "../model/types"

const GITHUB_ORG = "congodevelopersclub"
const GITHUB_CACHE_REVALIDATE_SECONDS = 3600

type GitHubRepo = {
  name: string
  fork: boolean
}

type GitHubContributorResponse = {
  login: string
  id: number
  avatar_url: string
  html_url: string
  type: string
  contributions: number
}

function getGitHubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }

  const token = process.env.GITHUB_TOKEN

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

function parseLinkHeader(linkHeader: string | null): string | null {
  if (!linkHeader) {
    return null
  }

  const nextLink = linkHeader
    .split(",")
    .find((part) => part.includes('rel="next"'))

  if (!nextLink) {
    return null
  }

  const match = nextLink.match(/<([^>]+)>/)

  return match?.[1] ?? null
}

async function fetchPaginated<T>(initialUrl: string): Promise<T[]> {
  const results: T[] = []
  let nextUrl: string | null = initialUrl

  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: getGitHubHeaders(),
      next: { revalidate: GITHUB_CACHE_REVALIDATE_SECONDS },
    })

    if (!response.ok) {
      break
    }

    const page = (await response.json()) as T[]
    results.push(...page)
    nextUrl = parseLinkHeader(response.headers.get("link"))
  }

  return results
}

function isBot(login: string, type: string) {
  return type === "Bot" || login.endsWith("[bot]")
}

async function fetchOrgRepos(): Promise<GitHubRepo[]> {
  const repos = await fetchPaginated<GitHubRepo>(
    `https://api.github.com/orgs/${GITHUB_ORG}/repos?per_page=100&type=all`
  )

  return repos.filter((repo) => !repo.fork)
}

async function fetchRepoContributors(repoName: string) {
  return fetchPaginated<GitHubContributorResponse>(
    `https://api.github.com/repos/${GITHUB_ORG}/${repoName}/contributors?per_page=100`
  )
}

export async function getContributors(): Promise<GitHubContributor[]> {
  try {
    const repos = await fetchOrgRepos()

    if (repos.length === 0) {
      return []
    }

    const contributorLists = await Promise.all(
      repos.map((repo) => fetchRepoContributors(repo.name))
    )

    const merged = new Map<string, GitHubContributor>()

    for (const contributors of contributorLists) {
      for (const contributor of contributors) {
        if (isBot(contributor.login, contributor.type)) {
          continue
        }

        const existing = merged.get(contributor.login)

        if (existing) {
          existing.totalContributions += contributor.contributions
          continue
        }

        merged.set(contributor.login, {
          login: contributor.login,
          html_url: contributor.html_url,
          avatar_url: contributor.avatar_url,
          totalContributions: contributor.contributions,
        })
      }
    }

    return Array.from(merged.values()).sort((a, b) => {
      if (b.totalContributions !== a.totalContributions) {
        return b.totalContributions - a.totalContributions
      }

      return a.login.localeCompare(b.login)
    })
  } catch {
    return []
  }
}
