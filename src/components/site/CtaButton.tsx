import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type LinkTo = ComponentProps<typeof Link>["to"];

export function CtaPrimary({ to, children }: { to: LinkTo; children: ReactNode }) {
  return (
    <Link to={to} className="btn-primary group">
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function CtaGhost({ to, children }: { to: LinkTo; children: ReactNode }) {
  return (
    <Link to={to} className="btn-secondary">
      {children}
    </Link>
  );
}
