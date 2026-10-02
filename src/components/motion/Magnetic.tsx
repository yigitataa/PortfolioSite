import type { ReactElement } from "react";
import { useRef } from "react";
import { animate } from "motion";
import { usePerformanceTier } from "../../hooks/usePerformanceTier";
import { spring } from "../../lib/motion";

export function Magnetic({ children }: { children: ReactElement }) {
  const ref = useRef<HTMLSpanElement>(null);
  const tier = usePerformanceTier();

  function move(event: React.PointerEvent<HTMLSpanElement>) {
    if (tier !== "high" || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function reset() {
    if (tier !== "high") {
      ref.current?.style.removeProperty("transform");
      return;
    }
    if (ref.current)
      animate(
        ref.current,
        { transform: "translate3d(0px, 0px, 0)" },
        spring.responsive,
      );
  }

  return (
    <span
      className="magnetic"
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </span>
  );
}
