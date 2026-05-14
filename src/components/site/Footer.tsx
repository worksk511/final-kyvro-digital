import { Link } from "@tanstack/react-router";
import { Mail, Instagram, Linkedin, Phone, MapPin } from "lucide-react";
import logo from "@/assets/kyvro-logo.png";

const INSTAGRAM_URL = "https://instagram.com/kyvrodigital";
const LINKEDIN_URL  = "https://linkedin.com/company/kyvrodigital";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Get a Quote" },
];

const serviceLinks = [
  { label: "Website-to-App Conversion", to: "/services" },
  { label: "Idea to Internet ✦", to: "/idea-to-internet" },
  { label: "Client Portals", to: "/services" },
  { label: "Website Design", to: "/services" },
  { label: "Business Automation", to: "/services" },
  { label: "Booking Systems", to: "/services" },
  { label: "Ongoing Support", to: "/services" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-surface">
      <div className="container-luxe pt-14 pb-8">
        <div className="grid gap-10 md:grid-cols-12">

          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5 text-base font-semibold text-foreground">
              <img src={logo} alt="Kyvro Digital" className="h-7 w-7 object-contain" />
              Kyvro Digital
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A boutique digital studio building premium websites, apps, client
              portals, and automation for modern businesses — worldwide.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a href="mailto:info@kyvrodigital.com" aria-label="Email"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:border-foreground hover:text-foreground">
                <Mail className="h-4 w-4" />
              </a>
              <a href={INSTAGRAM_URL} aria-label="Instagram" target="_blank" rel="noreferrer noopener"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:border-foreground hover:text-foreground">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={LINKEDIN_URL} aria-label="LinkedIn" target="_blank" rel="noreferrer noopener"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:border-foreground hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div className="md:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Navigate</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-foreground/70 transition-colors hover:text-foreground">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Services</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {serviceLinks.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.to}
                    className={`transition-colors hover:text-foreground ${
                      s.to === "/idea-to-internet"
                        ? "text-accent font-medium"
                        : "text-foreground/70"
                    }`}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Get in touch</p>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <a href="mailto:info@kyvrodigital.com"
                  className="text-sm text-foreground/80 hover:text-foreground hover:underline underline-offset-4">
                  info@kyvrodigital.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <a href="tel:+61493034590"
                  className="text-sm text-foreground/80 hover:text-foreground hover:underline underline-offset-4">
                  +61 493 034 590
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <span className="text-sm text-foreground/80">
                  Canberra, Australia<br />
                  <span className="text-muted-foreground">Serving clients worldwide</span>
                </span>
              </li>
            </ul>
            <div className="mt-7">
              <Link to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background transition-all hover:-translate-y-px">
                Get a Free Quote →
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Kyvro Digital. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Premium Digital Studio · Australia · Worldwide</p>
        </div>
      </div>
    </footer>
  );
}
