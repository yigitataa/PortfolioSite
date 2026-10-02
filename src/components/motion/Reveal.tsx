import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { duration, ease } from "../../lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  once?: boolean;
  direction?: "up" | "down" | "none";
}

export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.15,
  once = true,
  direction = "up",
}: RevealProps) {
  const reduce = useReducedMotion();
  const y = direction === "none" ? 0 : direction === "up" ? 18 : -18;
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: reduce ? duration.instant : duration.slow,
        delay: reduce ? 0 : delay,
        ease: ease.out,
      }}
    >
      {children}
    </motion.div>
  );
}
