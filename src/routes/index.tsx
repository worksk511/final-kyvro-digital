import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/site/Section";
import { CtaPrimary, CtaGhost } from "@/components/site/CtaButton";
import { services, audiences, whyChoose, signatureService, stats } from "@/lib/content";
import { ArrowRight, Layout, Wrench, TrendingUp, Smartphone, Sparkles, Target, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kyvro Digital — Premium Websites & Digital Systems for Modern Businesses" },
      {
        name: "description",
        content:
          "Kyvro Digital is a boutique digital studio building premium websites, client portals, booking systems and business automation for modern businesses — Australia & worldwide.",
      },
      { property: "og:title", content: "Kyvro Digital — Premium Websites & Digital Systems" },
      {
        property: "og:description",
        content:
          "Premium websites, app conversion, client portals and business automation for modern businesses.",
      },
      { property: "og:url", content: "https://kyvrodigital.com" },
      { property: "og:image", content: "https://kyvrodigital.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://kyvrodigital.com/og-image.png" },
    ],
  }),
  component: HomePage,
});

const whatWeDo = [
  {
    icon: Layout,
    title: "Design",
    body: "Clean, premium website design with a strong visual direction and clear user experience.",
  },
  {
    icon: Wrench,
    title: "Build",
    body: "Responsive, fast-loading pages built with structure, polish, and attention to detail.",
  },
  {
    icon: TrendingUp,
    title: "Convert",
    body: "Enquiry-focused layouts, forms, and booking flows designed to turn visitors into leads.",
  },
];

const trustPoints = [
  { icon: Sparkles, label: "Clean premium design" },
  { icon: Smartphone, label: "Mobile-first builds" },
  { icon: Target, label: "Enquiry-focused structure" },
];

