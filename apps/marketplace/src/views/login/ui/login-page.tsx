import { LoginAuthPanel, LoginBrandHeader, LoginMarketingPanel } from "@/features/login"

export function LoginPage() {
  return (
    <div className="h-svh overflow-hidden bg-primary p-4 sm:p-6 lg:p-12">
      <div className="grid lg:grid-cols-2 h-full w-full rounded-lg overflow-hidden">
        <LoginMarketingPanel />
        <div className="flex h-full min-h-0 flex-col items-center justify-center overflow-hidden bg-background p-4 sm:p-6 lg:p-10">
          <LoginBrandHeader />
          <LoginAuthPanel />
        </div>
      </div>
    </div>
  )
}
