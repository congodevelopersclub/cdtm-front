import { ProjectsPage } from "@/pages/projects"
import { createPageMetadata } from "@/shared/lib/metadata"

export async function generateMetadata() {
  return createPageMetadata("projects")
}

export default function Page() {
  return <ProjectsPage />
}
