"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="border-border bg-card text-muted-foreground hover:border-primary rounded border p-2 transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="dark:hidden h-5 w-5" />
      <Moon className="hidden h-5 w-5 dark:block" />
    </button>
  )
}
