import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/site/Section";
import { CtaPrimary } from "@/components/site/CtaButton";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Kyvro Digital" },
      {
        name: "description",
        content:
          "Kyvro Digital is a modern digital studio creating polished, high-converting websites for businesses that want to look more credible online.",
      },
      { property: "og:title", content: "About — Kyvro Digital" },
      {
        property: "og:description",
        content:
          "A modern digital studio creating polished, high-converting websites and digital systems for modern businesses.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Section className="pt-16 md:pt-20">
        <div className="max-w-3xl">
          <Eyebrow>About</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Digital design with clarity, polish, and purpose.
          </h1>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5">
            <div className="rounded-xl border border-border bg-surface p-7">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Our approach
              </p>
              <p className="mt-3 text-lg font-medium leading-snug text-foreground">
                Clean design, clear structure, and premium digital systems built around your business.
              </p>
            </div>
          </div>
          <div className="space-y-5 md:col-span-7">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Kyvro Digital is a modern digital studio creating polished, high-converting
              websites for businesses that want to look more credible online.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              We focus on clean design, clear structure, and premium digital systems that
              make it easier for visitors to understand what you offer and take the next step.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              A strong website should not only look good. It should make your business feel
              professional, trustworthy, and easy to engage with. Every page, section, and
              enquiry flow is designed with that purpose in mind.
            </p>
            <div className="pt-3">
              <CtaPrimary to="/contact">Get a Quote</CtaPrimary>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
