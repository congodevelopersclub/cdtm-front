export type MockTalent = {
  id: string
  name: string
  title: string
  location: string
  skills: string[]
  href: string
}

export type MockJob = {
  id: string
  title: string
  company: string
  location: string
  href: string
}

export type MockCourse = {
  id: string
  title: string
  provider: string
  href: string
}

export const MOCK_SEARCH_TALENTS: MockTalent[] = [
  {
    id: "talent-001",
    name: "Christian Siku",
    title: "Full Stack Developer",
    location: "Kinshasa, DRC",
    skills: ["React", "TypeScript", "Node.js", "Next.js"],
    href: "/profile",
  },
  {
    id: "talent-002",
    name: "Amina Kabila",
    title: "Product Designer",
    location: "Lubumbashi, DRC",
    skills: ["Figma", "UX Research", "Design Systems"],
    href: "/talents",
  },
  {
    id: "talent-003",
    name: "Jean-Pierre Mwamba",
    title: "Backend Engineer",
    location: "Goma, DRC",
    skills: ["Go", "PostgreSQL", "Docker", "AWS"],
    href: "/talents",
  },
  {
    id: "talent-004",
    name: "Grace Mutombo",
    title: "Mobile Developer",
    location: "Kinshasa, DRC",
    skills: ["React Native", "Flutter", "Firebase"],
    href: "/talents",
  },
]

export const MOCK_SEARCH_JOBS: MockJob[] = [
  {
    id: "job-001",
    title: "Senior Frontend Developer",
    company: "KinPay Solutions",
    location: "Kinshasa, DRC",
    href: "/jobs",
  },
  {
    id: "job-002",
    title: "Full Stack Engineer",
    company: "TechHub Africa",
    location: "Remote",
    href: "/jobs",
  },
  {
    id: "job-003",
    title: "DevOps Engineer",
    company: "Cloud Congo",
    location: "Lubumbashi, DRC",
    href: "/jobs",
  },
  {
    id: "job-004",
    title: "UI/UX Designer",
    company: "Digital Congo",
    location: "Kinshasa, DRC",
    href: "/jobs",
  },
  {
    id: "job-005",
    title: "React Native Developer",
    company: "AfriApps",
    location: "Remote",
    href: "/jobs",
  },
]

export const MOCK_SEARCH_COURSES: MockCourse[] = [
  {
    id: "course-001",
    title: "Modern React Patterns",
    provider: "CDC Academy",
    href: "/learn",
  },
  {
    id: "course-002",
    title: "TypeScript for Production",
    provider: "CDC Academy",
    href: "/learn",
  },
  {
    id: "course-003",
    title: "Full Stack Career Path",
    provider: "CDC Learning Paths",
    href: "/learn",
  },
]
