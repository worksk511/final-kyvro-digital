import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/site/Section";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Kyvro Digital" },
      {
        name: "description",
        content:
          "Kyvro Digital is a boutique digital studio built on one belief — every business deserves a digital presence that actually reflects the quality of what they do.",
      },
      { property: "og:title", content: "About — Kyvro Digital" },
      {
        property: "og:description",
        content:
          "We started Kyvro because great digital systems shouldn't be reserved for big businesses with big budgets. Here's our story.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const beliefs = [
  {
    title: "Most small businesses are invisible online — and it's not their fault.",
    body: "The tools are too complicated, the agencies are too expensive, and the freelancers disappear after delivery. We built Kyvro to be the thing that was missing.",
  },
  {
    title: "A premium digital presence shouldn't cost a premium price.",
    body: "Big agency quality at boutique prices. That's the whole model. We keep things lean, focused, and efficient — so you get a better result for less.",
  },
  {
    title: "Tech should work for you, not confuse you.",
    body: "We don't talk in jargon. We don't overcomplicate. We build systems that are easy to use, easy to understand, and easy to grow with.",
  },
  {
    title: "Launching is just the beginning.",
    body: "We stay in your corner long after the site goes live. Because a digital system that nobody maintains slowly becomes a liability, not an asset.",
  },
];

const values = [
  { label: "Clarity", desc: "No jargon. No confusion. Just clear systems and honest communication." },
  { label: "Quality", desc: "We'd rather do fewer things exceptionally than many things averagely." },
  { label: "Ownership", desc: "We treat your business like it's ours. Because your success is directly ours." },
  { label: "Speed", desc: "Premium doesn't mean slow. We move fast without cutting corners." },
];

const milestones = [
  { year: "The problem", text: "We kept seeing the same thing — brilliant small businesses with terrible digital presence, losing clients to competitors who simply looked more credible online." },
  { year: "The insight", text: "The gap wasn't talent or product. It was digital infrastructure. Booking systems, automation, mobile experience — things big businesses had, small ones couldn't access affordably." },
  { year: "The decision", text: "We built Kyvro to close that gap. A studio that delivers premium digital systems — websites, apps, portals, automation — at a price point real businesses can actually afford." },
  { year: "The mission", text: "To give every small business the digital presence it deserves. Not one day. Not when they 'get big enough.' Right now." },
];

function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-border/60">
        <div className="container-luxe pt-16 pb-16 md:pt-20 md:pb-20">
          <div className="max-w-4xl">
            <Eyebrow>About Kyvro Digital</Eyebrow>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-[4rem]">
              Built for the businesses that agencies{" "}
              <span className="font-serif italic font-normal text-foreground/80">
                overlooked.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Kyvro Digital exists because great digital systems have always been
              reserved for big companies with big budgets. We're here to change that —
              one business at a time.
            </p>
          </div>
        </div>
      </section>

      {/* ORIGIN STORY */}
      <Section>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              We didn't start Kyvro to build websites.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              We started it because we were frustrated.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Frustrated watching talented, hardworking business owners lose clients
              to competitors who simply looked more credible online. Frustrated seeing
              good businesses stuck with templated websites that said nothing about
              what made them special. Frustrated that "getting a proper digital
              system" meant either spending $10,000 with an agency or trying to
              figure it out alone.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              There had to be a better way. So we built it.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="space-y-4">
              {milestones.map((m) => (
                <div
                  key={m.year}
                  className="flex gap-5 rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex-shrink-0">
                    <span className="inline-block rounded-full bg-foreground px-3 py-1 text-[11px] font-medium text-background">
                      {m.year}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {m.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* WHAT WE BELIEVE */}
      <Section className="bg-surface border-t border-border/60">
        <div className="max-w-2xl">
          <Eyebrow>What we believe</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            A few things we'll never compromise on.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {beliefs.map((b) => (
            <div
              key={b.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="text-sm font-semibold leading-snug text-foreground">
                {b.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* HOW WE WORK */}
      <Section className="border-t border-border/60">
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Boutique quality. No agency overhead.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              We're not a 50-person agency with layers of account managers and
              inflated invoices. We're a focused studio that takes on a select
              number of clients — so every project gets proper attention, not
              just a template and a handoff.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              You work directly with the people building your system. You get
              honest timelines, clear pricing, and a team that actually cares
              about your result — not just the invoice.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              And when we deliver — we don't disappear. We become your ongoing
              digital partner.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <div
                  key={v.label}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <p className="text-base font-semibold text-foreground">
                    {v.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* MISSION STATEMENT */}
      <section className="border-t border-border/60 bg-foreground">
        <div className="container-luxe py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="text-background/40">Our mission</Eyebrow>
            <blockquote className="mt-6 text-2xl font-semibold leading-snug tracking-tight text-background md:text-3xl lg:text-4xl">
              "Every business — regardless of size or budget — deserves a digital
              presence that actually reflects the quality of what they do."
            </blockquote>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-background/60">
              That's not a tagline. It's why we exist, why we price the way we do,
              and why we stay involved long after launch day.
            </p>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <Section className="border-t border-border/60 bg-surface">
        <div className="max-w-2xl">
          <Eyebrow>Who we serve</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            We work best with businesses that are ready to take their digital presence seriously.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            You don't need a huge budget. You don't need technical knowledge.
            You just need to care about how your business looks and works online —
            and be ready to let us do the rest.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            We've worked with salons, clinics, coaches, trades, restaurants,
            consultants, and startups. What they all had in common: they wanted
            something better, and they trusted us to build it.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "You're starting fresh",
              body: "New business, blank slate. We'll build your entire digital foundation from scratch — website, booking, automation, identity.",
            },
            {
              title: "You're ready to upgrade",
              body: "You've outgrown your current site. It doesn't reflect where you are anymore. We'll redesign, rebuild, and reimagine it.",
            },
            {
              title: "You want to run smarter",
              body: "You're doing everything manually. Enquiries, bookings, follow-ups. We automate the repetitive so you can focus on the real work.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="text-sm font-semibold text-foreground">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="border-t border-border/60">
        <div className="container-luxe py-16 md:py-20">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <Eyebrow>Work with us</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Ready to build something you're proud of?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Tell us where you're at — we'll tell you exactly what we'd build,
                how long it would take, and what it would cost. No fluff, no
                pressure, no commitment.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all hover:-translate-y-px"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-7 py-3.5 text-sm font-medium text-foreground transition-all hover:border-foreground/40"
              >
                See what we build
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
