import { cn } from "../../utils/cn";
import { border, text } from "../../styles/colors";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({
  label,
  error,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="flex w-full max-w-sm flex-col gap-1 text-left">
      {label && (
        <span className={cn("text-sm font-medium", text.foreground)}>
          {label}
        </span>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full rounded border px-3 py-2 outline-none transition-colors",
          border.default,
          "bg-background text-foreground placeholder:text-muted",
          "focus:border-primary",
          error && "border-error",
          className,
        )}
        {...props}
      />
      {error && <span className={cn("text-sm", text.error)}>{error}</span>}
    </label>
  );
}
