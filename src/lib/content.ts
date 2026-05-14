// Centralised, easily-editable copy for Kyvro Digital.
// Updated: Added Idea to Internet — founding offer

export const services = [
  {
    slug: "website-to-app",
    title: "Website-to-App Conversion",
    short:
      "Turn your existing website into a polished, app-style experience your customers can save to their phone — no app store needed.",
    bestFor: "Businesses that want to feel modern and give customers a premium mobile experience.",
    badge: "Signature Service",
    inclusions: [
      "App-style layout & mobile navigation",
      "Save-to-home-screen (PWA) setup",
      "Booking or enquiry form inside the app",
      "Offers, gallery & contact sections",
      "QR code for easy customer access",
      "Google review button integration",
    ],
  },
  {
    slug: "idea-to-internet",
    title: "Idea to Internet",
    short:
      "You have the idea. We build the digital presence, the brand, the systems — and hand you a business ready to launch. Worldwide.",
    bestFor: "Students, first-time founders, side-hustlers, and anyone with an idea and no idea where to start.",
    badge: "✦ New",
    inclusions: [
      "Free 30-minute Idea Audit",
      "Digital roadmap & brand direction",
      "Full website design & build",
      "Booking or enquiry system",
      "Business automation setup",
      "Digital Birth Certificate on launch",
    ],
  },
  {
    slug: "client-portals",
    title: "Client Portals",
    short:
      "A branded digital hub where your clients can book, enquire, and interact with your business — all in one polished place.",
    bestFor: "Service businesses, salons, clinics, coaches, and consultants.",
    inclusions: [
      "Branded mobile-friendly portal design",
      "Booking & appointment request flow",
      "New client intake form",
      "Offers, loyalty & promotions section",
      "WhatsApp & email contact buttons",
      "Google review integration",
      "QR code access for customers",
    ],
  },
  {
    slug: "website-design",
    title: "Website Design & Development",
    short:
      "Clean, brand-led websites that look polished, load fast, and earn trust on every device.",
    bestFor: "Businesses ready to upgrade from a basic or templated website.",
    inclusions: [
      "Custom design tailored to your business",
      "Clear page structure & navigation",
      "Responsive across mobile, tablet & desktop",
      "Contact & quote forms included",
      "Basic SEO-friendly structure",
      "Launch-ready in days, not months",
    ],
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    short:
      "Automate your enquiries, bookings, follow-ups, and admin — so you spend less time on repetitive tasks and more time on your business.",
    bestFor: "Any business tired of manual follow-ups, missed leads, and admin overload.",
    inclusions: [
      "Automated email replies & confirmations",
      "Booking & appointment reminder setup",
      "Lead capture & follow-up flows",
      "Form-to-email & form-to-database automation",
      "Google Sheets or Airtable integration",
      "Review request automation",
    ],
  },
  {
    slug: "booking-setup",
    title: "Booking System Setup",
    short:
      "Frictionless booking flows so clients can reserve your time in a few taps — with automated confirmations built in.",
    bestFor: "Service businesses, coaches, beauty studios, and clinics.",
    inclusions: [
      "Booking page design & setup",
      "Calendar & availability integration",
      "Automated confirmation & reminder emails",
      "Service selection & client details collection",
      "WhatsApp & email booking buttons",
      "Mobile-optimised booking flow",
    ],
  },
  {
    slug: "branding-identity",
    title: "Branding & Digital Identity",
    short:
      "A cohesive digital identity that makes your business look premium, consistent, and instantly recognisable.",
    bestFor: "New businesses, rebrands, and anyone who feels their current look doesn't match their quality.",
    inclusions: [
      "Brand direction & colour palette",
      "Font pairing & visual identity",
      "Logo concept direction",
      "Website brand styling",
      "Social media visual direction",
      "Brand consistency across all touchpoints",
    ],
  },
  {
    slug: "ecommerce-setup",
    title: "E-commerce & Online Store Setup",
    short:
      "A clean, conversion-focused online store that makes buying from you feel effortless.",
    bestFor: "Businesses ready to sell products or services online.",
    inclusions: [
      "Online store design & setup",
      "Product pages & category structure",
      "Checkout & payment integration guidance",
      "Mobile shopping experience",
      "Shipping, returns & policy pages",
      "Launch-ready product setup",
    ],
  },
  {
    slug: "digital-strategy",
    title: "Digital Strategy & Consultation",
    short:
      "A clear roadmap for your digital presence — what to build, what to fix, and what to focus on first.",
    bestFor: "Businesses unsure where to start or how to improve their online systems.",
    inclusions: [
      "Website & digital presence audit",
      "Competitor review",
      "Customer journey planning",
      "Automation & tool recommendations",
      "Digital setup roadmap",
      "Priority action plan",
    ],
  },
  {
    slug: "ongoing-support",
    title: "Ongoing Support & Maintenance",
    short:
      "We stay in your corner — updating, improving, and maintaining your digital systems every month.",
    bestFor: "Any business that wants a reliable digital partner, not a one-off job.",
    inclusions: [
      "Monthly website updates & improvements",
      "Content & design changes",
      "Form & booking system updates",
      "Automation tweaks & monitoring",
      "Priority technical support",
      "New page or section additions",
    ],
  },
] as const;

