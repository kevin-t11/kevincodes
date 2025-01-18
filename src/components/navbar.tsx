"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import ThemeToggle from "./ThemeToggle";
import AnimatedBackground from "./core/animate-background";
import Emoji from "./Emoji";

const navLinks = [
  { linkName: "Home", href: "/" },
  { linkName: "About", href: "/about" },
  { linkName: "Works", href: "/projects" },
  { linkName: "Timeline", href: "/timeline" },
  { linkName: "Guestbook", href: "/guestbook" },
  { linkName: "Shelf", href: "/shelf" },
];

const Navbar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() || "/";
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="w-full rounded-md py-2">
        <div className="flex justify-between items-center">
          <div className="h-10 w-10 justify-center rounded-lg bg-black dark:bg-white flex items-center">
            {mounted &&
              (theme === "dark" ? (
                <Image
                  className="rounded-lg"
                  src="/kevincodes-dark.png"
                  width={40}
                  height={40}
                  alt="Kevincodes"
                />
              ) : (
                <Image
                  className="rounded-lg"
                  src="/kevincodes-light.png"
                  width={48}
                  height={48}
                  alt="Kevincodes"
                />
              ))}
          </div>

          <div className="flex items-center justify-between gap-1">
            <a
              href="https://x.com/kevinnn_tw"
              target="_blank"
              className="text-blue-600 underline"
            >
              Hire Me
            </a>
            <Emoji />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="link-container z-50 sticky top-0 w-full flex items-end gap-1 flex-wrap bg-white dark:bg-black py-4">
        <AnimatedBackground
          defaultValue={pathname}
          className="rounded-md bg-zinc-300 dark:bg-zinc-700"
          transition={{
            ease: "easeInOut",
            duration: 0.4,
          }}
        >
          {navLinks.map(({ linkName, href }, index) => (
            <Link
              key={href}
              href={href}
              data-id={href}
              className={`inline-flex items-center justify-center text-center px-2 ${pathname === href ? "text-zinc-800 dark:text-zinc-50" : "text-zinc-500"
                }`}
            >
              {linkName}
            </Link>
          ))}
        </AnimatedBackground>
      </div>
    </>
  );
};

export default Navbar;
