import { cn } from "../../utils/cn";
import { text } from "../../styles/colors";

type SpinnerProps = {
  label?: string;
  className?: string;
};

export function Spinner({ label = "Loading...", className }: SpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12",
        className,
      )}
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
        aria-hidden
      />
      <p className={cn("text-sm", text.muted)}>{label}</p>
    </div>
  );
}
