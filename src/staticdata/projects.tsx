interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  linkURL?: string;
  githubURL: string;
  status: "building" | "running" | "discontinued";
  skills: string[];
}

const projects: Project[] = [
  {
    id: 2,
    image: "/backpack_exchange.jpeg",
    title: "Backpack Exchange",
    description:
      "A trading platform that allows users to buy and sell stocks and cryptocurrencies.",
    githubURL: "https://github.com/kevin-t11/backpack-exchange",
    skills: ["Next JS", "TypeScript", "Tailwind", "ShadCn", "Node JS", "PostgreSQL", "Prisma", "Redis", "TimescaleDB", "WebScokets", "Pub/Sub(s)"],
    status: "running",
  },
  {
    id: 2,
    image: "/jolt_connect.png",
    title: "Jolt Connect",
    description:
      "Jolt Connect integrates Google services (Drive, Gmail, Sheets) for seamless automation of repetitive tasks and includes GitHub comment integration to automate workflows based on GitHub activity.",
    githubURL: "https://github.com/kevin-t11/jolt-connect",
    skills: ["Next JS", "TypeScript", "Tailwind", "ShadCn", "Nextauth", "Node JS", "PostgreSQL", "Prisma", "Apacke Kafka", "Docker", "Turborepo", "Webhooks"],
    status: "building",
  },
  {
    id: 3,
    image: "/secure_purse.png",
    title: "Secure Purse",
    description:
      "SecurePurse is a web application for securely managing cryptocurrency wallets, allowing users to generate new wallets or import existing ones using a recovery phrase.",
    githubURL: "https://github.com/kevin-t11/web-based-wallet",
    skills: ["Next JS", "TypeScript", "Tailwind", "ShadCn", "Web3.js", "Ethers"],
    linkURL: "https://securepurse.vercel.app/",
    status: "running",
  },
  {
    id: 4,
    image: "/netflix_gpt.webp",
    title: "Netflix GPT",
    description:"NETFLIX-GPT is an AI-driven app that enhances the Netflix experience using Groq AI to deliver personalized content recommendations.",
    githubURL: "https://github.com/kevin-t11/netflix-gpt",
    skills: ["React Js", "JavaScript", "Tailwind", "Redux", "Groq AI", "GPT-3"],
    linkURL: "https://neuralflix.vercel.app/",
    status: "running",
  },
  {
    id: 5,
    image: "/uphire.png",
    title: "VMS UpHire",
    description:
      "VMS UpHire is a web application for managing the recruitment process, allowing users to create job postings, manage applicants, and schedule interviews.",
    githubURL: "https://github.com/kevin-t11/Recruiting-Management",
    skills: ["React Js", "JavaScript", "Tailwind", "Redux", "Node JS", "Express", "MongoDB"],
    linkURL: "https://app.uphire.in/",
    status: "running",
  },
];

export default projects;
