"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { shelfBooks } from "@/staticdata/shelf";
import { shelfMotionVariants } from "../motion-variants";
import { cn } from "@/lib/utils";


const Books = () => {
  return (
    <motion.section
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn("grid gap-4", "sm:grid-cols-2")}
    >
      <AnimatePresence mode="popLayout">
        {shelfBooks.map((book, index) => (
          <motion.article
            key={book.title}
            layout
            variants={shelfMotionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={index}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.995 }}
            transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
            className="h-full"
          >
            <Card
              className={cn(
                "group relative h-full overflow-hidden border border-neutral-200/60 bg-background/70 transition-colors",
                "hover:border-neutral-400 hover:bg-neutral-500/3",
                "dark:border-neutral-800 dark:hover:border-neutral-400/70"
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-black/20 via-black/10 to-black/0 blur-2xl transition-all",
                  "group-hover:-right-6 group-hover:-top-6 group-hover:blur-lg",
                  "dark:from-white/20 dark:via-white/10 dark:to-white/0"
                )}
              />
              <CardHeader className="relative">
                <CardTitle>{book.title}</CardTitle>
                <CardDescription
                  className={cn(
                    "text-xs uppercase tracking-wide text-neutral-500",
                    "dark:text-neutral-400"
                  )}
                >
                  {book.author}
                </CardDescription>
                <div className="mt-3 flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "rounded-full border border-neutral-200/80 bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600 transition-colors",
                        "group-hover:border-neutral-400/40 group-hover:bg-neutral-500/10 group-hover:text-neutral-500",
                        "dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-300",
                        "dark:group-hover:border-neutral-400/40 dark:group-hover:bg-neutral-500/10 dark:group-hover:text-neutral-300"
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p
                  className={cn(
                    "text-sm leading-6 text-neutral-600",
                    "dark:text-neutral-300"
                  )}
                >
                  {book.description}
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors",
                    "hover:text-blue-500",
                    "dark:text-blue-400 dark:hover:text-blue-300"
                  )}
                >
                  View on Amazon
                  <span aria-hidden className="text-base">↗</span>
                </Link>
              </CardFooter>
            </Card>
          </motion.article>
        ))}
      </AnimatePresence>
    </motion.section>
  );
};

export default Books;