const howWeWork = [
  {
    step: "01",
    title: "Understand",
    body: "We learn what your business needs, who your customers are, and what your website needs to achieve.",
  },
  {
    step: "02",
    title: "Design",
    body: "We create a clean, premium direction that makes your business look credible, professional, and easy to trust.",
  },
  {
    step: "03",
    title: "Launch",
    body: "We build the website, set up the enquiry flow, and make sure everything works smoothly across devices.",
  },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-luxe pt-14 pb-16 md:pt-20 md:pb-20">
          <div className="fade-up max-w-4xl">
            <Eyebrow>Premium Digital Studio — Australia</Eyebrow>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-[4.25rem]">
              We build the digital systems your business{" "}
              <span className="font-serif italic font-normal text-foreground/90">deserves.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Websites, apps, client portals, and automation — built for businesses
              that want to look premium, run smoothly, and grow without the tech headaches.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CtaPrimary to="/contact">Get a Free Quote</CtaPrimary>
              <CtaGhost to="/services">See Our Services</CtaGhost>
            </div>
          </div>

          {/* Browser mockup */}
          <div className="mt-12 fade-up">
            <div className="mx-auto max-w-5xl rounded-xl border border-border bg-card shadow-[0_30px_80px_-30px_rgba(0,0,0,0.18)]">
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                <div className="ml-4 flex-1 rounded-md bg-surface px-3 py-1 text-xs text-muted-foreground">
                  yourbusiness.com
                </div>
              </div>
              <div className="grid gap-6 p-8 md:grid-cols-5 md:p-12">
                <div className="md:col-span-3 space-y-3">
                  <div className="h-2 w-20 rounded bg-accent" />
                  <div className="h-7 w-3/4 rounded bg-foreground/85" />
                  <div className="h-7 w-2/3 rounded bg-foreground/85" />
                  <div className="mt-3 h-2 w-full rounded bg-muted" />
                  <div className="h-2 w-5/6 rounded bg-muted" />
                  <div className="mt-4 flex gap-2">
                    <div className="h-8 w-28 rounded-full bg-foreground" />
                    <div className="h-8 w-24 rounded-full border border-border" />
                  </div>
                </div>
                <div className="md:col-span-2 rounded-lg bg-surface p-5">
                  <div className="h-2 w-16 rounded bg-accent/70" />
                  <div className="mt-3 h-3 w-3/4 rounded bg-foreground/80" />
                  <div className="mt-4 space-y-2">
                    <div className="h-2 w-full rounded bg-muted" />
                    <div className="h-2 w-4/5 rounded bg-muted" />
                    <div className="h-2 w-3/5 rounded bg-muted" />
                  </div>
                  <div className="mt-5 h-8 w-full rounded-md bg-foreground/90" />
                </div>
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {trustPoints.map((p) => (
              <div key={p.label} className="flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-4">
                <p.icon className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-foreground">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-t border-border/60 bg-surface">
        <div className="container-luxe py-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{s.value}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <Section className="border-t border-border/60">
        <div className="max-w-2xl">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Digital foundations designed to make your business look sharper, clearer, and easier to trust.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {whatWeDo.map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface">
                <item.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SIGNATURE SERVICE SPOTLIGHT — Website to App */}
      <section className="border-t border-border/60 bg-foreground text-background">
        <div className="container-luxe py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {/* Left — copy */}
            <div>
              <span className="inline-block rounded-full border border-background/20 px-3 py-1 text-xs font-medium text-background/70 mb-5">
                ✦ Signature Service
              </span>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-background md:text-4xl lg:text-5xl">
                {signatureService.tagline}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-background/70">
                {signatureService.description}
              </p>
              <ul className="mt-8 space-y-3">
                {signatureService.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-background/20">
                      <Check className="h-3 w-3 text-background" />
                    </span>
                    <span className="text-sm text-background/80">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-all hover:-translate-y-px"
                >
                  Convert my website
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right — phone mockup */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-56 md:w-64">
                {/* Phone shell */}
                <div className="rounded-[2.5rem] border-4 border-background/20 bg-background/10 p-2 shadow-2xl backdrop-blur">
                  <div className="rounded-[2rem] bg-background overflow-hidden">
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-5 pt-3 pb-1">
                      <span className="text-[10px] font-medium text-foreground/60">9:41</span>
                      <div className="h-3 w-16 rounded-full bg-foreground/10" />
                    </div>
                    {/* App header */}
                    <div className="px-4 pt-3 pb-2 border-b border-border/40">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-foreground/90" />
                        <div>
                          <div className="h-2 w-20 rounded bg-foreground/80" />
                          <div className="mt-1 h-1.5 w-14 rounded bg-muted" />
                        </div>
                      </div>
                    </div>
                    {/* App content */}
                    <div className="p-4 space-y-3">
                      <div className="rounded-lg bg-surface p-3">
                        <div className="h-1.5 w-12 rounded bg-accent/60 mb-2" />
                        <div className="h-2.5 w-3/4 rounded bg-foreground/70" />
                        <div className="mt-1.5 h-2 w-1/2 rounded bg-muted" />
                        <div className="mt-3 h-7 w-full rounded-lg bg-foreground/90" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-lg bg-surface p-3">
                          <div className="h-4 w-4 rounded bg-accent/40 mb-2" />
                          <div className="h-2 w-full rounded bg-muted" />
                          <div className="mt-1 h-2 w-3/4 rounded bg-muted" />
                        </div>
                        <div className="rounded-lg bg-surface p-3">
                          <div className="h-4 w-4 rounded bg-foreground/20 mb-2" />
                          <div className="h-2 w-full rounded bg-muted" />
                          <div className="mt-1 h-2 w-3/4 rounded bg-muted" />
                        </div>
                      </div>
                      <div className="rounded-lg bg-surface p-3">
                        <div className="h-2 w-2/3 rounded bg-muted" />
                        <div className="mt-1.5 h-2 w-1/2 rounded bg-muted" />
                      </div>
                    </div>
                    {/* Bottom nav */}
                    <div className="flex justify-around border-t border-border/40 px-4 py-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`h-5 w-5 rounded ${i === 0 ? "bg-foreground/80" : "bg-muted"}`} />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Floating label */}
                <div className="absolute -right-4 top-12 rounded-lg border border-background/20 bg-background/10 px-3 py-1.5 backdrop-blur">
                  <p className="text-xs font-medium text-background">Saved to home screen ✓</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <Section className="bg-surface">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Eyebrow>Services</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Everything your business needs online — in one place.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Each service is delivered with the same attention to detail — clean,
            considered, and built around results.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              to="/services"
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/30 hover:-translate-y-0.5"
            >
              <div>
                {"badge" in s && s.badge && (
                  <span className="mb-3 inline-block rounded-full bg-foreground px-2.5 py-0.5 text-[10px] font-medium text-background">
                    {s.badge}
                  </span>
                )}
                <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                Learn more
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-foreground/40"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* HOW WE WORK */}
      <Section>
        <div className="max-w-2xl">
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Simple process. Premium result.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {howWeWork.map((s) => (
            <div key={s.step} className="rounded-xl border border-border bg-card p-6">
              <span className="text-xs font-medium tracking-wider text-accent">{s.step}</span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHO WE HELP */}
      <Section className="bg-surface">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5">
            <Eyebrow>Who we help</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Built for businesses that need a stronger online presence.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              We work with businesses that want a website which reflects the quality
              of what they actually do.
            </p>
          </div>
          <div className="md:col-span-7 flex flex-wrap content-start gap-2.5">
            {audiences.map((a) => (
              <span
                key={a}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* WHY CHOOSE */}
      <Section>
        <div className="max-w-2xl">
          <Eyebrow>Why Kyvro Digital</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Your website should do more than exist.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            It should make your business look credible, guide visitors clearly, and
            help enquiries happen with less friction.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {whyChoose.map((w) => (
            <div key={w.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="border-t border-border/60 bg-surface">
        <div className="container-luxe py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Get started</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
              Ready to build something premium?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Get a free consultation and quote — tell us what you need and we'll
              shape the right digital system for your business.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:-translate-y-px"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-foreground/40"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
