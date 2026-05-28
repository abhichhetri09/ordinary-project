import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";
import { bg, text } from "../../styles/colors";

type ButtonVariant = "primary" | "secondary" | "ghost" | "nav" | "navCta";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  label: string;
  to?: string;
  end?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: cn(
    bg.primary,
    text.onPrimary,
    "hover:bg-primary-10 p-2 rounded-md text-sm animate-pulse transition-all duration-1000  hover:text-white",
  ),
  secondary: cn(
    "border-2 border-primary bg-transparent",
    text.primary,
    "hover:bg-primary-10",
  ),
  ghost: cn(text.muted, "hover:bg-primary-10 hover:text-foreground"),
  nav: cn(
    text.muted,
    "uppercase tracking-wide border-b-2 border-transparent",
    "hover:text-foreground",
  ),
  navCta: cn(
    bg.primary,
    text.onPrimary,
    "uppercase tracking-wide border-2 border-primary",
    "hover:bg-transparent hover:text-foreground",
  ),
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60";

function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
  active?: boolean,
) {
  if (variant === "nav") {
    return cn(
      baseClass,
      sizeClass[size],
      "uppercase tracking-wide border-b-2",
      active
        ? "border-foreground text-foreground"
        : cn(text.muted, "border-transparent hover:text-foreground"),
      className,
    );
  }

  if (variant === "navCta") {
    return cn(
      baseClass,
      sizeClass[size],
      "uppercase tracking-wide border-2 border-primary",
      active
        ? cn("bg-transparent", text.foreground, "hover:bg-primary-10")
        : cn(
            bg.primary,
            text.onPrimary,
            "hover:bg-transparent hover:text-foreground",
          ),
      className,
    );
  }

  return cn(baseClass, variantClass[variant], sizeClass[size], className);
}

function ButtonSpinner() {
  return (
    <span
      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden
    />
  );
}

export function Button({
  label,
  to,
  end,
  type = "button",
  variant = "primary",
  size = "md",
  disabled,
  className,
  onClick,
  loading = false,
}: ButtonProps) {
  if (to) {
    return (
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          buttonClasses(variant, size, className, isActive)
        }
      >
        {label}
      </NavLink>
    );
  }

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={buttonClasses(variant, size, className)}
      onClick={onClick}
      aria-busy={loading}
    >
      {loading && <ButtonSpinner />}
      <span>{label}</span>
    </button>
  );
}
