"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, User, X } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { ThemeToggle } from "./theme-toggle"

import { LocaleSwitcher } from "@/shared/ui/locale-switcher"

const NAV_PATHS = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "activities", path: "/activities" },
  { key: "events", path: "/events" },
  { key: "blog", path: "/blog" },
  { key: "contact", path: "/contact" },
  { key: "support", path: "/support" },
] as const

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const t = useTranslations("nav")

  const navLinks = NAV_PATHS.map((link) => ({
    name: t(link.key),
    path: link.path,
  }))

  return (
    <nav className="border-border bg-background/80 fixed top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="group flex items-center space-x-3">
            <div className="bg-primary text-primary-foreground flex h-12 w-12 rotate-3 items-center justify-center rounded font-mono text-xl leading-none font-bold italic transition-transform group-hover:rotate-0">
              CDC
            </div>
            <span className="font-display text-foreground text-xl font-extrabold tracking-tighter lg:text-2xl">
              Congo Developer Club
            </span>
          </Link>

          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "text-xs font-semibold tracking-widest uppercase transition-colors hover:text-foreground",
                  pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}

            <div className="border-border ml-2 flex items-center space-x-4 border-l pl-6">
              <LocaleSwitcher />

              <ThemeToggle />

              <Button
                asChild
                className="text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] active:scale-95"
              >
                <Link href="/join">{t("join")}</Link>
              </Button>

              <Link
                href="/profile"
                className="border-border bg-card text-muted-foreground hover:border-primary flex items-center justify-center rounded border p-2 transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground p-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-background border-border space-y-4 border-b p-6 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="hover:text-primary block text-base font-semibold tracking-widest uppercase transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="border-border border-t pt-4">
              <LocaleSwitcher />
            </div>
            <Button asChild className="w-full">
              <Link href="/join" onClick={() => setIsOpen(false)}>
                {t("join")}
              </Link>
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  )
}
