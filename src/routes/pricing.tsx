import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/site/Section";
import { CtaPrimary } from "@/components/site/CtaButton";
import { pricing } from "@/lib/content";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Kyvro Digital" },
      {
        name: "description",
        content:
          "Transparent starting prices for websites, app conversion, client portals, automation and ongoing support from Kyvro Digital. Starter from AUD $499.",
      },
      { property: "og:title", content: "Pricing — Kyvro Digital" },
      {
        property: "og:description",
        content:
          "Clear, transparent pricing for premium websites, app conversion, portals and automation. Starting from AUD $499.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

const faqs = [
  {
    q: "Do I need to know anything about tech or websites?",
    a: "Not at all. We handle everything from design to build to launch. You just tell us what your business needs and we take care of the rest in plain language.",
  },
  {
    q: "How long does a project take?",
    a: "Starter projects are typically delivered in 5–7 days. Growth projects take 10–14 days. Premium projects are scoped individually but usually 2–4 weeks.",
  },
  {
    q: "Can I pay in instalments?",
    a: "Yes. We typically work with a 50% deposit upfront and the remaining 50% on completion. We can discuss payment arrangements for larger projects.",
  },
  {
    q: "What if I need changes after launch?",
    a: "Every project includes a revision round before final delivery. For ongoing changes, our Monthly Support plan keeps your site updated every month.",
  },
  {
    q: "Do the prices include content and copywriting?",
    a: "Our quotes are based on you providing your business content (text, images, logo). We can refine your copy and provide guidance — full copywriting is available as an add-on.",
  },
  {
    q: "Can I start with Starter and upgrade later?",
    a: "Absolutely. Many clients start with a Starter website and then add booking systems, automation, or upgrade to a full portal as their business grows.",
  },
];

function PricingPage() {
  return (
    <>
      {/* HERO */}
      <Section className="pt-16 md:pt-20">
        <div className="max-w-3xl">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Simple, transparent pricing.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Every project starts with a conversation. These are your starting points —
            we tailor every quote to your exact business needs.
          </p>
        </div>
      </Section>

      {/* PRICING CARDS */}
      <Section className="pt-0">
        <div className="grid gap-5 md:grid-cols-2">
          {pricing.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-2xl border p-8 md:p-10 ${
                p.featured
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className={`text-xl font-semibold tracking-tight ${p.featured ? "text-background" : "text-foreground"}`}>
                  {p.name}
                </h2>
                {p.featured && (
                  <span className="rounded-full bg-background/15 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-background">
                    Most popular
                  </span>
                )}
              </div>

              <p className={`mt-3 text-sm leading-relaxed ${p.featured ? "text-background/70" : "text-muted-foreground"}`}>
                {p.description}
              </p>

              <div className="mt-7 flex items-baseline gap-2">
                <span className={`text-xs ${p.featured ? "text-background/60" : "text-muted-foreground"}`}>From</span>
                <span className={`text-3xl font-semibold tracking-tight ${p.featured ? "text-background" : "text-foreground"}`}>
                  {p.from}
                </span>
              </div>

              <ul className="mt-6 flex-1 space-y-2.5">
                {p.features?.map((f) => (
                  <li key={f} className={`flex items-start gap-2.5 text-sm ${p.featured ? "text-background/85" : "text-foreground"}`}>
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.featured ? "text-background" : "text-accent"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <a
                  href="/contact"
                  className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all hover:-translate-y-px ${
                    p.featured
                      ? "bg-background text-foreground"
                      : "bg-foreground text-background"
                  }`}
                >
                  Get a Quote
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          Final pricing varies depending on project scope, pages, integrations, content needs, and custom requirements. All prices in AUD.
        </p>
      </Section>

      {/* FAQ */}
      <Section className="bg-surface border-t border-border/60">
        <div className="max-w-2xl">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Questions before getting started?
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground">{f.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* BOTTOM CTA */}
      <section className="border-t border-border/60">
        <div className="container-luxe py-16 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Ready to get a tailored quote?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Tell us about your business and we'll put together the right package for you — free, no commitment.
          </p>
          <div className="mt-7">
            <CtaPrimary to="/contact">Get a Free Quote</CtaPrimary>
          </div>
        </div>
      </section>
    </>
  );
}
