import type { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  id,
  children,
  className = "",
  environment = "neutral",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  environment?: "neutral" | "cool" | "warm";
}) {
  return (
    <section
      id={id}
      className={`section ${className}`}
      data-environment={environment}
    >
      <Container>{children}</Container>
    </section>
  );
}
