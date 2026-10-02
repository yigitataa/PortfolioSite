import type { ReactNode } from "react";

export function GlassPill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent";
}) {
  return (
    <span className="glass-pill" data-tone={tone}>
      {children}
    </span>
  );
}
