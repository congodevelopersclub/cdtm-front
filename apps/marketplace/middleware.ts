import { authMiddleware } from "@/shared/auth/middleware"

export default authMiddleware

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/listings/:path*",
    "/checkout/:path*",
    "/settings/:path*",
    "/login",
  ],
}
