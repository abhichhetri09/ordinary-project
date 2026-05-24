import { NavLink } from "react-router-dom";
import { appBrand, navItems } from "../../config/navigation";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";
import { bg, text } from "../../styles/colors";

export default function Navbar() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b-2 border-primary",
        bg.background,
      )}
    >
      <div className="mx-auto flex max-w-[1126px] items-center justify-between gap-8 px-8 py-5 text-left max-sm:gap-4 max-sm:px-5 max-sm:py-4">
        <NavLink
          to={appBrand.homePath}
          end
          className={cn(
            "text-2xl font-extrabold tracking-tight max-sm:text-xl",
            text.foreground,
            "hover:opacity-70",
          )}
        >
          {appBrand.name}
        </NavLink>

        <nav
          className="flex items-center gap-8 max-sm:gap-4"
          aria-label="Main navigation"
        >
          {navItems.map(({ to, label, end, variant }) => (
            <Button
              key={to}
              to={to}
              end={end}
              label={label}
              variant={variant === "cta" ? "navCta" : "nav"}
              size="sm"
            />
          ))}
        </nav>
      </div>
    </header>
  );
}
