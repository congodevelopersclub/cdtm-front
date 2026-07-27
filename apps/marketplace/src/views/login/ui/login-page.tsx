import { LoginAuthPanel, LoginMarketingPanel } from "@/features/login"

export function LoginPage() {
  return (
    <div className="min-h-svh overflow-y-auto bg-primary p-4 sm:p-6 lg:p-12">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-lg lg:grid-cols-2">
        <LoginMarketingPanel />
        <div className="min-h-0 bg-background p-4 sm:p-6 lg:p-10">
          <LoginAuthPanel />
        </div>
      </div>
    </div>
  )
}
