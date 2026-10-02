import type { ReactNode } from "react";
import { GlassSurface } from "./GlassSurface";

export function GlassPopover({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  return (
    <GlassSurface id={id} className="glass-popover" variant="strong">
      {children}
    </GlassSurface>
  );
}
