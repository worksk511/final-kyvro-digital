import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "@tanstack/react-router";
import { X, Send, MessageCircle, Mail, Phone, FileText, RotateCcw, ChevronRight } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Snapshot {
  business: string;
  service: string;
  pages?: string;
  timeline: string;
  priceRange: string;
}

const STEPS = [
  { q: "What does your business do?", key: "business", type: "text", placeholder: "e.g. Hair salon in Canberra, personal trainer, cafe..." },
  { q: "What do you need help with?", key: "service", type: "options", options: ["Website Design", "Website-to-App Conversion ✦", "Booking System", "Client Portal", "Business Automation", "Idea to Internet ✦", "Branding", "E-commerce", "Not sure yet"] },
  { q: "What's your rough budget?", key: "budget", type: "options", options: ["Under $500 AUD", "$500–$1,000 AUD", "$1,000–$2,000 AUD", "$2,000+ AUD", "Not sure yet"] },
  { q: "When do you need this done?", key: "timeline", type: "options", options: ["ASAP", "Within a month", "1–3 months", "Just exploring"] },
];

const PRICING_MAP: Record<string, string> = {
  "Under $500 AUD": "from AUD $499 (Starter)",
  "$500–$1,000 AUD": "from AUD $999 (Growth — most popular)",
  "$1,000–$2,000 AUD": "from AUD $1,999 (Premium)",
  "$2,000+ AUD": "AUD $1,999+ (Premium / Custom)",
  "Not sure yet": "from AUD $499 — we'll recommend the right fit",
};

const BLOCK_TRIGGERS: Record<string, string> = {
  hero: "Hero / Headline", headline: "Hero / Headline", home: "Hero / Headline",
  nav: "Navigation", menu: "Navigation", booking: "Booking System",
  appointment: "Booking System", gallery: "Gallery / Photos", photo: "Gallery / Photos",
  contact: "Contact Form", enquir: "Contact Form", service: "Services Section",
  about: "About Section", shop: "Online Store", product: "Online Store",
};

function getWireframeBlocks(messages: Message[]): string[] {
  const found = new Set<string>();
  const text = messages.map((m) => m.content.toLowerCase()).join(" ");
  for (const [trigger, label] of Object.entries(BLOCK_TRIGGERS)) {
    if (text.includes(trigger)) found.add(label);
  }
  if (found.size > 0) found.add("Navigation");
  const order = ["Navigation", "Hero / Headline", "Services Section", "Booking System", "Gallery / Photos", "About Section", "Contact Form", "Online Store"];
  return order.filter((b) => found.has(b));
}

