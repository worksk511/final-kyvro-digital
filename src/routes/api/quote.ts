import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  business: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  helpWith: z.string().min(1).max(60),
  hasWebsite: z.enum(["yes", "no"]),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  timeline: z.string().trim().max(120).optional().or(z.literal("")),
  details: z.string().trim().max(2000).optional().or(z.literal("")),
});

const TO_EMAIL = "info@kyvrodigital.com";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const Route = createFileRoute("/api/quote")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = schema.safeParse(payload);
        if (!parsed.success) {
          return Response.json(
            { error: "Invalid data", details: parsed.error.flatten() },
            { status: 400 }
          );
        }

        const v = parsed.data;

        // 1) Persist to database
        const { error: dbError } = await supabaseAdmin
          .from("quote_enquiries")
          .insert({
            name: v.name,
            business: v.business || null,
            email: v.email,
            phone: v.phone || null,
            help_with: v.helpWith,
            has_website: v.hasWebsite,
            timeline: v.timeline ? `${v.budget ? `[Budget: ${v.budget}] ` : ""}${v.timeline}` : (v.budget ? `[Budget: ${v.budget}]` : null),
            details: v.details || null,
          });

        if (dbError) {
          console.error("DB insert error:", dbError);
          return Response.json(
            { error: "Could not save enquiry" },
            { status: 500 }
          );
        }

        // 2) Send email via Resend
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        if (!RESEND_API_KEY) {
          console.error("RESEND_API_KEY missing");
          return Response.json({ ok: true, emailed: false });
        }

        const rows: Array<[string, string]> = [
          ["Name", v.name],
          ["Business", v.business || "—"],
          ["Email", v.email],
          ["Phone", v.phone || "—"],
          ["Needs help with", v.helpWith],
          ["Has website?", v.hasWebsite],
          ["Budget", v.budget || "—"],
          ["Timeline", v.timeline || "—"],
          ["Details", v.details || "—"],
        ];

        const html = `
          <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#0E0E0F;">
            <h2 style="font-family:Georgia,serif;font-size:22px;margin:0 0 4px;">New Kyvro Digital Enquiry</h2>
            <p style="color:#777;font-size:13px;margin:0 0 20px;">Submitted from kyvrodigital.com</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              ${rows
                .map(
                  ([k, val]) => `
                <tr>
                  <td style="padding:10px 12px;background:#FAF7F2;border:1px solid #E8E2D6;width:170px;font-weight:600;vertical-align:top;">${escapeHtml(k)}</td>
                  <td style="padding:10px 12px;border:1px solid #E8E2D6;white-space:pre-wrap;">${escapeHtml(val)}</td>
                </tr>`
                )
                .join("")}
            </table>
          </div>
        `;

        const text = rows.map(([k, val]) => `${k}: ${val}`).join("\n");

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: "Kyvro Digital <onboarding@resend.dev>",
              to: [TO_EMAIL],
              reply_to: v.email,
              subject: `New enquiry — ${v.name}${v.business ? ` (${v.business})` : ""}`,
              html,
              text,
            }),
          });
          if (!res.ok) {
            const errBody = await res.text();
            console.error("Resend error:", res.status, errBody);
            return Response.json({ ok: true, emailed: false });
          }
        } catch (err) {
          console.error("Resend fetch failed:", err);
          return Response.json({ ok: true, emailed: false });
        }

        return Response.json({ ok: true, emailed: true });
      },
    },
  },
});
