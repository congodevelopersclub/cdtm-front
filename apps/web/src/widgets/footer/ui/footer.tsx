"use client"

import Link from "next/link"
import { Mail } from "lucide-react"
import { useTranslations } from "next-intl"

import {
  LEGAL_LINKS,
  NAV_PATHS,
  SOCIAL_LINKS,
} from "@/shared/config/site-links"
import {
  CdcLogo,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/shared/ui/brand-icons"

const SOCIAL_ICONS = {
  GitHub: GithubIcon,
  X: TwitterIcon,
  LinkedIn: LinkedinIcon,
  Email: Mail,
} as const

export function Footer() {
  const tNav = useTranslations("nav")
  const tFooter = useTranslations("footer")
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-border bg-card/50 border-t">
      <div className="page-container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="mb-6 flex items-center gap-3">
              <CdcLogo size={40} />
              <span className="text-foreground text-lg font-extrabold tracking-tighter">
                Congo Developer Club
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md text-sm leading-relaxed">
              {tFooter("description")}
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ href, label }) => {
                const Icon = SOCIAL_ICONS[label]

                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="border-border bg-background text-muted-foreground hover:border-primary hover:text-primary flex h-10 w-10 items-center justify-center rounded border transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-foreground mb-4 text-xs font-bold tracking-widest uppercase">
              {tFooter("col_nav")}
            </h3>
            <ul className="space-y-3">
              {NAV_PATHS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.path}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-foreground mb-4 text-xs font-bold tracking-widest uppercase">
              {tFooter("col_legal")}
            </h3>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {tFooter(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-border text-muted-foreground mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs md:flex-row">
          <p>
            &copy; {currentYear} {tFooter("community_name")}. {tFooter("rights")}
          </p>
          <p>
            {tFooter("built_by_community")} · {tFooter("made_in")}{" "}
            {tFooter("country")}
          </p>
        </div>
      </div>
    </footer>
  )
}
