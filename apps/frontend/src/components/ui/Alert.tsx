import { cn } from "../../utils/cn";
import { bg, text } from "../../styles/colors";

type AlertVariant = "error" | "success" | "info";

type AlertProps = {
  message: string;
  variant?: AlertVariant;
  className?: string;
};

const variantClass: Record<AlertVariant, string> = {
  error: cn(bg.errorBg, text.error, "border-error/30"),
  success: cn("bg-accent-10 text-accent border-accent/30"),
  info: cn(bg.primary10, text.foreground, "border-primary/20"),
};

export function Alert({
  message,
  variant = "error",
  className,
}: AlertProps) {
  return (
    <p
      role="alert"
      className={cn(
        "rounded border px-3 py-2 text-sm",
        variantClass[variant],
        className,
      )}
    >
      {message}
    </p>
  );
}
