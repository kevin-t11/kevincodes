"use client";

import Link from "next/link";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { FiBox, FiExternalLink } from "react-icons/fi";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { shelfGear } from "@/staticdata/shelf";
import { cn } from "@/lib/utils";

const gearCardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 24,
    scale: 0.95,
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
    y: -18,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const MyGear = () => {
  return (
    <motion.section
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn("grid gap-4")}
    >
      <AnimatePresence mode="popLayout">
        {shelfGear.map((item, index) => (
          <motion.article
            key={item.name}
            layout
            variants={gearCardVariants}
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
                "hover:border-neutral-400 hover:bg-neutral-500/5",
                "dark:border-neutral-800 dark:hover:border-neutral-400"
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-neutral-400/20 via-neutral-300/15 to-neutral-200/10 blur-2xl transition-all",
                  "group-hover:-right-8 group-hover:-top-8 group-hover:blur-lg",
                  "dark:from-neutral-500/20 dark:via-neutral-400/15 dark:to-neutral-300/10"
                )}
              />
              <CardHeader className="relative flex flex-row items-start gap-3">
                <div
                  className={cn(
                    "mt-1 flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-500/10 text-neutral-700",
                    "dark:bg-neutral-600/20 dark:text-neutral-200"
                  )}
                >
                  <FiBox aria-hidden />
                </div>
                <div>
                  <CardTitle className="text-lg leading-snug">
                    {item.name}
                  </CardTitle>
                  <CardDescription
                    className={cn(
                      "text-xs uppercase tracking-wider text-neutral-500",
                      "dark:text-neutral-300"
                    )}
                  >
                    {item.category}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription
                  className={cn(
                    "text-sm leading-6 text-neutral-600",
                    "dark:text-neutral-300"
                  )}
                >
                  {item.description}
                </CardDescription>
              </CardContent>
              {item.link && (
                <div className="px-4 pb-4">
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-1 text-sm font-medium text-neutral-800 transition-colors",
                      "hover:text-neutral-600",
                      "dark:text-neutral-200 dark:hover:text-neutral-400"
                    )}
                  >
                    View item
                    <FiExternalLink aria-hidden />
                  </Link>
                </div>
              )}
            </Card>
          </motion.article>
        ))}
      </AnimatePresence>
    </motion.section>
  );
};

export default MyGear;