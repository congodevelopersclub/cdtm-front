import "@testing-library/jest-dom/vitest"

import { cleanup } from "@testing-library/react"
import { afterEach, vi } from "vitest"

afterEach(() => {
  cleanup()
  document.cookie = ""
  sessionStorage.clear()
  localStorage.clear()
})

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(globalThis, "ResizeObserver", {
  writable: true,
  value: ResizeObserverMock,
})

Element.prototype.scrollIntoView = vi.fn()

vi.mock("server-only", () => ({}))

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: vi.fn(() => "/dashboard"),
  useSearchParams: () => new URLSearchParams(),
}))

vi.mock("next-intl", async () => {
  const en = await import("@/shared/i18n/messages/en.json")
  const fr = await import("@/shared/i18n/messages/fr.json")

  let currentLocale: "en" | "fr" = "en"

  const messagesByLocale = {
    en: en.default,
    fr: fr.default,
  }

  return {
    useTranslations: (namespace: string) => {
      const messages = messagesByLocale[currentLocale][
        namespace as keyof typeof en.default
      ] as Record<string, string>

      return (key: string, values?: Record<string, string | number>) => {
        let message = messages[key] ?? key

        if (values) {
          for (const [token, value] of Object.entries(values)) {
            message = message.replace(`{${token}}`, String(value))
          }
        }

        return message
      }
    },
    useLocale: () => currentLocale,
    NextIntlClientProvider: ({
      children,
      locale = "en",
    }: {
      children: React.ReactNode
      locale?: "en" | "fr"
    }) => {
      currentLocale = locale
      return children
    },
  }
})

vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: "light",
    setTheme: vi.fn(),
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock("@/shared/auth", () => ({
  clearToken: vi.fn(),
  getToken: vi.fn(() => null),
  getSessionFromToken: vi.fn(),
}))

vi.mock("@/shared/i18n/actions/set-locale", () => ({
  setLocale: vi.fn(),
}))

vi.mock("@/features/auth", () => ({
  useAuth: () => ({
    session: { userId: "1", email: "demo@example.com", name: "Demo User" },
    user: {
      id: "1",
      name: "Demo User",
      email: "demo@example.com",
    },
    isAuthenticated: true,
    isLoading: false,
    refreshSession: vi.fn(),
  }),
  useLogout: () => vi.fn(),
}))
