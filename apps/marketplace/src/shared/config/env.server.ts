import "server-only"

import { z } from "zod"

const serverEnvSchema = z.object({
  API_URL: z.url().default("https://staging-cdc.duckdns.org/api/v1"),
  LOGOUT_REDIRECT_URL: z.url().default("http://localhost:3001"),
})

export const serverEnv = serverEnvSchema.parse({
  API_URL: process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL,
  LOGOUT_REDIRECT_URL: process.env.LOGOUT_REDIRECT_URL,
})
