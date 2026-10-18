import { ThemeProvider } from "next-themes"
import type { Decorator } from "@storybook/nextjs-vite"

export const withTheme: Decorator = (Story) => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <div className="font-sans antialiased">
      <Story />
    </div>
  </ThemeProvider>
)
