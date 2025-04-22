type Job = {
  id: number
  title: string
  company: string
  period: string
  description: string[]
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Strique AI",
    period: "Janduary 2025 - Present",
    description: [
      "Contributing to the development of AI-driven solutions and enhancing web applications for various clients."],
  },
  {
    id: 2,
    title: "Freelancer",
    company: "Freelancing",
    period: "September 2024 - Present",
    description: ["Developed responsive web applications using React and Next.js for clients, with backend services implemented using Node.js."]
  }
]