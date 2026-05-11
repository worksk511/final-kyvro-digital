import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Section, Eyebrow } from "@/components/site/Section";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Get a Quote — Kyvro Digital" },
      {
        name: "description",
        content:
          "Tell us about your business and project. Kyvro Digital will send a tailored quote for your website, landing page, booking setup or quote form.",
      },
      { property: "og:title", content: "Get a Quote — Kyvro Digital" },
      {
        property: "og:description",
        content:
          "Request a tailored quote for a premium website, landing page, booking setup or quote form.",
      },
    ],
  }),
  component: ContactPage,
});

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  business: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email").max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  helpWith: z.string().min(1, "Please choose an option"),
  hasWebsite: z.enum(["yes", "no"], { errorMap: () => ({ message: "Please select an option" }) }),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  timeline: z.string().trim().max(120).optional().or(z.literal("")),
  details: z.string().trim().max(2000).optional().or(z.literal("")),
});

type EnquiryValues = z.infer<typeof enquirySchema>;

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      business: "",
      email: "",
      phone: "",
      helpWith: "",
      hasWebsite: undefined,
      budget: "",
      timeline: "",
      details: "",
    },
  });

  const onSubmit = async (values: EnquiryValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed");
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  const inputBase =
    "mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10";
  const labelBase = "block text-sm font-medium text-foreground";

  return (
    <Section className="pt-16 md:pt-20">
      <div className="grid gap-10 md:grid-cols-12 md:gap-14">
        {/* Intro */}
        <div className="md:col-span-5">
          <Eyebrow>Get a Quote</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
            Tell us about your project.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Share a few details and we'll come back to you with a tailored quote
            and clear next steps. We read every enquiry personally.
          </p>

          <div className="mt-8 rounded-xl border border-border bg-surface p-6">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              Or email us directly
            </div>
            <a
              href="mailto:info@kyvrodigital.com"
              className="mt-3 inline-block text-base font-medium text-foreground hover:underline"
            >
              info@kyvrodigital.com
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-7">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-9">
            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
                  Thank you — your enquiry has been sent.
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Kyvro Digital will be in touch soon.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelBase}>Name</label>
                    <input id="name" type="text" autoComplete="name" {...register("name")} className={inputBase} />
                    {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="business" className={labelBase}>Business name</label>
                    <input id="business" type="text" autoComplete="organization" {...register("business")} className={inputBase} />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className={labelBase}>Email</label>
                    <input id="email" type="email" autoComplete="email" {...register("email")} className={inputBase} />
                    {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelBase}>Phone / WhatsApp</label>
                    <input id="phone" type="tel" autoComplete="tel" {...register("phone")} className={inputBase} />
                  </div>
                </div>

                <div>
                  <label htmlFor="helpWith" className={labelBase}>What do you need help with?</label>
                  <select id="helpWith" {...register("helpWith")} className={inputBase}>
                    <option value="">Select an option</option>
                    <option value="Website Design (New Website)">Website Design (New Website)</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Website Refresh / Redesign">Website Refresh / Redesign</option>
                    <option value="Booking Setup / Scheduling Integration">Booking Setup / Scheduling Integration</option>
                    <option value="Quote / Enquiry Form Setup">Quote / Enquiry Form Setup</option>
                    <option value="Not sure yet">Not sure yet</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.helpWith && <p className="mt-1.5 text-xs text-destructive">{errors.helpWith.message}</p>}
                </div>

                <div>
                  <span className={labelBase}>Do you already have a website?</span>
                  <div className="mt-2 flex gap-6">
                    {[
                      { v: "yes", l: "Yes" },
                      { v: "no", l: "No" },
                    ].map((opt) => (
                      <label key={opt.v} className="flex items-center gap-2 text-sm text-foreground">
                        <input type="radio" value={opt.v} {...register("hasWebsite")} className="h-4 w-4 accent-[var(--ink)]" />
                        {opt.l}
                      </label>
                    ))}
                  </div>
                  {errors.hasWebsite && <p className="mt-1.5 text-xs text-destructive">{errors.hasWebsite.message}</p>}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="budget" className={labelBase}>Budget range</label>
                    <select id="budget" {...register("budget")} className={inputBase}>
                      <option value="">Select a range</option>
                      <option value="Under AUD 500">Under AUD 500</option>
                      <option value="AUD 500 – 1,000">AUD 500 – 1,000</option>
                      <option value="AUD 1,000 – 2,500">AUD 1,000 – 2,500</option>
                      <option value="AUD 2,500+">AUD 2,500+</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className={labelBase}>Preferred timeline</label>
                    <input id="timeline" type="text" placeholder="e.g. within 4 weeks" {...register("timeline")} className={inputBase} />
                  </div>
                </div>

                <div>
                  <label htmlFor="details" className={labelBase}>Project details</label>
                  <textarea
                    id="details"
                    rows={5}
                    placeholder="Tell us a little about your business and what you're hoping to achieve."
                    {...register("details")}
                    className={inputBase}
                  />
                </div>

                {submitError && (
                  <p className="text-xs text-destructive">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary group w-full sm:w-auto disabled:opacity-60"
                >
                  {isSubmitting ? "Sending…" : "Send Enquiry"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
