import type { TalentProfile } from "./types"

export const MOCK_TALENT_PROFILE: TalentProfile = {
  id: "talent-001",
  name: "Christian Siku",
  email: "chrissiku5@gmail.com",
  title: "Full Stack Developer",
  avatar:
    "https://media.licdn.com/dms/image/v2/D4D03AQFgArQdG55T_g/profile-displayphoto-shrink_400_400/B4DZTqL5NKHYAk-/0/1739095774596?e=1786579200&v=beta&t=I97Jrd7doGW-vxMWLU9g929nX0UpZt5b3MrdxWQJFQU",
  location: "Kinshasa, DRC",
  experienceYears: 6,
  status: "looking_for_work",
  verified: true,
  bio: `I'm a full stack developer passionate about building scalable web applications that solve real problems for African markets. With experience across React, Node.js, and cloud infrastructure, I focus on clean architecture and user-centered design.

Before joining the CDC community, I led frontend development for a fintech startup in Kinshasa, where I shipped payment integrations used by thousands of users daily. I believe in continuous learning and sharing knowledge with fellow developers.

When I'm not coding, I mentor junior developers and contribute to open source projects focused on developer tooling and education.`,
  superpowerSkills: ["React", "TypeScript", "Node.js"],
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "Next.js",
    "PostgreSQL",
    "AWS",
    "Docker",
    "REST APIs",
    "GraphQL",
    "Tailwind CSS",
    "Figma",
    "Agile",
  ],
  projects: [
    {
      title: "CDC Marketplace Platform",
      description:
        "Built the talent marketplace frontend with role-based dashboards, i18n support, and a reusable design system.",
      year: "2026",
    },
    {
      title: "Mobile Money Integration SDK",
      description:
        "Developed a TypeScript SDK for integrating mobile payment providers across East and Central Africa.",
      year: "2025",
    },
    {
      title: "Developer Community Portal",
      description:
        "Created a community hub with event management, contributor profiles, and GitHub integration.",
      year: "2024",
    },
  ],
  experience: [
    {
      role: "Senior Full Stack Developer",
      company: "KinPay Solutions",
      period: "2022 — Present",
      description:
        "Lead development of payment platform features, mentor junior developers, and drive technical architecture decisions.",
    },
    {
      role: "Frontend Developer",
      company: "TechHub Africa",
      period: "2020 — 2022",
      description:
        "Built responsive web applications for clients across fintech and e-commerce sectors using React and Next.js.",
    },
    {
      role: "Junior Web Developer",
      company: "Digital Congo",
      period: "2018 — 2020",
      description:
        "Developed and maintained client websites, learned modern JavaScript frameworks, and contributed to internal tools.",
    },
  ],
  socialLinks: {
    website: "https://christiansiku.dev",
    twitter: "https://twitter.com/christiansiku",
    linkedin: "https://linkedin.com/in/christiansiku",
    github: "https://github.com/christiansiku",
  },
}
