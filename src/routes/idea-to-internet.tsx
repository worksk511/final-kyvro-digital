import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/site/Section";
import { CtaPrimary, CtaGhost } from "@/components/site/CtaButton";
import { ideaToInternet } from "@/lib/content";
import { ArrowRight, Check, Lightbulb, Map, Hammer, Rocket, Award } from "lucide-react";

export const Route = createFileRoute("/idea-to-internet")({
  head: () => ({
    meta: [
      { title: "Idea to Internet — Kyvro Digital" },
      {
        name: "description",
        content:
          "You have the idea. We build everything else. From 30-minute Idea Audit to full digital launch — Kyvro Digital turns first-time founders and students into real businesses online.",
      },
      { property: "og:title", content: "Idea to Internet — Kyvro Digital" },
      {
        property: "og:description",
        content:
          "You bring the idea. We build the website, the brand, the systems. Every launch includes a Digital Birth Certificate. Worldwide.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IdeaToInternetPage,
});

const stageIcons = [Lightbulb, Map, Hammer, Rocket];

function IdeaToInternetPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="container-luxe pt-16 pb-20 md:pt-24 md:pb-28">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5">
            <span className="text-accent text-xs font-semibold tracking-widest uppercase">✦ New · Founding Offer</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-5xl font-semibold leading-[1.04] tracking-tight text-foreground md:text-7xl lg:text-[5rem]">
              You have the idea.{" "}
              <span className="font-serif italic font-normal text-foreground/70">
                We build everything else.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {ideaToInternet.description}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <CtaPrimary to="/contact">Book your free Idea Audit</CtaPrimary>
              <CtaGhost to="/services">See all services</CtaGhost>
            </div>
          </div>

          {/* Floating stat cards */}
          <div className="mt-16 grid gap-4 sm:grid-cols-3 max-w-2xl">
            {[
              { value: "Free", label: "30-min Idea Audit" },
              { value: "30 days", label: "Idea to launch" },
              { value: "1 of 1", label: "Digital Birth Certificate" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card px-6 py-5">
                <p className="text-2xl font-semibold tracking-tight text-foreground">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE GAP */}
      <Section className="bg-surface border-b border-border/60">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow>The problem nobody solves</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Great ideas die because nobody helps them get online.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Incubators want traction. Investors want revenue. Agencies want $10,000. Mentors give advice but no execution. Universities teach theory, not digital infrastructure.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The result? Thousands of people — students, first-time founders, side-hustlers — sitting on genuinely good ideas with absolutely nowhere to take them.
            </p>
            <p className="mt-4 text-sm font-medium text-foreground">
              That gap is exactly why we built Idea to Internet.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { problem: "Incubators", issue: "Want traction before they help you" },
              { problem: "Agencies", issue: "Charge $5,000–$20,000 minimum" },
              { problem: "Freelancers", issue: "Build the site and disappear" },
              { problem: "Universities", issue: "Teach theory, not execution" },
              { problem: "Kyvro Digital", issue: "Idea → strategy → build → launch ✦", highlight: true },
            ].map((row) => (
              <div
                key={row.problem}
                className={`flex items-center justify-between rounded-lg border px-5 py-4 ${
                  row.highlight
                    ? "border-accent/40 bg-accent/5"
                    : "border-border bg-card"
                }`}
              >
                <span className={`text-sm font-semibold ${row.highlight ? "text-accent" : "text-foreground"}`}>
                  {row.problem}
                </span>
                <span className={`text-sm ${row.highlight ? "text-accent" : "text-muted-foreground"}`}>
                  {row.issue}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* WHO IT'S FOR */}
      <Section className="border-b border-border/60">
        <div className="max-w-2xl">
          <Eyebrow>Who this is for</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Built for people who've said{" "}
            <span className="font-serif italic font-normal">"I have an idea"</span>{" "}
            but never acted on it.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            You don't need business experience. You don't need technical knowledge. You need someone who can translate your idea into a real, working digital business — anywhere in the world.
          </p>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ideaToInternet.whoItsFor.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className="text-sm leading-relaxed text-foreground">{item}</span>
            </div>
          ))}
          <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span className="text-sm leading-relaxed text-foreground">Anyone, anywhere in the world, ready to start</span>
          </div>
        </div>
      </Section>

      {/* THE 4 STAGES */}
      <section className="border-b border-border/60 bg-foreground text-background">
        <div className="container-luxe py-16 md:py-24">
          <div className="max-w-2xl mb-14">
            <span className="inline-block rounded-full border border-background/20 px-3 py-1 text-xs font-medium text-background/60 mb-5 tracking-widest uppercase">
              How it works
            </span>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-background md:text-5xl">
              From your first conversation to your first customer.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-background/60">
              Four stages. Zero confusion. One complete digital business at the end.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ideaToInternet.stages.map((stage, i) => {
              const Icon = stageIcons[i];
              return (
                <div key={stage.number} className="relative rounded-2xl border border-background/10 bg-background/5 p-6">
                  {/* Connector line for desktop */}
                  {i < ideaToInternet.stages.length - 1 && (
                    <div className="hidden lg:block absolute top-9 right-0 translate-x-1/2 w-6 h-px bg-background/20 z-10" />
                  )}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-medium tracking-widest text-accent">{stage.number}</span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/10">
                      <Icon className="h-4 w-4 text-background/70" />
                    </div>
                  </div>
                  <span className="inline-block rounded-full border border-background/15 px-2.5 py-0.5 text-[10px] font-medium text-background/50 mb-3">
                    {stage.label}
                  </span>
                  <h3 className="text-lg font-semibold text-background">{stage.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-background/60">{stage.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DIGITAL BIRTH CERTIFICATE */}
      <section className="border-b border-border/60">
        <div className="container-luxe py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {/* Left — copy */}
            <div>
              <span className="inline-block rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent mb-5 tracking-widest uppercase">
                ✦ Exclusive to Idea to Internet
              </span>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
                {ideaToInternet.birthCertificate.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {ideaToInternet.birthCertificate.body}
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Your business name & launch date",
                  "Your digital stack — every tool we built",
                  "The idea that started it all",
                  "Kyvro Digital seal of launch",
                  "Yours to keep, frame, or share",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
                      <Check className="h-3 w-3 text-accent" />
                    </span>
                    <span className="text-sm text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — certificate mockup */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-sm">
                <div className="rounded-2xl border-2 border-accent/20 bg-card p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]">
                  {/* Certificate header */}
                  <div className="text-center border-b border-border pb-6 mb-6">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-foreground mb-3">
                      <Award className="h-5 w-5 text-accent" />
                    </div>
                    <p className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">Kyvro Digital</p>
                    <p className="mt-1 text-xs font-semibold tracking-[0.15em] text-foreground uppercase">Digital Birth Certificate</p>
                  </div>
                  {/* Certificate fields */}
                  <div className="space-y-4">
                    {[
                      { label: "Business", value: "Your Business Name" },
                      { label: "Founded", value: "The day you launched" },
                      { label: "Stack", value: "Website · Booking · Automation" },
                      { label: "Origin", value: "Your original idea" },
                    ].map((field) => (
                      <div key={field.label} className="flex items-start justify-between gap-4 rounded-lg bg-surface px-4 py-3">
                        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{field.label}</span>
                        <span className="text-xs text-foreground/60 text-right">{field.value}</span>
                      </div>
                    ))}
                  </div>
                  {/* Seal */}
                  <div className="mt-6 flex items-center justify-center">
                    <div className="rounded-full border border-accent/30 px-4 py-2">
                      <span className="text-[10px] font-medium text-accent tracking-widest uppercase">✦ Launched by Kyvro Digital</span>
                    </div>
                  </div>
                </div>
                {/* Floating accent */}
                <div className="absolute -top-3 -right-3 rounded-lg border border-accent/20 bg-accent/10 px-3 py-1.5">
                  <p className="text-xs font-medium text-accent">1 of 1 ✦</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FREE IDEA AUDIT CTA */}
      <section className="border-b border-border/60 bg-surface">
        <div className="container-luxe py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div>
                  <span className="inline-block rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-semibold text-accent mb-4 tracking-widest uppercase">
                    Free · No commitment
                  </span>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    Book your 30-Minute Idea Audit.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-md">
                    Tell us your idea. We'll tell you exactly what to build, in what order, and what it'll cost. Honest. Structured. Free. Available worldwide via video call.
                  </p>
                  <ul className="mt-5 space-y-2">
                    {[
                      "Validate your idea against the market",
                      "Map the exact digital tools you need",
                      "Get a clear recommended first step",
                      "No pitch. No pressure. Just clarity.",
                    ].map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="h-3.5 w-3.5 text-accent shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3 md:shrink-0">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all hover:-translate-y-px"
                  >
                    Book free Idea Audit
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <p className="text-center text-xs text-muted-foreground">30 minutes · Video call · Free worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAUNCH WALL TEASER */}
      <Section className="border-b border-border/60">
        <div className="max-w-2xl">
          <Eyebrow>Coming soon</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            The Launch Wall.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Every business we launch goes on the wall — permanently. A live, public record of every idea we've helped become a real business. From Canberra to Toronto. London to Dubai. Every client, every country, every launch date. One wall. Growing forever.
          </p>
          <p className="mt-4 text-sm font-medium text-foreground">
            Be one of the first names on it. ✦
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-foreground/40"
            >
              Get on the Launch Wall
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="bg-foreground">
        <div className="container-luxe py-16 md:py-20 text-center">
          <span className="inline-block rounded-full border border-background/20 px-3 py-1 text-xs font-medium text-background/50 mb-5 tracking-widest uppercase">
            ✦ Idea to Internet
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-background md:text-5xl max-w-2xl mx-auto leading-tight">
            The best time to start was yesterday. The second best time is right now.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-background/60">
            Your idea deserves a real digital presence. Book your free 30-minute Idea Audit and we'll map out exactly how to get there.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 text-sm font-medium text-foreground transition-all hover:-translate-y-px"
            >
              Book your free Idea Audit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-background/20 px-7 py-3.5 text-sm font-medium text-background transition-all hover:border-background/40"
            >
              See all services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
