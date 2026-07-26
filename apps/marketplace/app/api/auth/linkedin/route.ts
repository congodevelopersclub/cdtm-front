import { redirect } from "next/navigation"

import { serverEnv } from "@/shared/config/env.server"

export function GET() {
  redirect(`${serverEnv.API_URL}/auth`)
}
