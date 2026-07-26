import { z } from "zod"

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url().default("https://staging-cdc.duckdns.org/api/v1"),
  NEXT_PUBLIC_APP_URL: z.url().default("http://localhost:3001"),
})

export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
})
