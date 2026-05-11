import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/kyvro-logo.png";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-luxe flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[0.95rem] font-semibold tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          <img src={logo} alt="Kyvro Digital" className="h-7 w-7 object-contain" />
          Kyvro Digital
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact" className="btn-primary !py-2 !px-4 !text-sm">
            Get a Quote
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-foreground"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="container-luxe flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-muted-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3 !text-sm"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
