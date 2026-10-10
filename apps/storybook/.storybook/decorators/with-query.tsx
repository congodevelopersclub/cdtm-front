import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { Decorator } from "@storybook/nextjs-vite"

export const withQuery: Decorator = (Story) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  )
}
