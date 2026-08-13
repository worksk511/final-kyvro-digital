import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "@tanstack/react-router";
import { X, Send, MessageCircle, Mail, Phone, FileText, RotateCcw } from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "assistant";
  content: string;
  isSnapshot?: boolean;
  snapshot?: Snapshot;
}

interface Snapshot {
  business: string;
  service: string;
  pages?: string;
  timeline: string;
  priceRange: string;
}

interface WireframeBlock {
  type: "hero" | "nav" | "booking" | "gallery" | "contact" | "services" | "about";
  label: string;
}

// ─── WIREFRAME PREVIEW ────────────────────────────────────────────────────────
const WIREFRAME_TRIGGERS: Record<string, WireframeBlock["type"]> = {
  hero: "hero",
  headline: "hero",
  home: "hero",
  landing: "hero",
  navigation: "nav",
  menu: "nav",
  nav: "nav",
  booking: "booking",
  appointments: "booking",
  book: "booking",
  gallery: "gallery",
  photos: "gallery",
  portfolio: "gallery",
  contact: "contact",
  enquir: "contact",
  form: "contact",
  services: "services",
  service: "services",
  about: "about",
  story: "about",
};

function detectBlocks(messages: Message[]): WireframeBlock[] {
  const found = new Set<WireframeBlock["type"]>();
  const allText = messages.map((m) => m.content.toLowerCase()).join(" ");

  for (const [trigger, blockType] of Object.entries(WIREFRAME_TRIGGERS)) {
    if (allText.includes(trigger)) found.add(blockType);
  }

  // Always show nav if any block found
  if (found.size > 0) found.add("nav");

  const ORDER: WireframeBlock["type"][] = ["nav", "hero", "services", "booking", "gallery", "about", "contact"];
  const LABELS: Record<WireframeBlock["type"], string> = {
    nav: "Navigation",
    hero: "Hero / Headline",
    services: "Services",
    booking: "Booking",
    gallery: "Gallery",
    about: "About",
    contact: "Contact",
  };

  return ORDER.filter((t) => found.has(t)).map((t) => ({ type: t, label: LABELS[t] }));
}