export const audiences = [
  "Small businesses",
  "Service businesses",
  "Coaches & consultants",
  "Beauty & wellness studios",
  "Clinics & health professionals",
  "Real estate professionals",
  "Local trade businesses",
  "Restaurants & hospitality",
  "Startups & new businesses",
  "Students & first-time founders",
  "Independent creatives",
  "E-commerce brands",
  "Professional services",
];

export const whyChoose = [
  {
    title: "Premium boutique quality",
    body: "We're not an agency with 50 clients. Every project gets careful attention, considered design, and a result that actually looks premium.",
  },
  {
    title: "Built for non-technical owners",
    body: "You don't need to know anything about websites, code, or tech. We handle everything and explain it in plain language.",
  },
  {
    title: "Automation-first thinking",
    body: "Every system we build is designed to save you time — automated replies, booking confirmations, follow-ups, and more.",
  },
  {
    title: "We don't disappear after launch",
    body: "Ongoing support means you have a digital partner who keeps improving your systems as your business grows.",
  },
];

export const pricing = [
  {
    name: "Starter",
    from: "AUD $499",
    description:
      "A clean, professional website or landing page to get your business online and looking credible fast.",
    features: [
      "1–3 page website or landing page",
      "Mobile-first responsive build",
      "Contact or enquiry form",
      "Basic SEO setup",
      "Delivered in 5–7 days",
    ],
    featured: false,
  },
  {
    name: "Growth",
    from: "AUD $999",
    description:
      "A full website with booking or quote flow, automation, and everything you need to generate leads.",
    features: [
      "Up to 6 pages",
      "Custom design direction",
      "Booking system or quote form",
      "Automated email confirmations",
      "Social media & Google Business setup",
      "Delivered in 10–14 days",
    ],
    featured: true,
  },
  {
    name: "Premium",
    from: "AUD $1,999",
    description:
      "A complete digital system — website, client portal, automation, and branding all built together.",
    features: [
      "Full multi-page website",
      "Website-to-App or Client Portal",
      "Full automation setup",
      "Branding & digital identity",
      "E-commerce or booking system",
      "Priority support for 30 days",
    ],
    featured: false,
  },
  {
    name: "Monthly Support",
    from: "AUD $199/mo",
    description: "Ongoing updates, improvements, and support so your digital presence keeps growing.",
    features: [
      "Monthly design & content updates",
      "Automation monitoring & tweaks",
      "Priority technical support",
      "New sections or pages as needed",
    ],
    featured: false,
  },
];

export const signatureService = {
  title: "Website-to-App Conversion",
  tagline: "Your website. On their home screen.",
  description:
    "Most small businesses have a website — but almost none have an app. We convert your existing website into a polished, app-style experience your customers can save directly to their phone's home screen. No app store. No developer fees. Just a premium mobile experience your competitors don't have.",
  points: [
    "Looks and feels like a real app",
    "Customers tap your icon on their home screen",
    "Booking, contact & offers all inside",
    "QR code so anyone can access it instantly",
    "No app store submission needed",
    "Works on iPhone and Android",
  ],
};

export const ideaToInternet = {
  tagline: "You have the idea. We build everything else.",
  description:
    "Every business that exists today started as an idea. Most never made it online — not because they weren't good enough, but because nobody helped them get there. That's exactly what we do. From your first conversation to your first customer — we build the entire digital foundation your idea needs to become a real business.",
  stages: [
    {
      number: "01",
      name: "30-Min Idea Audit",
      label: "Free",
      body: "We validate your idea, map the digital opportunity, and tell you exactly what to build first. No pitch. No pressure. Just clarity.",
    },
    {
      number: "02",
      name: "Blueprint",
      label: "Strategy session",
      body: "Your complete digital roadmap — brand direction, website structure, tools, automation plan, and a clear path from idea to launch.",
    },
    {
      number: "03",
      name: "Build",
      label: "We build everything",
      body: "Website, branding, booking system, automation — your complete digital presence, built to a premium standard, delivered fast.",
    },
    {
      number: "04",
      name: "Launch",
      label: "Go live + Digital Birth Certificate",
      body: "You go live. We hand you your Digital Birth Certificate — a branded record of your idea, your stack, and your launch date. The day your business was born.",
    },
  ],
  birthCertificate: {
    title: "The Digital Birth Certificate",
    body: "Every business we launch receives one. A beautifully designed one-page document recording your business name, your digital stack, your launch date, and the idea that started it all. Frame it. Share it. It marks the day your idea became real.",
  },
  whoItsFor: [
    "University students with an idea and no execution plan",
    "First-time founders who don't know where to start",
    "Side-hustlers ready to take their idea seriously",
    "Career-changers launching something new",
    "Anyone who's said 'I have an idea' but never acted on it",
  ],
};

export const stats = [
  { value: "48hr", label: "Average first draft turnaround" },
  { value: "100%", label: "Mobile-first builds" },
  { value: "5★", label: "Client satisfaction focus" },
  { value: "AU", label: "Based & serving globally" },
];