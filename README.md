<div align="center">

# Kyvro Digital

**The website for Kyvro Digital, my web studio in Canberra.**

[kyvrodigital.com](https://kyvrodigital.com)

![React](https://img.shields.io/badge/React_19-0b1220?style=flat-square&logo=react&logoColor=22d3ee)
![TypeScript](https://img.shields.io/badge/TypeScript-0b1220?style=flat-square&logo=typescript&logoColor=22d3ee)
![TanStack](https://img.shields.io/badge/TanStack_Start-0b1220?style=flat-square&logo=reactquery&logoColor=3dfc9e)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-0b1220?style=flat-square&logo=tailwindcss&logoColor=3dfc9e)
![Supabase](https://img.shields.io/badge/Supabase-0b1220?style=flat-square&logo=supabase&logoColor=a78bfa)
![Cloudflare](https://img.shields.io/badge/Cloudflare_Workers-0b1220?style=flat-square&logo=cloudflare&logoColor=a78bfa)

</div>

---

## What it does

- **Marketing site.** Home, Services, Pricing, About, Contact and an *Idea to Internet* page for first-time founders. Responsive and mobile-first.
- **Quote enquiry form.** `POST /api/quote` validates the input on the server with Zod, saves the enquiry to a Postgres table in Supabase and emails the details to the studio inbox through Resend.
- **Jayy, the AI assistant.** `POST /api/jayy` is a chat widget backed by the Claude API. It is set up so it can't invent prices:
  - Prices live in one config object in the code.
  - The model has to call a `getPricing` tool to quote anything, so it only gives prices that match the Pricing page.
  - It follows rules on tone and has limits on what it may claim.
  - Requests are rate limited by IP address.

## Security choices

- **Locked-down table.** Row Level Security is on for `quote_enquiries`. Visitors can only insert rows; there is no read policy, so enquiries can't be read from the browser.
- **Server-only writes and keys.** Database writes use a server-only Supabase client, and API keys are read from environment variables and never sent to the browser.
- **Escaped emails.** Email content is HTML-escaped before it is sent.

## Tech stack

| Layer | Tools |
|---|---|
| Framework | TanStack Start, TanStack Router, React 19, TypeScript, Vite |
| UI | Tailwind CSS v4, Radix UI / shadcn components, Lucide icons |
| Forms | React Hook Form, Zod |
| Data | Supabase (Postgres with Row Level Security) |
| Email | Resend |
| AI | Claude API, using tool calls |
| Hosting | Cloudflare Workers (Wrangler) |

## Project structure

```
src/
  routes/            pages (index, services, pricing, about, contact, idea-to-internet)
  routes/api/        server endpoints: quote.ts, jayy.ts
  components/site/   Header, Footer, Section, CtaButton, JayyWidget
  integrations/      Supabase browser and server clients
  lib/content.ts     site copy and service data
supabase/migrations/ database schema and RLS policies
```

## Running locally

```bash
npm install
npm run dev
```

Create a `.env.local` file (or `.dev.vars` for Wrangler). Both are git-ignored. Add:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
ANTHROPIC_API_KEY=
```

Other scripts:

- `npm run build`: build the site.
- `npm run lint`: check the code with ESLint.
- `npm run format`: format the code with Prettier.

## Notes

The project was scaffolded with Lovable and is deployed to Cloudflare Workers.

---

<sub>Built by <a href="https://github.com/worksk511">Jahnvi Singh</a> · <a href="https://jahnvi-singh.netlify.app">portfolio</a></sub>
