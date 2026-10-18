"use client"

import type { ReactNode } from "react"

import { useStoryAuth } from "../.storybook/decorators/with-auth"

export function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export { useStoryAuth as useAuth }
