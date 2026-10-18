"use client"

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import * as React from "react"

import { handleUnauthenticatedError } from "@/shared/auth/handle-unauthenticated"
import { isUnauthenticatedClientError } from "@/shared/auth/expired-session"

function retryUnlessUnauthenticated(failureCount: number, error: unknown) {
  if (isUnauthenticatedClientError(error)) {
    return false
  }

  return failureCount < 1
}

function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        void handleUnauthenticatedError(error)
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        void handleUnauthenticatedError(error)
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: retryUnlessUnauthenticated,
      },
      mutations: {
        retry: retryUnlessUnauthenticated,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient()
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }

  return browserQueryClient
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