function WireframePreview({ blocks }: { blocks: string[] }) {
  if (blocks.length === 0) return null;
  const heights: Record<string, number> = {
    "Navigation": 24, "Hero / Headline": 56, "Services Section": 44,
    "Booking System": 48, "Gallery / Photos": 40, "About Section": 36,
    "Contact Form": 40, "Online Store": 44,
  };
  return (
    <div style={{ background: "#f5f1eb", border: "1px solid #e8e3dc", borderRadius: 10, padding: "12px 10px", margin: "4px 0" }}>
      <div style={{ fontSize: 10, color: "#9b9590", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Your site taking shape ✦</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {blocks.map((block, i) => (
          <div key={block} style={{
            background: block === "Hero / Headline" ? "#D29B3C20" : block === "Navigation" ? "#0A090718" : "#0A090710",
            border: `1px solid ${block === "Hero / Headline" ? "#D29B3C40" : "#0A090718"}`,
            borderRadius: 6, height: heights[block] || 36,
            display: "flex", alignItems: "center", paddingLeft: 10,
            fontSize: 10, color: block === "Hero / Headline" ? "#D29B3C" : "#6b6560",
            fontWeight: block === "Navigation" || block === "Hero / Headline" ? 600 : 400,
            opacity: 0, animation: `jayyFadeIn 0.4s ease ${i * 0.08}s forwards`,
          }}>{block}</div>
        ))}
      </div>
    </div>
  );
}

function btnStyle(bg: string, color: string, border?: string) {
  return { background: bg, color, border: border || "none", borderRadius: 8, padding: "10px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" as const, display: "flex" as const, alignItems: "center" as const, gap: 8, width: "100%" as const, justifyContent: "center" as const, fontFamily: "inherit" };
}

function SnapshotCard({ snapshot, onEmail, onWhatsApp, onForm }: { snapshot: Snapshot; onEmail: () => void; onWhatsApp: () => void; onForm: () => void; }) {
  return (
    <div style={{ background: "#0A0907", borderRadius: 12, padding: 16, marginTop: 8 }}>
      <div style={{ fontSize: 10, color: "#D29B3C", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>✦ Your Project Snapshot</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
        {[["Business", snapshot.business], ["Service", snapshot.service], snapshot.pages ? ["Scope", snapshot.pages] : null, ["Timeline", snapshot.timeline], ["Estimated range", snapshot.priceRange]].filter(Boolean).map(([label, value]) => (
          <div key={label as string} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <span style={{ fontSize: 11, color: "#6b6560", flexShrink: 0 }}>{label as string}</span>
            <span style={{ fontSize: 12, color: "#FAF7F2", fontWeight: 600, textAlign: "right" }}>{value as string}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 10, color: "#4a4540", lineHeight: 1.5, marginBottom: 14, padding: "8px 10px", background: "#ffffff08", borderRadius: 6 }}>
        Indicative only — confirmed after a 15-min conversation with the team.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button onClick={onEmail} style={btnStyle("#D29B3C", "#0A0907")}><Mail size={13} /> Send to Kyvro by Email</button>
        <button onClick={onWhatsApp} style={btnStyle("#25D366", "#fff")}><Phone size={13} /> Send on WhatsApp</button>
        <button onClick={onForm} style={btnStyle("transparent", "#FAF7F2", "1px solid #2a2824")}><FileText size={13} /> Fill Our Quote Form</button>
      </div>
    </div>
  );
}

const SESSION_KEY = "jayy_v3";
const POPUP_KEY = "jayy_popped_v2";
const WHATSAPP = "61493034590";
const EMAIL = "info@kyvrodigital.com";

const PAGE_GREETINGS: Record<string, string> = {
  "/pricing": "Hey — I'm Jayy 👋 I can help you figure out which package fits your situation. What does your business do?",
  "/idea-to-internet": "Hey — I'm Jayy 👋 Got an idea you're sitting on? Tell me about it.",
  "/contact": "Hey — I'm Jayy 👋 I can help you fill this in. What's your project about?",
  "/services": "Hey — I'm Jayy 👋 Which of our services caught your eye?",
};
const DEFAULT_GREETING = "Hey — I'm Jayy, your Kyvro assistant 👋\n\nTell me about your business and I'll help you figure out what you need online.";

export function JayyWidget() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFallback, setShowFallback] = useState(false);
  const [initiated, setInitiated] = useState(false);
  const [showPopupHint, setShowPopupHint] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const p = JSON.parse(saved);
        if (p.messages) setMessages(p.messages);
        if (p.snapshot) setSnapshot(p.snapshot);
        if (p.answers) setAnswers(p.answers);
        if (p.step !== undefined) setStep(p.step);
        if (p.showFallback) setShowFallback(p.showFallback);
        if (p.initiated) setInitiated(p.initiated);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ messages, snapshot, answers, step, showFallback, initiated })); } catch {}
  }, [messages, snapshot, answers, step, showFallback, initiated]);

  useEffect(() => {
    const hasPopped = sessionStorage.getItem(POPUP_KEY);
    if (!hasPopped) {
      const t = setTimeout(() => { setShowPopupHint(true); sessionStorage.setItem(POPUP_KEY, "1"); }, 4000);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading, snapshot]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 150); }, [open]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape" && open) setOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open]);

  const initJayy = useCallback(() => {
    if (initiated) return;
    const greeting = PAGE_GREETINGS[location.pathname] || DEFAULT_GREETING;
    setMessages([{ role: "assistant", content: greeting }]);
    setInitiated(true);
    // Check if API is available
    fetch("/api/jayy", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: [{ role: "user", content: "ping" }], pageContext: location.pathname }) })
      .then(r => { if (!r.ok) setShowFallback(true); })
      .catch(() => setShowFallback(true));
  }, [initiated, location.pathname]);

  const handleOpen = () => { setOpen(true); setShowPopupHint(false); if (!initiated) initJayy(); };

  const sendMessage = useCallback(async (text?: string) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput("");
    const userMsg: Message = { role: "user", content: userText };
    const updatedMsgs = [...messages, userMsg];
    setMessages(updatedMsgs);
    setLoading(true);
    try {
      const res = await fetch("/api/jayy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMsgs.map(m => ({ role: m.role, content: m.content })), pageContext: location.pathname }),
      });
      if (res.status === 429) { setMessages(prev => [...prev, { role: "assistant", content: "Just a moment — try again in a minute." }]); return; }
      if (!res.ok) throw new Error();
      const data = await res.json();
      const reply: string = data.reply || "";
      // Detect snapshot trigger words
      const lower = reply.toLowerCase();
      if ((lower.includes("snapshot") || lower.includes("here's what i've noted") || lower.includes("here is what i've noted")) && answers.service) {
        const priceMatch = reply.match(/\$[\d,]+(?:\s*[-–—]\s*\$[\d,]+)?(?:\s*AUD)?/i);
        setSnapshot({
          business: answers.business || userText,
          service: answers.service,
          timeline: answers.timeline || "To be confirmed",
          priceRange: priceMatch ? priceMatch[0] : PRICING_MAP[answers.budget || ""] || "from AUD $499",
        });
      }
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch { setShowFallback(true); } finally { setLoading(false); }
  }, [input, messages, loading, location.pathname, answers]);

  const handleFallbackAnswer = (value: string) => {
    const current = STEPS[step];
    const newAnswers = { ...answers, [current.key]: value };
    setAnswers(newAnswers);
    const userMsg: Message = { role: "user", content: value };
    const nextStep = step + 1;
    if (nextStep < STEPS.length) {
      setStep(nextStep);
      setMessages(prev => [...prev, userMsg, { role: "assistant", content: STEPS[nextStep].q }]);
    } else {
      const snap: Snapshot = {
        business: newAnswers.business || "Your business",
        service: newAnswers.service || "Website Design",
        timeline: newAnswers.timeline || "To be confirmed",
        priceRange: PRICING_MAP[newAnswers.budget || ""] || "from AUD $499",
      };
      setSnapshot(snap);
      setMessages(prev => [...prev, userMsg, { role: "assistant", content: "Here's your project snapshot. Choose how you'd like to move forward:" }]);
    }
  };

  const handleFallbackText = () => { const t = input.trim(); if (!t) return; setInput(""); handleFallbackAnswer(t); };
  const handleReset = () => { setMessages([]); setSnapshot(null); setAnswers({}); setStep(0); setInitiated(false); setShowFallback(false); sessionStorage.removeItem(SESSION_KEY); setTimeout(() => initJayy(), 100); };

  const handleEmail = () => {
    if (!snapshot) return;
    const body = `Hi Kyvro Digital,\n\nHere's my project snapshot:\n\nBusiness: ${snapshot.business}\nService: ${snapshot.service}\nTimeline: ${snapshot.timeline}\nBudget: ${snapshot.priceRange}\n\nLooking forward to chatting!\n\nKind regards`;
    window.location.href = `mailto:${EMAIL}?subject=Project Enquiry — ${snapshot.service}&body=${encodeURIComponent(body)}`;
  };
  const handleWhatsApp = () => {
    if (!snapshot) return;
    const text = `Hi Kyvro Digital 👋\n\nProject snapshot:\n\n📋 *${snapshot.business}*\nService: ${snapshot.service}\nTimeline: ${snapshot.timeline}\nBudget: ${snapshot.priceRange}\n\nWould love to chat!`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
  };
  const handleForm = () => {
    if (!snapshot) return;
    window.location.href = `/contact?service=${encodeURIComponent(snapshot.service)}&details=${encodeURIComponent(`Business: ${snapshot.business}. Timeline: ${snapshot.timeline}. Budget: ${snapshot.priceRange}.`)}`;
  };

  const wireBlocks = getWireframeBlocks(messages);
  const currentStep = STEPS[step];

  return (
    <>
      <style>{`
        @keyframes jayyFadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes jayySlideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes jayyPulse{0%,80%,100%{opacity:0.3}40%{opacity:1}}
        @keyframes jayyPop{from{opacity:0;transform:scale(0.85) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
        .jayy-panel{animation:jayySlideUp 0.28s cubic-bezier(.16,1,.3,1)}
        .jayy-msg{animation:jayyFadeIn 0.3s ease}
        .jayy-input:focus{outline:none;border-color:#D29B3C!important;box-shadow:0 0 0 2px #D29B3C20}
        .jayy-opt:hover{background:#f0ebe3!important;border-color:#D29B3C!important}
        @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
      `}</style>

      {!open && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
          {showPopupHint && (
            <div onClick={handleOpen} style={{ background: "#0A0907", color: "#FAF7F2", borderRadius: "12px 12px 4px 12px", padding: "12px 16px", fontSize: 13, maxWidth: 230, lineHeight: 1.45, boxShadow: "0 8px 28px rgba(0,0,0,0.22)", cursor: "pointer", animation: "jayyPop 0.4s cubic-bezier(.16,1,.3,1)" }}>
              Hey 👋 I'm Jayy — I can help you figure out what you need online.
              <div style={{ color: "#D29B3C", fontSize: 11, marginTop: 8, fontWeight: 600 }}>Tap to chat →</div>
            </div>
          )}
          <button onClick={handleOpen} aria-label="Open Jayy assistant"
            style={{ width: 56, height: 56, borderRadius: "50%", background: "#0A0907", border: "2px solid #D29B3C", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.25)", position: "relative", transition: "transform 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
            <MessageCircle size={22} color="#D29B3C" />
            <span style={{ position: "absolute", top: 0, right: 0, width: 14, height: 14, background: "#D29B3C", borderRadius: "50%", border: "2px solid #FAF7F2" }} />
          </button>
        </div>
      )}

      {open && (
        <div className="jayy-panel" role="dialog" aria-label="Jayy assistant" aria-modal="true"
          style={{ position: "fixed", bottom: 24, right: 24, width: "min(400px, calc(100vw - 32px))", height: "min(620px, calc(100vh - 48px))", background: "#FAF7F2", border: "1px solid #e8e3dc", borderRadius: 16, boxShadow: "0 24px 64px rgba(0,0,0,0.22)", display: "flex", flexDirection: "column", zIndex: 9999, overflow: "hidden" }}>
          <div style={{ background: "#0A0907", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#D29B3C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#0A0907" }}>J</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#FAF7F2" }}>Jayy</div>
                <div style={{ fontSize: 10, color: "#6b6560" }}>Kyvro Digital · instant replies</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={handleReset} title="Start over" style={{ background: "none", border: "none", cursor: "pointer", color: "#6b6560", padding: 4 }}><RotateCcw size={13} /></button>
              <button onClick={() => setOpen(false)} aria-label="Close" style={{ background: "none", border: "none", cursor: "pointer", color: "#6b6560", padding: 4 }}><X size={16} /></button>
            </div>
          </div>

          <div role="log" aria-live="polite" style={{ flex: 1, overflowY: "auto", padding: "14px 14px 8px", display: "flex", flexDirection: "column", gap: 8 }}>
            {messages.map((msg, i) => (
              <div key={i} className="jayy-msg" style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-start" }}>
                {msg.role === "assistant" && <div style={{ width: 24, height: 24, borderRadius: 6, background: "#D29B3C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#0A0907", flexShrink: 0, marginRight: 8, marginTop: 2 }}>J</div>}
                <div style={{ maxWidth: "82%", background: msg.role === "user" ? "#0A0907" : "#fff", color: msg.role === "user" ? "#FAF7F2" : "#0A0907", border: msg.role === "assistant" ? "1px solid #e8e3dc" : "none", borderRadius: msg.role === "user" ? "12px 12px 4px 12px" : "4px 12px 12px 12px", padding: "10px 13px", fontSize: 13, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {wireBlocks.length > 0 && messages.length > 2 && <div style={{ paddingLeft: 32 }}><WireframePreview blocks={wireBlocks} /></div>}
            {snapshot && <div style={{ paddingLeft: 32 }}><SnapshotCard snapshot={snapshot} onEmail={handleEmail} onWhatsApp={handleWhatsApp} onForm={handleForm} /></div>}

            {showFallback && !snapshot && currentStep?.type === "options" && (
              <div style={{ paddingLeft: 32, display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                {currentStep.options?.map(opt => (
                  <button key={opt} className="jayy-opt" onClick={() => handleFallbackAnswer(opt)}
                    style={{ background: "#fff", border: "1px solid #e8e3dc", borderRadius: 20, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", color: "#0A0907", transition: "all 0.15s" }}>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="jayy-msg" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: "#D29B3C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#0A0907", flexShrink: 0 }}>J</div>
                <div style={{ background: "#fff", border: "1px solid #e8e3dc", borderRadius: "4px 12px 12px 12px", padding: "12px 16px", display: "flex", gap: 4 }}>
                  {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#D29B3C", animation: `jayyPulse 1.2s ease ${i*0.2}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {!snapshot && (
            <div style={{ padding: "10px 14px 14px", borderTop: "1px solid #e8e3dc", flexShrink: 0, background: "#FAF7F2" }}>
              {showFallback && currentStep?.type === "text" ? (
                <div style={{ display: "flex", gap: 8 }}>
                  <input ref={inputRef} className="jayy-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") handleFallbackText(); }} placeholder={currentStep.placeholder || "Type here..."}
                    style={{ flex: 1, border: "1px solid #e8e3dc", borderRadius: 8, padding: "9px 13px", fontSize: 13, fontFamily: "inherit", background: "#fff", color: "#0A0907", transition: "all 0.15s" }} />
                  <button onClick={handleFallbackText} style={{ background: "#0A0907", color: "#FAF7F2", border: "none", borderRadius: 8, padding: "9px 13px", cursor: "pointer" }}><ChevronRight size={15} /></button>
                </div>
              ) : !showFallback ? (
                <div style={{ display: "flex", gap: 8 }}>
                  <input ref={inputRef} className="jayy-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} placeholder="Ask anything..." disabled={loading} aria-label="Message Jayy"
                    style={{ flex: 1, border: "1px solid #e8e3dc", borderRadius: 8, padding: "9px 13px", fontSize: 13, fontFamily: "inherit", background: "#fff", color: "#0A0907", transition: "all 0.15s" }} />
                  <button onClick={() => sendMessage()} disabled={loading || !input.trim()} aria-label="Send"
                    style={{ background: input.trim() && !loading ? "#0A0907" : "#e8e3dc", color: input.trim() && !loading ? "#FAF7F2" : "#9b9590", border: "none", borderRadius: 8, padding: "9px 13px", cursor: input.trim() ? "pointer" : "default", transition: "all 0.15s" }}>
                    <Send size={14} />
                  </button>
                </div>
              ) : null}
              <div style={{ fontSize: 10, color: "#c0b8b0", textAlign: "center", marginTop: 8 }}>Kyvro Digital · kyvrodigital.com</div>
            </div>
          )}

          {snapshot && (
            <div style={{ padding: "10px 14px 14px", borderTop: "1px solid #e8e3dc", flexShrink: 0, textAlign: "center" }}>
              <button onClick={handleReset} style={{ background: "none", border: "none", color: "#6b6560", fontSize: 12, cursor: "pointer", textDecoration: "underline", fontFamily: "inherit" }}>Start a new conversation</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
