// ═══════════════════════════════════════════
// Engine115 - Theme
// ═══════════════════════════════════════════

export const T = {
  bg: "#06080F",
  bgCard: "#0C1019",
  bgHover: "#111624",
  bgInput: "#0A0D16",
  border: "#151B2E",
  borderHover: "#1E2745",
  text: "#E4E8F1",
  muted: "#6B7799",
  dim: "#3D4668",
  accent: "#00E5CC",
  accentDim: "#00E5CC30",
  accentGlow: "#00E5CC15",
  blue: "#3B82F6",
  purple: "#8B5CF6",
  red: "#EF4444",
  green: "#22C55E",
  yellow: "#F59E0B",
  orange: "#F97316",
  pink: "#EC4899",
  grad: "linear-gradient(135deg, #00E5CC, #3B82F6)",
  gradPurple: "linear-gradient(135deg, #8B5CF615, #EC489915)",
} as const;

export const fonts = {
  mono: "'JetBrains Mono', 'SF Mono', monospace",
  sans: "'DM Sans', system-ui, sans-serif",
  googleFontsUrl:
    "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap",
} as const;

/** Generate a simple sparkline data array for prototyping */
export function generateSparkData(
  base: number,
  variance: number,
  length: number = 12
): number[] {
  return Array.from(
    { length },
    (_, i) =>
      base +
      Math.sin(i * 0.8) * variance +
      (Math.random() - 0.5) * variance * 0.6
  );
}
