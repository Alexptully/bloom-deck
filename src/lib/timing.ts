export const ease = [0.22, 1, 0.36, 1] as const;
export const durations = { fast: 0.35, base: 0.6, slow: 1.1 } as const;
export const stagger = (index: number, gap = 0.12) => index * gap;
