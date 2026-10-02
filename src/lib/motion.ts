export const duration = {
  instant: 0.12,
  fast: 0.18,
  base: 0.32,
  slow: 0.52,
  cinematic: 0.8,
} as const;

export const ease = {
  out: [0.22, 1, 0, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const spring = {
  responsive: {
    type: "spring" as const,
    stiffness: 420,
    damping: 34,
    mass: 0.72,
  },
  soft: { type: "spring" as const, stiffness: 260, damping: 28, mass: 0.9 },
};
