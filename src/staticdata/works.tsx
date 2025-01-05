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
    title: "Full Stack Developer Intern",
    company: "Alois Solutions",
    period: "December 2024 - Janduary 2025",
    description: [
      "Worked in a cloud and Node.js environment, implementing backend services using AWS EventBridge and Lambda.",
      "Developed and integrated client APIs to interact with AWS services for seamless event-driven architecture.",
    ],
  },
  {
    id: 2,
    title: "Freelancer",
    company: "Freelancing",
    period: "September 2024 - Present",
    description: ["Developed responsive web applications using React and Next.js for clients, with backend services implemented using Node.js."]
  }
]