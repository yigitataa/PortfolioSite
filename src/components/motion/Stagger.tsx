import type { ReactNode } from "react";
import { Children } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { duration, ease } from "../../lib/motion";

export function Stagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={className}>
      {Children.map(children, (child, index) => (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: reduce ? duration.instant : duration.slow,
            delay: reduce ? 0 : index * 0.06,
            ease: ease.out,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
