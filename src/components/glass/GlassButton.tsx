import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Magnetic } from "../motion/Magnetic";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  children: ReactNode;
  magnetic?: boolean;
}

export function GlassButton({
  variant = "secondary",
  size = "md",
  magnetic = false,
  children,
  className = "",
  ...props
}: GlassButtonProps) {
  const button = (
    <button
      className={`glass-button glass-button--${variant} glass-button--${size} ${className}`}
      {...props}
    >
      <span className="glass-button__label">{children}</span>
    </button>
  );
  return magnetic ? <Magnetic>{button}</Magnetic> : button;
}
