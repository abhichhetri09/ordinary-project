import { cn } from "../../utils/cn";
import { text } from "../../styles/colors";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <header className={cn("mb-6 space-y-1", className)}>
      <h1>{title}</h1>
      {subtitle && (
        <p className={cn("text-base", text.muted)}>{subtitle}</p>
      )}
    </header>
  );
}
