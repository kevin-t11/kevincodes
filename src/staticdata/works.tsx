type Job = {
  id: number
  title: string
  company: string
  location: string
  period: string
  link: string
  description: string[]
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Founding Engineer",
    company: "Nura Labs",
    location: "SF, USA (Remote)",
    period: "December 2025 - Present",
    link: "https://nura.construction",
    description: [
      "Building the intelligence layer for real estate by designing and implementing specialized AI models focused on streamlining real estate development decisions, predictive analytics, and process automation."
    ],
  },
  {
    id: 2,
    title: "Founding Engineer",
    company: "Spero Institute",
    location: "Texas, USA (Remote)",
    period: "May 2025 - October 2025",
    link: "https://speroinstitute.com",
    description: [
      "Built the entire Spero Institute platform from the ground up — a full-stack mental health care system with scheduling, video conferencing, assessments (PHQ-9, GAD-7, PCL-5), clinical documentation, and real-time chat.",
      "Owned end-to-end development and architecture using Next.js, TypeScript, Prisma, PostgreSQL, and AWS (Lambda, S3, EC2, RDS) to deliver a scalable, seamless clinician-patient experience."
    ]
  },
  {
    id: 3,
    title: "Software Engineer",
    company: "Strique AI",
    location: "Mumbai, India (On-site)",
    period: "Janduary 2025 - May 2025",
    link: "https://strique.io",
    description: [
      "Contributing to the development of AI-driven solutions and enhancing web applications for various clients."],
  },
  {
    id: 4,
    title: "Freelancer",
    company: "Freelancing",
    location: "Remote",
    period: "September 2024 - Present",
    link: "#",
    description: ["Developed responsive web applications using React and Next.js for clients, with backend services implemented using Node.js."]
  }
]