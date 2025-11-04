"use client";

import Link from "next/link";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { FiClock, FiExternalLink, FiFileText } from "react-icons/fi";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { shelfJournalEntries } from "@/staticdata/shelf";
import { cn } from "@/lib/utils";

const journalCardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.95,
    transition: {
      duration: 0.32,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const Journal = () => {
  const hasEntries = shelfJournalEntries.length > 0;
  return (
    <motion.section
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn("space-y-4")}
    >
      <AnimatePresence mode="popLayout">
        {hasEntries
          ? shelfJournalEntries.map((entry, index) => (
              <motion.article
                key={entry.slug}
                layout
                variants={journalCardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.995 }}
                transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
              >
                <Card
                  className={cn(
                    "group relative overflow-hidden border border-neutral-200/60 bg-background/70 transition-colors",
                    "hover:border-neutral-400 hover:bg-neutral-500/5",
                    "dark:border-neutral-800 dark:hover:border-neutral-400/40"
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-neutral-400/20 via-neutral-300/15 to-neutral-200/10 blur-2xl transition-all",
                      "group-hover:-right-8 group-hover:-top-8 group-hover:blur-lg",
                      "dark:from-neutral-500/20 dark:via-neutral-400/15 dark:to-neutral-300/10"
                    )}
                  />
                  <CardHeader className="relative pb-2">
                    <div
                      className={cn(
                        "flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-500",
                        "dark:text-neutral-300"
                      )}
                    >
                      <FiFileText aria-hidden />
                      {entry.publishedOn}
                    </div>
                    <CardTitle className="text-xl">
                      {entry.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription
                      className={cn(
                        "text-sm leading-6 text-neutral-600",
                        "dark:text-neutral-300"
                      )}
                    >
                      {entry.excerpt}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    {entry.url ? (
                      <Link
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-1 text-sm font-medium text-neutral-800 transition-colors",
                          "hover:text-neutral-600",
                          "dark:text-neutral-200 dark:hover:text-neutral-400"
                        )}
                      >
                        Read journal entry
                        <FiExternalLink aria-hidden />
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          "text-sm text-neutral-500",
                          "dark:text-neutral-400"
                        )}
                      >
                        Drafting in Notion – publishing soon.
                      </span>
                    )}
                  </CardFooter>
                </Card>
              </motion.article>
            ))
          : (
              <motion.article
                key="journal-placeholder"
                layout
                variants={journalCardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0}
                transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
              >
                <Card
                  className={cn(
                    "relative overflow-hidden border border-dashed border-neutral-300/60 bg-neutral-50/70 p-6 text-neutral-700",
                    "dark:border-neutral-600/30 dark:bg-neutral-900/40 dark:text-neutral-300"
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-gradient-to-br from-neutral-300/40 via-neutral-200/30 to-transparent blur-2xl",
                      "dark:from-neutral-700/20 dark:via-neutral-600/20 dark:to-transparent"
                    )}
                  />
                  <div className="relative flex flex-col gap-3">
                    <div
                      className={cn(
                        "inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-600 ring-1 ring-neutral-200/50",
                        "dark:bg-neutral-800/30 dark:text-neutral-200 dark:ring-neutral-700/30"
                      )}
                    >
                      <FiClock aria-hidden />
                      Coming soon
                    </div>
                    <CardTitle
                      className={cn(
                        "text-2xl text-neutral-800",
                        "dark:text-neutral-100"
                      )}
                    >
                      Journals are simmering 🧠
                    </CardTitle>
                    <CardDescription
                      className={cn(
                        "text-base text-neutral-600",
                        "dark:text-neutral-300"
                      )}
                    >
                      I&apos;m drafting long-form notes on process, indie hacking rituals, and motion design. Bookmark this space—new entries will drop here first.
                    </CardDescription>
                  </div>
                </Card>
              </motion.article>
            )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Journal;