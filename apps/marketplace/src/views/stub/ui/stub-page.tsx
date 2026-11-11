type StubPageProps = {
  title: string
  description: string
}

export function StubPage({ title, description }: StubPageProps) {
  return (
    <div className="flex flex-col gap-2 px-4 py-6 lg:px-6">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}
