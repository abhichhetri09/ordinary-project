import { cn } from "../../utils/cn";
import { bg } from "../../styles/colors";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "surface" | "primary10" | "background";
};

const toneClass = {
  surface: bg.surface,
  primary10: bg.primary10,
  background: bg.background,
} as const;

export function Card({
  children,
  className,
  tone = "primary10",
}: CardProps) {
  return (
    <div className={cn("rounded-2xl p-5", toneClass[tone], className)}>
      {children}
    </div>
  );
}
