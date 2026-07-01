import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { NewsletterSignupForm } from "@/features/newsletter-signup"

export function NewsletterSection() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Stay in the loop</CardTitle>
        <CardDescription>
          Get product updates and marketplace news in your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <NewsletterSignupForm />
      </CardContent>
    </Card>
  )
}
