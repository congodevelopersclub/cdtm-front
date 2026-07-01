"use client"

import { useAuth } from "@/shared/providers/auth-provider"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

export function DashboardPage() {
  const { session } = useAuth()

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>
            Protected marketplace route — JWT middleware is active.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {session ? (
            <p className="text-sm">
              Signed in as <span className="font-medium">{session.email}</span>
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">
              Session loading...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
