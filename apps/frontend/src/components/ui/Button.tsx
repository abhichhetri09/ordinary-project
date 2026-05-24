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
};

const variantClass: Record<ButtonVariant, string> = {
  primary: cn(bg.primary, text.onPrimary, "hover:opacity-90"),
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
  "inline-flex items-center justify-center font-semibold transition-all duration-150";

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

  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonClasses(variant, size, className)}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
