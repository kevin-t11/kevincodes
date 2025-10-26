type Job = {
  id: number
  title: string
  company: string
  location: string
  period: string
  description: string[]
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Founding Engineer",
    company: "Spero Institute",
    location: "Texas, USA (Remote)",
    period: "May 2025 - Present",
    description: [
      "Built the entire Spero Institute platform from the ground up — a full-stack mental health care system with scheduling, video conferencing, assessments (PHQ-9, GAD-7, PCL-5), clinical documentation, and real-time chat.",
      "Owned end-to-end development and architecture using Next.js, TypeScript, Prisma, PostgreSQL, and AWS (Lambda, S3, EC2, RDS) to deliver a scalable, seamless clinician-patient experience."
    ]
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "Strique AI",
    location: "Mumbai, India (On-site)",
    period: "Janduary 2025 - May 2025",
    description: [
      "Contributing to the development of AI-driven solutions and enhancing web applications for various clients."],
  },
  {
    id: 3,
    title: "Freelancer",
    company: "Freelancing",
    location: "Remote",
    period: "September 2024 - Present",
    description: ["Developed responsive web applications using React and Next.js for clients, with backend services implemented using Node.js."]
  }
]