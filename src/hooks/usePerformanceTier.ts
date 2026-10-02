import { useMediaQuery } from "./useMediaQuery";
import { useReducedMotion } from "./useReducedMotion";

export type PerformanceTier = "low" | "standard" | "high";

export function usePerformanceTier(): PerformanceTier {
  const reduceMotion = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const wide = useMediaQuery("(min-width: 1024px)");
  if (reduceMotion || !finePointer) return "low";
  return wide ? "high" : "standard";
}
