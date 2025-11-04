export type ShelfBook = {
  title: string;
  author: string;
  description: string;
  link: string;
  tags: string[];
};

export type ShelfPlaylist = {
  title: string;
  description: string;
  curator: string;
  spotifyUrl: string;
  coverImage?: string;
};

export type ShelfResource = {
  title: string;
  description: string;
  url: string;
  category: "article" | "tool" | "video" | "newsletter" | "podcast";
};

export type ShelfJournalEntry = {
  title: string;
  publishedOn: string;
  excerpt: string;
  slug: string;
  url?: string;
};

export type ShelfGallery = {
  title: string;
  src: string;
  alt: string;
  description: string;
  location?: string;
  capturedOn?: string;
  linkLabel?: string;
  linkHref?: string;
  descriptionSuffix?: string;
};

export type ShelfGearItem = {
  name: string;
  category: string;
  description: string;
  link?: string;
};

export const shelfBooks: ShelfBook[] = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "A timeless parable about chasing personal legends, trusting intuition, and finding meaning in the journey itself.",
    link: "https://amzn.in/d/iLnZ16y",
    tags: ["fiction", "inspiration", "story"],
  },
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    description:
      "Curated wisdom from Naval on compounding, leverage, and designing a life that optimizes for freedom and happiness.",
    link: "https://amzn.in/d/hqwy9Lm",
    tags: ["wealth", "mindset", "naval"],
  },
  {
    title: "System Design Interview",
    author: "Alex Xu & Sahn Lam",
    description:
      "Step-by-step breakdowns for large-scale systems—deep dives, diagrams, and mental models that level up your architecture chops.",
    link: "https://amzn.in/d/0yXshXj",
    tags: ["system-design", "technical", "interview"],
  },
  {
    title: "The Founders",
    author: "Jimmy Soni",
    description:
      "Inside story of PayPal’s chaotic early days and the builders who shaped the Silicon Valley playbook we still copy today.",
    link: "https://amzn.in/d/1eZgP53",
    tags: ["startups", "history", "paypal"],
  },
];

export const shelfPlaylists: ShelfPlaylist[] = [
  {
    title: "KT's Playlist",
    description: "A playlist of songs that I like to listen to while coding and working out.",
    curator: "Kevin",
    spotifyUrl: "https://open.spotify.com/playlist/6JFlbGEr0VTGkfMwdpTWRy?si=_PC_69Y9TIGGyIl0iKGl2Q",
    coverImage: "/playlist_1.jpg",
  },
];

export const shelfResources: ShelfResource[] = [];

export const shelfJournalEntries: ShelfJournalEntry[] = [];

export const shelfGallery: ShelfGallery[] = [
  {
    title: "OnlyDevs Early Check-In",
    src: "/onlydevs_2.jpeg",
    alt: "Developers settling into the OnlyDevs Solana builder gathering with laptops open",
    description:
      "Kickoff energy at OnlyDevs—the one-day Solana builder gathering packed with talks from CTOs, founding engineers, and teams tackling gnarly protocol challenges, plus endless chai-fueled chats.",
    location: "OnlyDevs, Mumbai, India",
    capturedOn: "April 2025",
  },
  {
    title: "Selfie with Harkirat Singh",
    src: "/onlydevs_1.jpeg",
    alt: "Smiling selfie with Harkirat Singh during the OnlyDevs meetup",
    description: "Caught a quick hallway selfie with",
    linkLabel: "Harkirat Singh",
    linkHref: "https://x.com/kirat_tw",
    descriptionSuffix:
      " while unpacking job market signals, continuous learning paths, and the Solana/Web3 jargon shaping how teams pitch their tech.",
    location: "OnlyDevs, Mumbai, India",
    capturedOn: "April 2025",
  },
  {
    title: "Graduation Day",
    src: "/graduation_2025.jpeg",
    alt: "Graduation ceremony at Dharamsinh Desai University on May 9, 2025",
    description:
      "Convocation highs at Dharamsinh Desai University—May 9, 2025 will always feel like the day the next chapter officially started.",
    location: "Dharamsinh Desai University, Nadiad, India",
    capturedOn: "May 9, 2025",
  },
  {
    title: "Mahakal Lok Light Show",
    src: "/ujjain_temple.jpeg",
    alt: "Laser beams and illuminated pillars during the Mahakal Lok night show in Ujjain",
    description:
      "25-minute laser, light, and sound immersion at Mahakal Lok—retelling Ujjain's history against a corridor glowing with temples and murals.",
    location: "Mahakal Lok, Ujjain, Madhya Pradesh, India",
    capturedOn: "October 2025",
  },
];

export const shelfGear: ShelfGearItem[] = [
  {
    name: "MacBook Air (13\" M4, Sky Blue)",
    category: "Laptop",
    description:
      "Ultra portable powerhouse with the Apple M4 chip, Liquid Retina display, and battery that easily clears a full day of coding and editing on the go.",
    link: "https://amzn.in/d/5iHqrQw",
  },
  {
    name: "Wacom Pen Tablet",
    category: "Design",
    description:
      "Compact drawing tablet paired with a pressure-sensitive pen—perfect for wireframes, motion storyboards, and quick sketch iterations.",
    link: "https://amzn.in/d/42duXfq",
  },
];


