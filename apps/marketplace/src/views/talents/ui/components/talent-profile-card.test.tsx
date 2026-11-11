import { describe, expect, it } from "vitest"

import { TalentProfileCard } from "./talent-profile-card"
import { renderWithProviders, screen } from "@/test/render"

import type { TalentProfile } from "@/entities/talent"

const profile: TalentProfile = {
  id: "profile-1",
  name: "Demo Talent",
  email: "demo@example.com",
  title: "Full Stack Developer",
  location: "Kinshasa, DRC",
  experienceYears: 4,
  status: "open_to_opportunities",
  verified: true,
  bio: "",
  superpowerSkills: ["React"],
  skills: ["React", "Node.js", "TypeScript", "Next.js", "PostgreSQL"],
  projects: [],
  experience: [],
  socialLinks: {},
  showAvailabilityBadge: false,
}

describe("TalentProfileCard", () => {
  it("renders a card link to the talent profile", () => {
    renderWithProviders(<TalentProfileCard profile={profile} />)

    expect(screen.getByText("Demo Talent")).toBeInTheDocument()

    const link = screen.getByRole("link", { name: /view profile for demo talent/i })
    expect(link).toHaveAttribute("href", "/talents/profile-1")
  })

  it("truncates long title and name with tooltip content", () => {
    renderWithProviders(
      <TalentProfileCard
        profile={{
          ...profile,
          title: "Senior Full Stack Developer with Cloud Architecture Experience",
          name: "Demo Talent With A Very Long Name That Should Truncate",
        }}
      />
    )

    expect(
      screen.getByText("Senior Full Stack Developer with Cloud Architecture Experience")
    ).toBeInTheDocument()
    expect(
      screen.getByText("Demo Talent With A Very Long Name That Should Truncate")
    ).toBeInTheDocument()
  })

  it("displays primary category with tooltip for additional categories", () => {
    renderWithProviders(
      <TalentProfileCard
        profile={{
          ...profile,
          categories: ["frontend", "fullstack", "devops"],
        }}
      />
    )

    expect(screen.getByText("Frontend")).toBeInTheDocument()
  })

  it("shows capped overflow badge with hidden skills tooltip label", () => {
    renderWithProviders(
      <TalentProfileCard
        profile={{
          ...profile,
          skills: [
            "React",
            "Node.js",
            "TypeScript",
            "Next.js",
            "PostgreSQL",
            "AWS",
            "Docker",
            "GraphQL",
            "Tailwind CSS",
            "Figma",
            "Agile",
            "Redis",
            "Kubernetes",
          ],
        }}
      />
    )

    expect(screen.getByText("+9")).toBeInTheDocument()
    expect(screen.getByLabelText(/more skills:/i)).toBeInTheDocument()
  })
})
