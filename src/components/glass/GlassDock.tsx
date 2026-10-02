import type { ReactNode } from "react";
import { GlassSurface } from "./GlassSurface";

export function GlassDock({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <GlassSurface
      className="glass-dock"
      variant="strong"
      shape="pill"
      interactive
    >
      <nav aria-label={label}>{children}</nav>
    </GlassSurface>
  );
}
