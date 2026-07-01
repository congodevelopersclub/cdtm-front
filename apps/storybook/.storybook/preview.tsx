import { initialize, mswLoader } from "msw-storybook-addon"
import type { Preview } from "@storybook/nextjs-vite"
import { withThemeByClassName } from "@storybook/addon-themes"

import "@workspace/ui/globals.css"

import { withAuth } from "./decorators/with-auth"
import { withI18n } from "./decorators/with-i18n"
import { withQuery } from "./decorators/with-query"
import { withTheme } from "./decorators/with-theme"
import { withToaster } from "./decorators/with-toaster"

initialize({ onUnhandledRequest: "bypass" })

const preview: Preview = {
  loaders: [mswLoader],
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
    },
    a11y: {
      test: "todo",
    },
    nextjs: {
      appDirectory: true,
    },
  },
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Active UI locale",
      defaultValue: "en",
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
        ],
      },
    },
    i18nApp: {
      name: "Messages",
      description: "Message catalog source app",
      defaultValue: "web",
      toolbar: {
        icon: "book",
        items: [
          { value: "web", title: "Web" },
          { value: "marketplace", title: "Marketplace" },
        ],
      },
    },
  },
  decorators: [
    withTheme,
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
    withI18n,
    withQuery,
    withAuth,
    withToaster,
  ],
}

export default preview
