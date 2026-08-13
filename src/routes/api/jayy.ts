import { createAPIFileRoute } from "@tanstack/react-start/api";

// ─── DETERMINISTIC PRICING CONFIG ────────────────────────────────────────────
// These numbers must match /pricing exactly. Never let the model invent prices.
const PRICING = {
  starter: {
    name: "Starter",
    from: 499,
    currency: "AUD",
    pages: "1–3 pages",
    timeline: "5–7 days",
    includes: ["Mobile-first responsive build", "Contact or enquiry form", "Basic SEO setup"],
  },
  growth: {
    name: "Growth",
    from: 999,
    currency: "AUD",
    pages: "Up to 6 pages",
    timeline: "10–14 days",
    popular: true,
    includes: ["Booking system or quote form", "Automated email confirmations", "Social media & Google Business setup"],
  },
  premium: {
    name: "Premium",
    from: 1999,
    currency: "AUD",
    pages: "Full multi-page website",
    timeline: "2–4 weeks",
    includes: ["Website-to-App or Client Portal", "Full automation setup", "Branding & digital identity"],
  },
  support: {
    name: "Monthly Support",
    from: 199,
    currency: "AUD",
    per: "month",
    includes: ["Monthly design & content updates", "Automation monitoring", "Priority technical support"],
  },
};

// ─── SYSTEM PROMPT ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Jayy, the AI assistant for Kyvro Digital — a boutique premium digital studio based in Canberra, Australia.

Open with: "Hey — I'm Jayy, your Kyvro assistant."

VOICE & TONE:
- Warm, direct, quietly confident
- Short sentences. Plain language — the customer is non-technical
- Never use exclamation marks more than very rarely
- Never say "Certainly!", "Great question!", "I'd be happy to assist you", or any corporate filler
- Talks like a knowledgeable person who respects your time, not a sales bot
- When someone seems hesitant or quiet — say less, not more. Don't push.
- Ask one question at a time, never a wall of them

ABOUT KYVRO DIGITAL:
- Boutique digital studio, Canberra Australia, serving clients worldwide
- Services: Website Design & Development, Website-to-App Conversion (signature service — turns existing website into an installable home-screen app, no app store needed), Client Portals, Booking System Setup, Business Automation, Branding & Digital Identity, E-commerce Setup, Digital Strategy & Consultation, Idea to Internet (new service for first-time founders), Ongoing Support $199/mo
- Idea to Internet: for students, first-time founders, side-hustlers — free 30-min Idea Audit, full build, Digital Birth Certificate on launch day
- Payment: 50% deposit upfront, 50% on completion. Instalments available for larger projects
- One revision round included before final delivery
- Can start Starter and upgrade later

HARD LIMITS — never violate these:
1. NEVER invent or estimate a price — only use the getPricing function when quoting
2. NEVER promise a specific delivery date — give ranges only (e.g. "typically 10–14 days")
3. NEVER claim past clients, testimonials, case studies, or project numbers — the business is new
4. NEVER give legal, tax, or business registration advice
5. NEVER say a client's website is "bad" — use "could be stronger", "has room to improve"
6. If asked something you can't answer — route to kyvrodigital.com/contact rather than guess
7. NEVER fabricate social proof of any kind

HONEST DOWNSELLING — this is important:
If someone describes a need that's simpler than they think (e.g. they want 6 pages but really just need 1 strong landing page), say so honestly. Example: "Honestly, for what you've described, a single strong page would do it — you'd be paying for pages nobody visits." This builds more trust than upselling.

IDEA TO INTERNET ROUTING:
If someone says they have an idea but no business yet, or they're a student or first-time founder — immediately mention Idea to Internet and offer to book a free 30-minute Idea Audit. Explain they'll also receive a Digital Birth Certificate on launch day.

RETURN VISITORS:
If context indicates a returning visitor, open with: "Welcome back — want to pick up where we left off?"

YOUR GOAL — turn a visitor into a project snapshot:
1. Understand what they need (website, app conversion, idea, automation, or just pricing)
2. Learn their industry and rough size
3. Learn their timing
4. Call getPricing to produce an indicative range
5. Present snapshot with the 3 action buttons (the UI handles this — you just say "Here's your snapshot:" and then describe it clearly)
6. The snapshot must always include: "This is indicative only — confirmed after a 15-minute conversation with the Kyvro team."

