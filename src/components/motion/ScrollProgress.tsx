import { motion, useScroll, useSpring } from "motion/react";
import { spring } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, spring.soft);
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="nav-progress"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
      aria-hidden="true"
    />
  );
}
