import { LoginAuthPanel, LoginMarketingPanel } from "@/features/login"

export function LoginPage() {
  return (
    <div className="h-svh overflow-hidden bg-primary p-4 sm:p-6 lg:p-12">
      <div className="grid h-full w-full overflow-hidden rounded-lg lg:grid-cols-2">
        <LoginMarketingPanel />
        <div className="h-full min-h-0 overflow-hidden bg-background p-4 sm:p-6 lg:p-10">
          <LoginAuthPanel />
        </div>
      </div>
    </div>
  )
}
