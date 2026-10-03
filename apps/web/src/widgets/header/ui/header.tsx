"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { ThemeToggle } from "./theme-toggle"

import { CdcLogo } from "@/shared/ui/brand-icons"
import { JOIN_URL, NAV_PATHS } from "@/shared/config/site-links"
import { LocaleSwitcher } from "@/shared/ui/locale-switcher"

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
      <div className="page-container">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <CdcLogo className="transition-transform group-hover:scale-105" size={48} priority />
            <span className="text-foreground hidden truncate text-xl font-extrabold tracking-tighter md:block lg:text-2xl">
              Congo Developer Club
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "text-[10px] font-semibold tracking-widest uppercase transition-colors hover:text-foreground xl:text-xs",
                  pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}

            <div className="border-border ml-2 flex items-center gap-4 border-l pl-6">
              <LocaleSwitcher />
              <ThemeToggle />
              <Button
                asChild
                className="text-xs font-bold tracking-widest uppercase shadow-primary-sm active:scale-95"
              >
                <a href={JOIN_URL}>{t("join")}</a>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LocaleSwitcher compact />
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
            className="bg-background border-border space-y-4 border-b p-6 lg:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block text-base font-semibold tracking-widest uppercase transition-colors",
                  pathname === link.path
                    ? "text-primary"
                    : "hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-border border-t pt-4">
              <Button asChild className="w-full">
                <a href={JOIN_URL} onClick={() => setIsOpen(false)}>
                  {t("join")}
                </a>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  )
}