function WireframePreview({ blocks }: { blocks: WireframeBlock[] }) {
  if (blocks.length === 0) return null;

  const heights: Record<WireframeBlock["type"], string> = {
    nav: "20px",
    hero: "52px",
    services: "44px",
    booking: "48px",
    gallery: "40px",
    about: "36px",
    contact: "40px",
  };

  return (
    <div
      style={{
        background: "#f5f1eb",
        border: "1px solid #e8e3dc",
        borderRadius: 10,
        padding: "12px 10px",
        margin: "8px 0",
      }}
    >
      <div style={{ fontSize: 10, color: "#9b9590", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
        Your site taking shape ↓
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {blocks.map((block, i) => (
          <div
            key={block.type}
            style={{
              background: block.type === "hero" ? "#D29B3C20" : block.type === "nav" ? "#0A090720" : "#0A090710",
              border: `1px solid ${block.type === "hero" ? "#D29B3C40" : "#0A090720"}`,
              borderRadius: 6,
              height: heights[block.type],
              display: "flex",
              alignItems: "center",
              paddingLeft: 10,
              fontSize: 10,
              color: block.type === "hero" ? "#D29B3C" : "#6b6560",
              fontWeight: block.type === "nav" || block.type === "hero" ? 600 : 400,
              animation: `fadeIn 0.4s ease ${i * 0.1}s both`,
            }}
          >
            {block.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SNAPSHOT CARD ────────────────────────────────────────────────────────────
function SnapshotCard({ snapshot, onEmail, onWhatsApp, onForm }: {
  snapshot: Snapshot;
  onEmail: () => void;
  onWhatsApp: () => void;
  onForm: () => void;
}) {
  return (
    <div
      style={{
        background: "#0A0907",
        borderRadius: 12,
        padding: 16,
        margin: "8px 0",
      }}
    >
      <div style={{ fontSize: 10, color: "#D29B3C", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
        ✦ Project Snapshot
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {[
          ["Business", snapshot.business],
          ["Service", snapshot.service],
          snapshot.pages ? ["Scope", snapshot.pages] : null,
          ["Timeline", snapshot.timeline],
          ["Estimated range", snapshot.priceRange],
        ].filter(Boolean).map(([label, value]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 11, color: "#6b6560" }}>{label}</span>
            <span style={{ fontSize: 12, color: "#FAF7F2", fontWeight: 600, textAlign: "right", maxWidth: "60%" }}>{value}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 10, color: "#4a4540", lineHeight: 1.5, marginBottom: 14 }}>
        This is indicative only — confirmed after a 15-minute conversation with the Kyvro team.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button
          onClick={onEmail}
          style={{
            background: "#D29B3C",
            color: "#0A0907",
            border: "none",
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            width: "100%",
            justifyContent: "center",
            fontFamily: "inherit",
          }}
        >
          <Mail size={13} /> Send to Kyvro by Email
        </button>
        <button
          onClick={onWhatsApp}
          style={{
            background: "#25D366",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            width: "100%",
            justifyContent: "center",
            fontFamily: "inherit",
          }}
        >
          <Phone size={13} /> Send on WhatsApp
        </button>
        <button
          onClick={onForm}
          style={{
            background: "transparent",
            color: "#FAF7F2",
            border: "1px solid #2a2824",
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            width: "100%",
            justifyContent: "center",
            fontFamily: "inherit",
          }}
        >
          <FileText size={13} /> Fill Our Quote Form
        </button>
      </div>
    </div>
  );
}

// ─── FALLBACK GUIDED FLOW ─────────────────────────────────────────────────────
const FALLBACK_STEPS = [
  { q: "What does your business do?", key: "business" },
  { q: "What do you need help with?", key: "service", options: ["Website Design", "Website-to-App", "Booking System", "Automation", "Idea to Internet", "Not sure yet"] },
  { q: "What's your rough budget?", key: "budget", options: ["Under $500", "$500–$1,000", "$1,000–$2,000", "$2,000+", "Not sure"] },
  { q: "When do you need this?", key: "timeline", options: ["ASAP", "Within a month", "1–3 months", "Just exploring"] },
];

function FallbackFlow({ onComplete }: { onComplete: (data: any) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [text, setText] = useState("");

  const current = FALLBACK_STEPS[step];

  const next = (value: string) => {
    const updated = { ...answers, [current.key]: value };
    setAnswers(updated);
    setText("");
    if (step < FALLBACK_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(updated);
    }
  };

  return (
    <div style={{ padding: "8px 0" }}>
      <div style={{ fontSize: 13, color: "#0A0907", marginBottom: 12, lineHeight: 1.5 }}>{current.q}</div>
      {current.options ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {current.options.map((opt) => (
            <button
              key={opt}
              onClick={() => next(opt)}
              style={{
                background: "#f5f1eb",
                border: "1px solid #e8e3dc",
                borderRadius: 20,
                padding: "6px 14px",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "inherit",
                color: "#0A0907",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && text && next(text)}
            placeholder="Type your answer..."
            style={{
              flex: 1,
              border: "1px solid #e8e3dc",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 13,
              fontFamily: "inherit",
              outline: "none",
            }}
          />
          <button
            onClick={() => text && next(text)}
            style={{
              background: "#0A0907",
              color: "#FAF7F2",
              border: "none",
              borderRadius: 8,
              padding: "8px 14px",
              cursor: "pointer",
            }}
          >
            <Send size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── MAIN JAYY WIDGET ─────────────────────────────────────────────────────────
const SESSION_KEY = "jayy_conversation";
const WHATSAPP_NUMBER = "61493034590";
const KYVRO_EMAIL = "info@kyvrodigital.com";

export function JayyWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiDown, setApiDown] = useState(false);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const pageContext = location.pathname;

  // Load session from storage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setMessages(parsed.messages || []);
        setSnapshot(parsed.snapshot || null);
      }
    } catch {}
  }, []);

  // Save session to storage
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ messages, snapshot }));
    } catch {}
  }, [messages, snapshot]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Keyboard: Escape closes
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Parse snapshot from assistant message
  const parseSnapshot = (text: string): Snapshot | null => {
    if (!text.toLowerCase().includes("snapshot")) return null;
    // Very simple heuristic — if the model produces a snapshot format
    const lines = text.split("\n");
    const snap: Partial<Snapshot> = {};

    for (const line of lines) {
      if (line.match(/business[:\-]/i)) snap.business = line.split(/[:\-]/)[1]?.trim();
      if (line.match(/service[:\-]/i)) snap.service = line.split(/[:\-]/)[1]?.trim();
      if (line.match(/scope[:\-]/i)) snap.pages = line.split(/[:\-]/)[1]?.trim();
      if (line.match(/timeline[:\-]/i)) snap.timeline = line.split(/[:\-]/)[1]?.trim();
      if (line.match(/estimated|range|price|from/i) && line.match(/\$\d/)) {
        snap.priceRange = line.split(/[:\-]/)[1]?.trim() || line.trim();
      }
    }

    if (snap.business && snap.service && snap.priceRange) {
      return {
        business: snap.business,
        service: snap.service,
        pages: snap.pages,
        timeline: snap.timeline || "To be confirmed",
        priceRange: snap.priceRange,
      };
    }
    return null;
  };

  const sendMessage = useCallback(async (text?: string) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    setInput("");
    const userMessage: Message = { role: "user", content: userText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const apiMessages = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/jayy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          pageContext,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        if (res.status === 429) {
          setMessages((prev) => [...prev, { role: "assistant", content: "Just a moment — I'm getting a lot of questions. Try again in a minute." }]);
        } else if (res.status === 400 && err.error?.includes("I can't help")) {
          setMessages((prev) => [...prev, { role: "assistant", content: err.error }]);
        } else {
          throw new Error("API error");
        }
        return;
      }

      const data = await res.json();
      const reply = data.reply;

      // Check for snapshot
      const parsedSnapshot = parseSnapshot(reply);
      if (parsedSnapshot) setSnapshot(parsedSnapshot);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
          isSnapshot: !!parsedSnapshot,
          snapshot: parsedSnapshot || undefined,
        },
      ]);
    } catch {
      setApiDown(true);
    } finally {
      setLoading(false);
    }
  }, [input, messages, loading, pageContext]);

  // First message when opened
  const initJayy = useCallback(async () => {
    if (messages.length > 0) return;
    setLoading(true);

    const openingByPage: Record<string, string> = {
      "/pricing": "Hey — I'm Jayy, your Kyvro assistant. Want me to narrow down that pricing for your specific situation?",
      "/idea-to-internet": "Hey — I'm Jayy, your Kyvro assistant. Got an idea you're sitting on? Tell me about it.",
      "/contact": "Hey — I'm Jayy, your Kyvro assistant. I can help you fill in the quote form — what's your project about?",
      "/services": "Hey — I'm Jayy, your Kyvro assistant. Which of our services are you thinking about?",
    };

    const opening = openingByPage[pageContext] || "Hey — I'm Jayy, your Kyvro assistant. What can I help you with today?";

    setMessages([{ role: "assistant", content: opening }]);
    setLoading(false);
  }, [messages.length, pageContext]);

  const handleOpen = () => {
    setOpen(true);
    initJayy();
  };

  const handleReset = () => {
    setMessages([]);
    setSnapshot(null);
    sessionStorage.removeItem(SESSION_KEY);
    initJayy();
  };

  // Snapshot action handlers
  const handleEmail = () => {
    if (!snapshot) return;
    const body = `Hi Kyvro Digital team,\n\nI've been chatting with Jayy and here's my project snapshot:\n\nBusiness: ${snapshot.business}\nService: ${snapshot.service}${snapshot.pages ? `\nScope: ${snapshot.pages}` : ""}\nTimeline: ${snapshot.timeline}\nEstimated range: ${snapshot.priceRange}\n\nLooking forward to a 15-minute conversation to confirm the details.\n\nKind regards`;
    window.location.href = `mailto:${KYVRO_EMAIL}?subject=Project Enquiry — ${snapshot.service}&body=${encodeURIComponent(body)}`;
  };

  const handleWhatsApp = () => {
    if (!snapshot) return;
    const text = `Hi Kyvro Digital 👋\n\nHere's my project snapshot from your website:\n\n📋 *${snapshot.business}*\nService: ${snapshot.service}\nTimeline: ${snapshot.timeline}\nBudget range: ${snapshot.priceRange}\n\nWould love to chat!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleForm = () => {
    if (!snapshot) return;
    const params = new URLSearchParams({
      service: snapshot.service,
      details: `Business: ${snapshot.business}. Timeline: ${snapshot.timeline}. Budget range: ${snapshot.priceRange}.`,
    });
    window.location.href = `/contact?${params.toString()}`;
  };

  const wireframeBlocks = detectBlocks(messages);

  return (
    <>
      {/* CSS */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
        .jayy-input:focus { outline: none; border-color: #D29B3C !important; }
        .jayy-panel { animation: slideUp 0.25s ease; }
      `}</style>

      {/* Floating button */}
      {!open && (
        <button
          onClick={handleOpen}
          aria-label="Open Jayy assistant"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#0A0907",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            zIndex: 9999,
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <MessageCircle size={22} color="#FAF7F2" />
          <span
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 14,
              height: 14,
              background: "#D29B3C",
              borderRadius: "50%",
              border: "2px solid #FAF7F2",
            }}
          />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="jayy-panel"
          role="dialog"
          aria-label="Jayy assistant"
          aria-modal="true"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: "min(400px, calc(100vw - 32px))",
            height: "min(600px, calc(100vh - 48px))",
            background: "#FAF7F2",
            border: "1px solid #e8e3dc",
            borderRadius: 16,
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#0A0907",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "#D29B3C",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 800,
                  color: "#0A0907",
                }}
              >
                J
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#FAF7F2" }}>Jayy</div>
                <div style={{ fontSize: 10, color: "#6b6560" }}>Kyvro Digital assistant</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={handleReset}
                aria-label="Start over"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#6b6560", padding: 4 }}
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#6b6560", padding: 4 }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            role="log"
            aria-live="polite"
            aria-label="Conversation"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {/* API down — show fallback */}
            {apiDown ? (
              <div>
                <div style={{ fontSize: 13, color: "#0A0907", marginBottom: 12 }}>
                  I'm having trouble connecting right now. Let me collect your details the old-fashioned way:
                </div>
                <FallbackFlow
                  onComplete={(data) => {
                    setApiDown(false);
                    const summary = `Thanks! Here's what I've noted:\n\nBusiness: ${data.business}\nService: ${data.service}\nBudget: ${data.budget}\nTimeline: ${data.timeline}\n\nHead to our quote form to send this through — or WhatsApp us directly.`;
                    setMessages([{ role: "assistant", content: summary }]);
                  }}
                />
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                      animation: "fadeIn 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "85%",
                        background: msg.role === "user" ? "#0A0907" : "#fff",
                        color: msg.role === "user" ? "#FAF7F2" : "#0A0907",
                        border: msg.role === "assistant" ? "1px solid #e8e3dc" : "none",
                        borderRadius: msg.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                        padding: "10px 13px",
                        fontSize: 13,
                        lineHeight: 1.55,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {msg.content}
                      {/* Snapshot card */}
                      {msg.isSnapshot && msg.snapshot && (
                        <SnapshotCard
                          snapshot={msg.snapshot}
                          onEmail={handleEmail}
                          onWhatsApp={handleWhatsApp}
                          onForm={handleForm}
                        />
                      )}
                    </div>
                  </div>
                ))}

                {/* Wireframe preview — shown between messages */}
                {wireframeBlocks.length > 0 && messages.length > 2 && (
                  <WireframePreview blocks={wireframeBlocks} />
                )}

                {/* Show snapshot buttons if snapshot exists but not in message */}
                {snapshot && !messages.some((m) => m.isSnapshot) && (
                  <SnapshotCard
                    snapshot={snapshot}
                    onEmail={handleEmail}
                    onWhatsApp={handleWhatsApp}
                    onForm={handleForm}
                  />
                )}

                {/* Typing indicator */}
                {loading && (
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div
                      style={{
                        background: "#fff",
                        border: "1px solid #e8e3dc",
                        borderRadius: "12px 12px 12px 4px",
                        padding: "12px 16px",
                        display: "flex",
                        gap: 4,
                        alignItems: "center",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#D29B3C",
                            animation: `pulse 1.2s ease ${i * 0.2}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          {!apiDown && (
            <div
              style={{
                padding: "12px 14px",
                borderTop: "1px solid #e8e3dc",
                display: "flex",
                gap: 8,
                flexShrink: 0,
                background: "#FAF7F2",
              }}
            >
              <input
                ref={inputRef}
                className="jayy-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask anything..."
                disabled={loading}
                aria-label="Message Jayy"
                style={{
                  flex: 1,
                  border: "1px solid #e8e3dc",
                  borderRadius: 8,
                  padding: "9px 13px",
                  fontSize: 13,
                  fontFamily: "inherit",
                  background: "#fff",
                  color: "#0A0907",
                  transition: "border-color 0.15s",
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                style={{
                  background: input.trim() ? "#0A0907" : "#e8e3dc",
                  color: input.trim() ? "#FAF7F2" : "#9b9590",
                  border: "none",
                  borderRadius: 8,
                  padding: "9px 13px",
                  cursor: input.trim() ? "pointer" : "default",
                  transition: "background 0.15s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Send size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
