import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/site/Section";
import { CtaPrimary } from "@/components/site/CtaButton";
import { services } from "@/lib/content";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Kyvro Digital" },
      {
        name: "description",
        content:
          "Premium websites, website-to-app conversion, client portals, booking systems, business automation, branding and ongoing support — everything your business needs online.",
      },
      { property: "og:title", content: "Services — Kyvro Digital" },
      {
        property: "og:description",
        content:
          "A complete suite of premium digital services — websites, app conversion, portals, automation and more. Built for modern businesses worldwide.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <Section className="pt-16 md:pt-20">
        <div className="max-w-3xl">
          <Eyebrow>Services</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Everything your business needs online — in one place.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            From your first website to a full digital system — we build, automate,
            and support everything so you can focus on running your business.
          </p>
        </div>
      </Section>

      {/* SERVICE LIST */}
      <div className="border-t border-border/60">
        {services.map((s, i) => {
          // Idea to Internet gets a special callout card instead of inline display
          if (s.slug === "idea-to-internet") {
            return (
              <section key={s.slug} className="border-b border-border/60 bg-surface">
                <div className="container-luxe py-16 md:py-20">
                  <div className="grid gap-10 md:grid-cols-12 md:gap-14 md:items-center">
                    <div className="md:col-span-7">
                      <div className="flex items-center gap-3 mb-3">
                        <p className="text-xs font-medium text-muted-foreground">
                          {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                        </p>
                        <span className="inline-block rounded-full bg-accent/10 border border-accent/20 px-2.5 py-0.5 text-[10px] font-semibold text-accent">
                          ✦ New
                        </span>
                      </div>
                      <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                        {s.title}
                      </h2>
                      <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        {s.short}
                      </p>
                      <div className="mt-6 rounded-lg border border-border bg-card p-5">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Best for
                        </p>
                        <p className="mt-2 text-sm text-foreground">{s.bestFor}</p>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          to="/idea-to-internet"
                          className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:-translate-y-px"
                        >
                          See how it works
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-foreground/40"
                        >
                          Book free Idea Audit
                        </Link>
                      </div>
                    </div>
                    <div className="md:col-span-5">
                      <div className="rounded-xl border border-accent/20 bg-accent/5 p-6">
                        <p className="text-xs font-medium uppercase tracking-wider text-accent mb-4">
                          What's included
                        </p>
                        <ul className="space-y-3">
                          {s.inclusions.map((inc) => (
                            <li key={inc} className="flex items-start gap-3 text-sm text-foreground">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 pt-4 border-t border-accent/20">
                          <p className="text-xs text-muted-foreground">
                            ✦ Every launch includes a <span className="font-medium text-foreground">Digital Birth Certificate</span> — a branded record of your idea and launch date.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          // All other services render normally
          return (
            <section
              key={s.slug}
              className={`border-b border-border/60 ${i % 2 === 1 ? "bg-surface" : ""}`}
            >
              <div className="container-luxe py-16 md:py-20">
                <div className="grid gap-10 md:grid-cols-12 md:gap-14">
                  {/* Left — title & description */}
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-3 mb-3">
                      <p className="text-xs font-medium text-muted-foreground">
                        {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                      </p>
                      {"badge" in s && s.badge && s.badge !== "✦ New" && (
                        <span className="inline-block rounded-full bg-foreground px-2.5 py-0.5 text-[10px] font-medium text-background">
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                      {s.title}
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                      {s.short}
                    </p>
                    <div className="mt-6 rounded-lg border border-border bg-card p-5">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Best for
                      </p>
                      <p className="mt-2 text-sm text-foreground">{s.bestFor}</p>
                    </div>
                    <div className="mt-6">
                      <CtaPrimary to="/contact">Get a Quote</CtaPrimary>
                    </div>
                  </div>

                  {/* Right — inclusions */}
                  <div className="md:col-span-7">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      What's included
                    </p>
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {s.inclusions.map((inc) => (
                        <li
                          key={inc}
                          className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-sm text-foreground"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* BOTTOM CTA */}
      <section className="bg-foreground">
        <div className="container-luxe py-16 md:py-20 text-center">
          <span className="inline-block rounded-full border border-background/20 px-3 py-1 text-xs font-medium text-background/50 mb-5 tracking-widest uppercase">
            Get started
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-background md:text-4xl">
            Not sure which service you need?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-background/70">
            Tell us about your business and we'll recommend the right starting point — no commitment needed.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-all hover:-translate-y-px"
            >
              Get a Free Consultation
            </a>
            <Link
              to="/idea-to-internet"
              className="inline-flex items-center gap-2 rounded-full border border-background/20 px-6 py-3 text-sm font-medium text-background transition-all hover:border-background/40"
            >
              Got an idea? Start here ✦
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
