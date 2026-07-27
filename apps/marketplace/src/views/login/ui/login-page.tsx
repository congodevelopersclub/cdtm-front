import { LoginAuthPanel, LoginMarketingPanel } from "@/features/login"

export function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col bg-primary p-4 sm:p-6 lg:p-12">
      <div className="mx-auto grid h-full min-h-0 w-full max-w-6xl flex-1 overflow-hidden rounded-lg lg:grid-cols-2">
        <LoginMarketingPanel />
        <div className="flex h-full min-h-0 flex-col bg-background p-4 sm:p-6 lg:p-10">
          <LoginAuthPanel />
        </div>
      </div>
    </div>
  )
}
