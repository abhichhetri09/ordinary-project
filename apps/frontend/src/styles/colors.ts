/**
 * Tailwind utility class names for common color patterns.
 * Usage: className={cn(bg.primary90, text.foreground)}
 */
export const bg = {
  primary: "bg-primary",
  primary10: "bg-primary-10",
  primary90: "bg-primary-90",
  secondary: "bg-secondary",
  background: "bg-background",
  surface: "bg-surface",
  accent: "bg-accent",
  accent10: "bg-accent-10",
  error: "bg-error",
  errorBg: "bg-error-bg",
} as const;

export const text = {
  primary: "text-primary",
  foreground: "text-foreground",
  muted: "text-muted",
  secondary: "text-secondary",
  accent: "text-accent",
  error: "text-error",
  onPrimary: "text-primary-foreground",
} as const;

export const border = {
  default: "border-border",
  primary: "border-primary",
  strong: "border-primary",
} as const;

/** @deprecated Prefer Tailwind classes from bg/text/border above */
export const colors = {
  bg: "var(--color-background)",
  surface: "var(--color-surface)",
  fg: "var(--color-foreground)",
  fgMuted: "var(--color-muted)",
  border: "var(--color-border)",
  borderStrong: "var(--color-primary)",
  accent: "var(--color-accent)",
  accentSubtle: "var(--color-accent-10)",
  inverseBg: "var(--color-primary)",
  inverseFg: "var(--color-primary-foreground)",
  error: "var(--color-error)",
  errorBg: "var(--color-error-bg)",
} as const;
