"use client"

import Link from "next/link"
import { Mail } from "lucide-react"
import { useTranslations } from "next-intl"

import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/shared/ui/brand-icons"

const NAV_LINKS = ["home", "about", "activities", "events", "blog"] as const

const LEGAL_LINKS = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
  { key: "cookies", href: "/cookies" },
] as const

const SOCIAL_LINKS = [
  {
    href: "https://github.com/congodevelopersclub",
    label: "GitHub",
    icon: GithubIcon,
  },
  {
    href: "https://twitter.com/congodevelopersclub",
    label: "Twitter",
    icon: TwitterIcon,
  },
  {
    href: "https://linkedin.com/company/congodevelopersclub",
    label: "LinkedIn",
    icon: LinkedinIcon,
  },
  {
    href: "mailto:contact@congodevelopersclub.org",
    label: "Email",
    icon: Mail,
  },
] as const

export function Footer() {
  const tNav = useTranslations("nav")
  const tFooter = useTranslations("footer")
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-border bg-card/50 border-t">
      <div className="mx-auto max-w-screen-2xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="mb-6 flex items-center space-x-3">
              <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded font-mono text-lg font-bold italic">
                CDC
              </div>
              <span className="font-display text-foreground text-lg font-extrabold tracking-tighter">
                Congo Developer Club
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md text-sm leading-relaxed">
              {tFooter("description")}
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
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
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-foreground mb-4 text-xs font-bold tracking-widest uppercase">
              {tFooter("col_nav")}
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    href={link === "home" ? "/" : `/${link}`}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {tNav(link)}
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
            &copy; {currentYear} Congo Developer Club. {tFooter("rights")}
          </p>
          <p>
            {tFooter("built_by")}{" "}
            <a
              href="https://github.com/Tacite243"
              target="_blank"
              rel="noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              Tacite WAKILONGO
            </a>
            {" · "}
            {tFooter("made_in")} DR Congo
          </p>
        </div>
      </div>
    </footer>
  )
}
