import type { NextRequest } from "next/server"

import { authMiddleware } from "@/shared/auth/middleware"

export function middleware(request: NextRequest) {
  return authMiddleware(request)
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
