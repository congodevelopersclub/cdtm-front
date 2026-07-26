import type { ReactElement, ReactNode } from "react"
import { render, type RenderOptions, type RenderResult } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import { ThemeProvider } from "next-themes"

import { SidebarProvider } from "@workspace/ui/components/sidebar"

import en from "@/shared/i18n/messages/en.json"
import fr from "@/shared/i18n/messages/fr.json"

type Locale = "en" | "fr"

const messagesByLocale = {
  en,
  fr,
}

type ProviderOptions = {
  locale?: Locale
  withSidebar?: boolean
}

function AllProviders({
  children,
  locale = "en",
  withSidebar = false,
}: {
  children: ReactNode
  locale?: Locale
  withSidebar?: boolean
}) {
  const content = (
    <NextIntlClientProvider locale={locale} messages={messagesByLocale[locale]}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  )

  if (withSidebar) {
    return <SidebarProvider defaultOpen>{content}</SidebarProvider>
  }

  return content
}

export function renderWithProviders(
  ui: ReactElement,
  { locale = "en", withSidebar = false, ...options }: ProviderOptions & RenderOptions = {}
): RenderResult {
  return render(ui, {
    wrapper: ({ children }) => (
      <AllProviders locale={locale} withSidebar={withSidebar}>
        {children}
      </AllProviders>
    ),
    ...options,
  })
}

export * from "@testing-library/react"
export { default as userEvent } from "@testing-library/user-event"
