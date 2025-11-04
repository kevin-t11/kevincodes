"use client"

import { motion } from "framer-motion"

interface AudioEqualizerProps {
  isPlaying: boolean
  barCount?: number
  className?: string
}

export function AudioEqualizer({ isPlaying, barCount = 4, className = "" }: AudioEqualizerProps) {
  return (
    <div className={`flex items-end gap-1 ${className}`}>
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-neutral-900 dark:bg-neutral-100"
          initial={{ height: 4 }}
          animate={
            isPlaying
              ? {
                  height: [4, 16, 8, 20, 4],
                  transition: {
                    duration: 1.2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  },
                }
              : { height: 4 }
          }
        />
      ))}
    </div>
  )
}
