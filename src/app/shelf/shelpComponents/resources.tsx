"use client";

import Link from "next/link";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { FiClock, FiExternalLink } from "react-icons/fi";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ShelfResource } from "@/staticdata/shelf";
import { shelfResources } from "@/staticdata/shelf";
import { cn } from "@/lib/utils";

const CATEGORY_META: Record<
  ShelfResource["category"],
  { label: string; badgeClass: string }
> = {
  article: {
    label: "Article / Thread",
    badgeClass:
      "bg-emerald-500/10 text-emerald-600 ring-1 ring-inset ring-emerald-500/30 dark:text-emerald-300",
  },
  tool: {
    label: "Tool",
    badgeClass:
      "bg-blue-500/10 text-blue-600 ring-1 ring-inset ring-blue-500/30 dark:text-blue-300",
  },
  video: {
    label: "Video",
    badgeClass:
      "bg-violet-500/10 text-violet-600 ring-1 ring-inset ring-violet-500/30 dark:text-violet-300",
  },
  newsletter: {
    label: "Newsletter / Community",
    badgeClass:
      "bg-amber-500/10 text-amber-600 ring-1 ring-inset ring-amber-500/30 dark:text-amber-300",
  },
  podcast: {
    label: "Podcast",
    badgeClass:
      "bg-rose-500/10 text-rose-600 ring-1 ring-inset ring-rose-500/30 dark:text-rose-300",
  },
};

const resourceCardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 28,
    scale: 0.95,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: index * 0.07,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.97,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const Resources = () => {
  const hasResources = shelfResources.length > 0;
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
        {hasResources
          ? shelfResources.map((resource, index) => {
              const meta = CATEGORY_META[resource.category];
              return (
                <motion.article
                  key={resource.title}
                  layout
                  variants={resourceCardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={index}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.995 }}
                  transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
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
                    <CardHeader className="relative gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-2">
                        <div
                          className={cn(
                            "w-fit rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
                            meta.badgeClass
                          )}
                        >
                          {meta.label}
                        </div>
                        <CardTitle className="text-xl leading-tight">
                          {resource.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="relative">
                      <CardDescription
                        className={cn(
                          "text-sm leading-6 text-neutral-600",
                          "dark:text-neutral-300"
                        )}
                      >
                        {resource.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-1 text-sm font-medium text-neutral-800 transition-colors",
                          "hover:text-neutral-600",
                          "dark:text-neutral-200 dark:hover:text-neutral-400"
                        )}
                      >
                        Open resource
                        <FiExternalLink aria-hidden />
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.article>
              );
            })
          : (
              <motion.article
                key="resources-placeholder"
                layout
                variants={resourceCardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0}
                transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
              >
                <Card
                  className={cn(
                    "relative overflow-hidden border border-dashed border-neutral-300/60 bg-neutral-50/70 p-6 text-neutral-700",
                    "dark:border-neutral-600/30 dark:bg-neutral-900/40 dark:text-neutral-300"
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br from-neutral-300/40 via-neutral-200/30 to-transparent blur-2xl",
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
                      Curating now
                    </div>
                    <CardTitle
                      className={cn(
                        "text-2xl text-neutral-800",
                        "dark:text-neutral-100"
                      )}
                    >
                      Resource library in the oven 🍳
                    </CardTitle>
                    <CardDescription
                      className={cn(
                        "text-base text-neutral-600",
                        "dark:text-neutral-300"
                      )}
                    >
                      I&apos;m cataloging favorite reads, tools, and playlists. Drop back soon to explore the full stack of inspirations powering my builds.
                    </CardDescription>
                  </div>
                </Card>
              </motion.article>
            )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Resources;