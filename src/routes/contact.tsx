import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Section, Eyebrow } from "@/components/site/Section";
import { ArrowRight, CheckCircle2, Mail, Clock, MessageCircle, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Get a Free Quote — Kyvro Digital" },
      {
        name: "description",
        content:
          "Tell us about your business and we'll send a tailored quote — websites, app conversion, client portals, automation, booking systems and more. Free consultation, no commitment.",
      },
      { property: "og:title", content: "Get a Free Quote — Kyvro Digital" },
      {
        property: "og:description",
        content:
          "Request a free tailored quote for websites, app conversion, client portals, automation and more. We reply within 24 hours.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const WEB3FORMS_KEY = "f2c4a936-5b6c-41b6-b014-4842c4e22dab";

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  business: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email").max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  helpWith: z.string().min(1, "Please choose a service"),
  hasWebsite: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Please select an option" }),
  }),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  timeline: z.string().trim().max(120).optional().or(z.literal("")),
  details: z.string().trim().max(2000).optional().or(z.literal("")),
});

type EnquiryValues = z.infer<typeof enquirySchema>;

const serviceOptions = [
  { value: "Website-to-App Conversion", label: "✦  Website-to-App Conversion — Signature Service" },
  { value: "Idea to Internet", label: "✦  Idea to Internet — New" },
  { value: "Client Portal", label: "Client Portal" },
  { value: "Website Design & Development", label: "Website Design & Development" },
  { value: "Business Automation", label: "Business Automation" },
  { value: "Booking System Setup", label: "Booking System Setup" },
  { value: "Branding & Digital Identity", label: "Branding & Digital Identity" },
  { value: "E-commerce & Online Store Setup", label: "E-commerce & Online Store Setup" },
  { value: "Digital Strategy & Consultation", label: "Digital Strategy & Consultation" },
  { value: "Ongoing Support & Maintenance", label: "Ongoing Support & Maintenance" },
  { value: "Not sure yet — help me decide", label: "Not sure yet — help me decide" },
  { value: "Other", label: "Other" },
];

const budgetOptions = [
  { value: "Under AUD $500", label: "Under AUD $500" },
  { value: "AUD $500 – $1,000", label: "AUD $500 – $1,000" },
  { value: "AUD $1,000 – $2,000", label: "AUD $1,000 – $2,000" },
  { value: "AUD $2,000 – $5,000", label: "AUD $2,000 – $5,000" },
  { value: "AUD $5,000+", label: "AUD $5,000+" },
  { value: "Not sure yet", label: "Not sure yet" },
];

const trustPoints = [
  { icon: Clock, text: "We reply within 24 hours" },
  { icon: CheckCircle2, text: "Free consultation, no obligation" },
  { icon: MessageCircle, text: "Every quote is tailored to your business" },
];