FREE TEXT MUST WORK EVERYWHERE:
If someone goes off-flow (e.g. asks "do you do restaurant menus?" mid-conversation), handle it naturally and return to the flow. Never break.

PAGE CONTEXT (you'll receive this in the user message):
- On /pricing: "Want me to narrow that down for your situation?"
- On /idea-to-internet: "Got an idea you're sitting on? Tell me about it."
- On /contact: "I can help you fill this in — what's your project about?"
- On /services: "Which of these are you thinking about?"

API DOWN FALLBACK:
If you cannot respond, the UI falls back to a guided form. You don't need to handle this.`;

// ─── RATE LIMITING (in-memory, resets on Worker restart) ─────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 20; // max 20 requests per minute per IP

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) return false;
  entry.count++;
  return true;
}

// ─── ABUSE DETECTION ─────────────────────────────────────────────────────────
const ABUSE_PATTERNS = [
  /ignore (previous|all|above) instructions/i,
  /system prompt/i,
  /jailbreak/i,
  /you are now/i,
  /pretend you/i,
  /act as if/i,
];

function isAbusive(text: string): boolean {
  return ABUSE_PATTERNS.some((p) => p.test(text));
}

// ─── PRICING FUNCTION (deterministic) ────────────────────────────────────────
function getPricing(tier: keyof typeof PRICING) {
  const plan = PRICING[tier];
  if (!plan) return null;
  return plan;
}

// ─── TOOLS DEFINITION ────────────────────────────────────────────────────────
const tools = [
  {
    name: "getPricing",
    description:
      "Get the exact pricing for a Kyvro Digital plan. Call this whenever you need to quote a price. Never invent prices — always call this function.",
    input_schema: {
      type: "object",
      properties: {
        tier: {
          type: "string",
          enum: ["starter", "growth", "premium", "support"],
          description: "The pricing tier to retrieve",
        },
      },
      required: ["tier"],
    },
  },
];

// ─── API ROUTE ────────────────────────────────────────────────────────────────
export const APIRoute = createAPIFileRoute("/api/jayy")({
  POST: async ({ request }) => {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("X-Forwarded-For") ||
      "unknown";

    // Rate limit check
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please wait a moment." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { messages, pageContext } = body;

    // Input validation
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid messages" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Cap conversation length
    const cappedMessages = messages.slice(-20);

    // Input length cap
    const lastMessage = cappedMessages[cappedMessages.length - 1];
    if (lastMessage?.content && lastMessage.content.length > 2000) {
      return new Response(
        JSON.stringify({ error: "Message too long. Please keep it under 2000 characters." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Abuse detection
    if (lastMessage?.content && isAbusive(lastMessage.content)) {
      return new Response(
        JSON.stringify({
          error: "I can't help with that. If you have a genuine project enquiry, visit kyvrodigital.com/contact",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Build system prompt with page context
    const systemWithContext = pageContext
      ? `${SYSTEM_PROMPT}\n\nCURRENT PAGE: ${pageContext}`
      : SYSTEM_PROMPT;

    // Get API key from environment
    const apiKey = (process.env as any).ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable" }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      // Call Claude API
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          system: systemWithContext,
          tools,
          messages: cappedMessages,
        }),
      });

      const data = await response.json() as any;

      // Handle tool use
      if (data.stop_reason === "tool_use") {
        const toolUse = data.content.find((b: any) => b.type === "tool_use");
        if (toolUse && toolUse.name === "getPricing") {
          const pricingData = getPricing(toolUse.input.tier);

          // Continue conversation with tool result
          const followUp = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-6",
              max_tokens: 1024,
              system: systemWithContext,
              tools,
              messages: [
                ...cappedMessages,
                { role: "assistant", content: data.content },
                {
                  role: "user",
                  content: [
                    {
                      type: "tool_result",
                      tool_use_id: toolUse.id,
                      content: JSON.stringify(pricingData),
                    },
                  ],
                },
              ],
            }),
          });

          const followUpData = await followUp.json() as any;
          const text = followUpData.content
            ?.filter((b: any) => b.type === "text")
            .map((b: any) => b.text)
            .join("");

          return new Response(JSON.stringify({ reply: text }), {
            headers: { "Content-Type": "application/json" },
          });
        }
      }

      // Normal text response
      const text = data.content
        ?.filter((b: any) => b.type === "text")
        .map((b: any) => b.text)
        .join("");

      return new Response(JSON.stringify({ reply: text }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Jayy API error:", err);
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable" }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }
  },
});