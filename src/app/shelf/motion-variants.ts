import { Variants } from "framer-motion";

export const shelfMotionVariants: Variants = {
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