const contactDetails = [
  { icon: Mail, label: "Email", value: "info@kyvrodigital.com", href: "mailto:info@kyvrodigital.com" },
  { icon: Phone, label: "Phone / WhatsApp", value: "+61 493 034 590", href: "tel:+61493034590" },
  { icon: MapPin, label: "Location", value: "Canberra, Australia · Worldwide", href: null },
];

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
      name: "", business: "", email: "", phone: "",
      helpWith: "", hasWebsite: undefined,
      budget: "", timeline: "", details: "",
    },
  });

  const onSubmit = async (values: EnquiryValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Enquiry from ${values.name} — ${values.helpWith}`,
          from_name: "Kyvro Digital Website",
          replyto: values.email,
          name: values.name,
          email: values.email,
          business: values.business || "Not provided",
          phone: values.phone || "Not provided",
          service: values.helpWith,
          has_website: values.hasWebsite === "yes" ? "Yes" : "No",
          budget: values.budget || "Not specified",
          timeline: values.timeline || "Not specified",
          details: values.details || "No additional details provided",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Submission failed. Please try again.");
      }

      setSubmitted(true);
      reset();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const input = "mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10";
  const label = "block text-sm font-medium text-foreground";
  const error = "mt-1.5 text-xs text-destructive";

  return (
    <>
      {/* HERO STRIP */}
      <section className="border-b border-border/60 bg-surface">
        <div className="container-luxe py-12 md:py-16">
          <div className="max-w-2xl">
            <Eyebrow>Get a Free Quote</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
              Let's build something{" "}
              <span className="font-serif italic font-normal">premium.</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Tell us about your business — we'll come back with a tailored quote
              and clear next steps within 24 hours. No commitment, no pressure.
            </p>
          </div>

          {/* Trust strip */}
          <div className="mt-8 flex flex-wrap gap-3">
            {trustPoints.map((t) => (
              <div key={t.text}
                className="flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2">
                <t.icon className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                <span className="text-xs font-medium text-foreground">{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <Section className="pt-12 md:pt-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">

          {/* LEFT — contact info */}
          <div className="md:col-span-4">
            <h2 className="text-lg font-semibold text-foreground">Contact details</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Prefer to reach out directly? We're available via email, phone, or WhatsApp.
            </p>

            <div className="mt-6 space-y-3">
              {contactDetails.map((c) => (
                <div key={c.label}
                  className="flex items-start gap-4 rounded-xl border border-border bg-surface p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-card border border-border">
                    <c.icon className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{c.label}</p>
                    {c.href ? (
                      <a href={c.href}
                        className="mt-0.5 block text-sm font-medium text-foreground hover:underline underline-offset-4">
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm font-medium text-foreground">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* What happens next */}
            <div className="mt-8 rounded-xl border border-border bg-card p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
                What happens next
              </p>
              <ol className="space-y-3">
                {[
                  "We review your enquiry personally",
                  "We prepare a tailored quote for your project",
                  "We send it within 24 hours with clear next steps",
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-surface border border-border text-[10px] font-semibold text-foreground">
                      {i + 1}
                    </span>
                    <span className="text-sm text-muted-foreground leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="md:col-span-8">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-10">
              {submitted ? (
                <div className="py-16 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface border border-border">
                    <CheckCircle2 className="h-8 w-8 text-accent" />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
                    Enquiry received!
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Thank you for reaching out. We'll review your project details
                    and come back with a tailored quote within 24 hours.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-surface border border-border px-4 py-2">
                    <Mail className="h-3.5 w-3.5 text-accent" />
                    <span className="text-xs text-muted-foreground">Check your inbox — a confirmation is on its way</span>
                  </div>
                  <div className="mt-8">
                    <button type="button" onClick={() => setSubmitted(false)}
                      className="text-sm font-medium text-foreground underline-offset-4 hover:underline">
                      Send another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">

                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Your details</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Tell us who you are and how to reach you.</p>
                  </div>

                  {/* Name + Business */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={label}>Name <span className="text-destructive">*</span></label>
                      <input id="name" type="text" autoComplete="name" placeholder="Your full name" {...register("name")} className={input} />
                      {errors.name && <p className={error}>{errors.name.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="business" className={label}>Business name</label>
                      <input id="business" type="text" autoComplete="organization" placeholder="Your business name" {...register("business")} className={input} />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={label}>Email <span className="text-destructive">*</span></label>
                      <input id="email" type="email" autoComplete="email" placeholder="you@example.com" {...register("email")} className={input} />
                      {errors.email && <p className={error}>{errors.email.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className={label}>Phone / WhatsApp</label>
                      <input id="phone" type="tel" autoComplete="tel" placeholder="+61 4xx xxx xxx" {...register("phone")} className={input} />
                    </div>
                  </div>

                  <div className="border-t border-border/60 pt-6">
                    <h2 className="text-lg font-semibold text-foreground">Your project</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Tell us what you need and we'll tailor a quote for you.</p>
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="helpWith" className={label}>
                      What do you need help with? <span className="text-destructive">*</span>
                    </label>
                    <select id="helpWith" {...register("helpWith")} className={input}>
                      <option value="">Select a service</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {errors.helpWith && <p className={error}>{errors.helpWith.message}</p>}
                  </div>

                  {/* Has website */}
                  <div>
                    <span className={label}>Do you already have a website? <span className="text-destructive">*</span></span>
                    <div className="mt-3 flex gap-4">
                      {[{ v: "yes", l: "Yes, I have one" }, { v: "no", l: "No, starting fresh" }].map((opt) => (
                        <label key={opt.v}
                          className="flex flex-1 cursor-pointer items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors hover:border-foreground/40">
                          <input type="radio" value={opt.v} {...register("hasWebsite")} className="h-4 w-4 accent-[var(--ink)]" />
                          {opt.l}
                        </label>
                      ))}
                    </div>
                    {errors.hasWebsite && <p className={error}>{errors.hasWebsite.message}</p>}
                  </div>

                  {/* Budget + Timeline */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="budget" className={label}>Budget range</label>
                      <select id="budget" {...register("budget")} className={input}>
                        <option value="">Select a range</option>
                        {budgetOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className={label}>Preferred timeline</label>
                      <input id="timeline" type="text" placeholder="e.g. within 2 weeks" {...register("timeline")} className={input} />
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <label htmlFor="details" className={label}>Project details</label>
                    <textarea id="details" rows={5}
                      placeholder="Tell us about your business, what you want to achieve, and any specific requirements. The more detail, the better your quote will be."
                      {...register("details")} className={input} />
                  </div>

                  {submitError && (
                    <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
                      <p className="text-sm text-destructive">{submitError}</p>
                    </div>
                  )}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button type="submit" disabled={isSubmitting}
                      className="btn-primary group w-full sm:w-auto disabled:opacity-60">
                      {isSubmitting ? "Sending…" : "Send Enquiry"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                    <p className="text-xs text-muted-foreground">
                      We'll reply within 24 hours — no spam, no commitment.
                    </p>
                  </div>

                </form>
              )}
            </div>
          </div>

        </div>
      </Section>
    </>
  );
}
