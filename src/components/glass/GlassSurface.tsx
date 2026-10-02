import type { HTMLAttributes, PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import { usePerformanceTier } from "../../hooks/usePerformanceTier";

export type GlassVariant = "regular" | "clear" | "strong";
export type GlassShape = "rounded" | "pill";

export interface GlassSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant;
  shape?: GlassShape;
  interactive?: boolean;
  tint?: "neutral" | "accent";
  children: ReactNode;
}

export function GlassSurface({
  variant = "regular",
  shape = "rounded",
  interactive = false,
  tint = "neutral",
  children,
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...props
}: GlassSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tier = usePerformanceTier();
  const enabled = interactive && tier === "high";

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (enabled && ref.current) {
      const bounds = ref.current.getBoundingClientRect();
      ref.current.style.setProperty(
        "--pointer-x",
        `${event.clientX - bounds.left}px`,
      );
      ref.current.style.setProperty(
        "--pointer-y",
        `${event.clientY - bounds.top}px`,
      );
    }
    onPointerMove?.(event);
  }

  function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
    ref.current?.style.removeProperty("--pointer-x");
    ref.current?.style.removeProperty("--pointer-y");
    onPointerLeave?.(event);
  }

  return (
    <div
      ref={ref}
      className={`glass glass--${variant} glass--${shape} ${interactive ? "glass--interactive" : ""} ${className}`}
      data-tint={tint}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
      style={style}
    >
      {children}
    </div>
  );
}
