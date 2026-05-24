export type NavItem = {
  to: string;
  label: string;
  end?: boolean;
  variant?: "link" | "cta";
};

export const appBrand = {
  name: "Ordinary",
  homePath: "/",
} as const;

export const navItems: NavItem[] = [
  { to: "/", label: "Home", end: true, variant: "link" },
  { to: "/login", label: "Login", variant: "link" },
  { to: "/signup", label: "Sign up", variant: "cta" },
];
