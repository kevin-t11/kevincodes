import Image from "next/image";
import Wigglyline from "./Wigglyline";
import Techstack from "./Techstack";
import Socials from "./Socials";
import SelectedWorks from "./SelectedWorks";
import {
  MotionDiv,
  MotionHeader,
  childVariants,
  containerVariants,
} from "@/components/MotionDiv";
import MyLocation from "./MyLocation";
import Experience from "./Experience";
import MyWritings from "./MyWritings";

const Homepage = () => {
  return (
    <MotionDiv initial="hidden" animate="visible" variants={containerVariants}>
      <section className="w-full">
        <MotionHeader
          variants={childVariants}
          className="flex justify-between gap-3 items-center w-full"
        >
          <div className="profile justify-center flex items-center">
            <Image
              src="/profile_pic.png"
              height={120}
              width={120}
              className="rounded-full object-cover"
              alt="Kevin Thumbar profile picture"
            />
          </div>
          <div className="desc md:w-full   lg:w-full col-span-2">
            <div className="flex items-center gap-0.5">
              <h1 className="font-bold md:text-3xl text-2xl font-sans tracking-tight">
                <span className="text-blue-700 dark:text-blue-400">Kevin</span> Thumbar {" "}🎃
              </h1>
            </div>
            <ul className="list-inside">
              <li className="tracking-tight">
                <span className="font-semibold italic tracking-tight">
                  Developer & Indie Hacker
                </span>
              </li>
            </ul>
          </div>
        </MotionHeader>

        <MotionDiv variants={childVariants} className="mt-3">
          <ul className="list-inside space-y-1 tracking-tight">
            <li>
              {" "}
              <MyLocation />{" "}
            </li>
            <li>
              <span className="mr-2">🌍</span>Got a background in{" "}
              <span className="font-bold italic text-blue-700 dark:text-blue-400">Computer Science </span>{" "}
              and{" "}
              <span className="font-bold italic text-blue-700 dark:text-blue-400">
                Mathematics
              </span>
              .
            </li>
            <li>
              <span className="mr-2">⚛️</span>I&apos;m a developer and indie hacker building{" "}
              <span className="font-bold italic text-blue-700 dark:text-blue-400">AI agents</span>,{" "}
              <span className="font-bold italic text-blue-700 dark:text-blue-400">reverse engineering</span> systems,
              and orchestrating <span className="font-bold italic text-blue-700 dark:text-blue-400">frontier models</span>,
              with a strong eye for design and motion.
            </li>
            <li className="dark:text-slate-400 text-slate-600 italic">&quot; Escape competition through authenticity ✨&quot; {" "} - {" "} <span className="font-bold italic text-pink-600"> <a className="underline" href="https://x.com/naval" target="_blank">Naval</a></span>🤍!</li>
          </ul>
          <Wigglyline />
        </MotionDiv>
        <MotionDiv variants={childVariants} className="mt-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300">
            <span aria-hidden="true" className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 motion-safe:animate-ping dark:bg-green-400" />
              <span className="relative inline-flex size-2 rounded-full bg-green-600 dark:bg-green-400" />
            </span>
            Open to opportunities
          </div>
          <Socials />
        </MotionDiv>
        <MotionDiv variants={childVariants}>
          <Wigglyline />
          <Techstack />
          <Wigglyline />
        </MotionDiv>
        <MotionDiv variants={childVariants}>
          <h2 className="text-lg mb-2 font-bold">Experience 💼</h2>
          <Experience />
        </MotionDiv>
        <Wigglyline />
        <MotionDiv variants={childVariants}>
          <MyWritings />
        </MotionDiv>
        <Wigglyline />
        <h1 className="leading-5">
          That&apos;s all for now, folks. The site is still under construction,
          because perfection takes time. For any burning questions, brilliant
          feedback, or life-changing suggestions, feel free to slide into my DMs
          on{" "}
          <a
            href="https://x.com/kevinnn_tw"
            target="_blank"
            className="underline text-blue-700 dark:text-blue-400"
          >
            Twitter
          </a>{" "}
          or drop me an{" "}
          <a
            href="mailto:kevthummar178@gmail.com"
            className="underline text-blue-700 dark:text-blue-400"
          >
            email
          </a>
          . Thanks for stopping by 🤠!
        </h1>
      </section>
      <Wigglyline />
    </MotionDiv>
  );
};

export default Homepage;
