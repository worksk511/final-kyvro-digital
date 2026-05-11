import { Link } from "@tanstack/react-router";
import { Mail, Instagram, Linkedin } from "lucide-react";
import logo from "@/assets/kyvro-logo.png";

const socials = [
  { href: "mailto:info@kyvrodigital.com", label: "Email", icon: Mail },
  { href: "https://instagram.com/", label: "Instagram", icon: Instagram },
  { href: "https://linkedin.com/", label: "LinkedIn", icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-background">
      <div className="container-luxe py-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 text-base font-semibold text-foreground">
              <img src={logo} alt="Kyvro Digital" className="h-7 w-7 object-contain" />
              Kyvro Digital
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Premium websites and digital systems for modern businesses.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-foreground hover:text-foreground"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/" className="text-foreground/80 hover:text-foreground">Home</Link></li>
              <li><Link to="/services" className="text-foreground/80 hover:text-foreground">Services</Link></li>
              <li><Link to="/pricing" className="text-foreground/80 hover:text-foreground">Pricing</Link></li>
              <li><Link to="/about" className="text-foreground/80 hover:text-foreground">About</Link></li>
              <li><Link to="/contact" className="text-foreground/80 hover:text-foreground">Get a Quote</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Contact
            </p>
            <a
              href="mailto:info@kyvrodigital.com"
              className="mt-4 block text-sm text-foreground hover:underline"
            >
              info@kyvrodigital.com
            </a>
            <p className="mt-3 text-sm text-muted-foreground">Available worldwide.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border/60 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kyvro Digital. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Premium digital studio</p>
        </div>
      </div>
    </footer>
  );
}
