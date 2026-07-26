import { LoginAuthPanel, LoginMarketingPanel } from "@/features/login"

export function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <LoginMarketingPanel />
      <div className="flex items-center justify-center bg-background p-6 sm:p-10">
        <LoginAuthPanel />
      </div>
    </div>
  )
}
