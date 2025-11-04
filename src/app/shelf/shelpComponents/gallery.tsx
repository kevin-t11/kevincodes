"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { shelfGallery } from "@/staticdata/shelf";
import { cn } from "@/lib/utils";
import { shelfMotionVariants } from "../motion-variants";

const Gallery = () => {
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
        {shelfGallery.map((photo, index) => (
          <motion.article
            key={photo.title}
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
                "hover:border-neutral-400 hover:bg-neutral-500/5",
                "dark:border-neutral-800 dark:hover:border-neutral-400/70"
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-neutral-400/20 via-neutral-300/15 to-neutral-200/10 blur-2xl transition-all",
                  "group-hover:-right-8 group-hover:-top-8 group-hover:blur-lg",
                  "dark:from-neutral-500/20 dark:via-neutral-400/15 dark:to-neutral-300/10"
                )}
              />
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index === 0}
                />
              </div>
              <CardHeader className="relative space-y-2">
                <CardTitle className="text-lg leading-tight">
                  {photo.title}
                </CardTitle>
                {(photo.location || photo.capturedOn) && (
                  <div
                    className={cn(
                      "flex flex-wrap items-center gap-x-2 text-xs uppercase tracking-wider text-neutral-500",
                      "dark:text-neutral-300"
                    )}
                  >
                    {photo.location && <span>{photo.location}</span>}
                    {photo.location && photo.capturedOn && <span>•</span>}
                    {photo.capturedOn && <span>{photo.capturedOn}</span>}
                  </div>
                )}
              </CardHeader>
              <CardContent className="relative">
                <CardDescription
                  className={cn(
                    "text-sm text-neutral-600",
                    "dark:text-neutral-300"
                  )}
                >
                  <span>{photo.description}</span>
                  {photo.linkLabel && photo.linkHref ? (
                    <>
                      {" "}
                      <Link
                        href={photo.linkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "text-neutral-900 underline underline-offset-4 transition-colors",
                          "hover:text-neutral-600",
                          "dark:text-neutral-100 dark:hover:text-neutral-300"
                        )}
                      >
                        {photo.linkLabel}
                      </Link>
                      {photo.descriptionSuffix && (
                        <span>{photo.descriptionSuffix}</span>
                      )}
                    </>
                  ) : null}
                  {!photo.linkLabel && photo.descriptionSuffix ? (
                    <span>{photo.descriptionSuffix}</span>
                  ) : null}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.article>
        ))}
      </AnimatePresence>
    </motion.section>
  );
};

export default Gallery;