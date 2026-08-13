import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "@tanstack/react-router";
import { X, Send, Mail, Phone, FileText, RotateCcw, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Snapshot {
  business: string;
  service: string;
  timeline: string;
  priceRange: string;
}

// ─── GUIDED STEPS ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    q: "What does your business do?",
    sub: "Tell me anything — industry, location, what you sell or offer.",
    key: "business",
    type: "text",
    placeholder: "e.g. Yoga studio in Melbourne, personal trainer, café...",
  },
  {
    q: "What do you need help with?",
    sub: "Pick the one that fits best.",
    key: "service",
    type: "options",
    options: [
      "Website Design",
      "Website-to-App Conversion",
      "Booking System",
      "Client Portal",
      "Business Automation",
      "Idea to Internet",
      "Branding & Identity",
      "E-commerce Setup",
      "Not sure yet",
    ],
  },
  {
    q: "What's your rough budget?",
    sub: "No commitment — just helps me point you in the right direction.",
    key: "budget",
    type: "options",
    options: [
      "Under $500 AUD",
      "$500–$1,000 AUD",
      "$1,000–$2,000 AUD",
      "$2,000+ AUD",
      "Not sure yet",
    ],
  },
  {
    q: "When do you need this?",
    sub: "Rough timing is fine.",
    key: "timeline",
    type: "options",
    options: ["ASAP", "Within a month", "1–3 months", "Just exploring"],
  },
];

const PRICING_MAP: Record<string, string> = {
  "Under $500 AUD": "AUD $499 — Starter",
  "$500–$1,000 AUD": "AUD $999 — Growth (most popular)",
  "$1,000–$2,000 AUD": "AUD $1,999 — Premium",
  "$2,000+ AUD": "AUD $1,999+ — Premium / Custom",
  "Not sure yet": "from AUD $499 — we'll find the right fit",
};

const PAGE_GREETINGS: Record<string, string> = {
  "/pricing": "Want me to narrow that down for your situation?",
  "/idea-to-internet": "Got an idea you're sitting on? Tell me about it.",
  "/contact": "I can help you fill this in — what's your project about?",
  "/services": "Which of our services caught your eye?",
};

const SESSION_KEY = "jayy_v4";
const POPUP_KEY = "jayy_popup_v3";
const WHATSAPP = "61493034590";
const EMAIL = "info@kyvrodigital.com";

// ─── SNAPSHOT CARD ─────────────────────────────────────────────────────────────
function SnapshotCard({ snapshot, onEmail, onWhatsApp, onForm }: {
  snapshot: Snapshot;
  onEmail: () => void;
  onWhatsApp: () => void;
  onForm: () => void;
}) {
  return (
    <div style={{
      background: "#fff",
      border: "1.5px solid #D29B3C",
      borderRadius: 16,
      overflow: "hidden",
      marginTop: 8,
    }}>
      {/* Header */}
      <div style={{ background: "#D29B3C", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
        <Sparkles size={13} color="#0A0907" />
        <span style={{ fontSize: 11, fontWeight: 700, color: "#0A0907", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Your Project Snapshot
        </span>
      </div>
      {/* Fields */}
      <div style={{ padding: "14px 16px" }}>
        {[
          ["Business", snapshot.business],
          ["Service", snapshot.service],
          ["Timeline", snapshot.timeline],
          ["Estimated range", snapshot.priceRange],
        ].map(([label, value]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: "#9b9590", flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: 12, color: "#0A0907", fontWeight: 600, textAlign: "right" }}>{value}</span>
          </div>
        ))}
        <div style={{ fontSize: 10, color: "#b0a898", lineHeight: 1.5, paddingTop: 8, borderTop: "1px solid #f0ebe4", marginBottom: 14 }}>
          Indicative — confirmed after a 15-min call with the team.
        </div>
        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button onClick={onEmail} style={snapBtn("#0A0907", "#FAF7F2")}>
            <Mail size={13} />  Send to Kyvro by Email
          </button>
          <button onClick={onWhatsApp} style={snapBtn("#25D366", "#fff")}>
            <Phone size={13} />  Send on WhatsApp
          </button>
          <button onClick={onForm} style={snapBtn("#FAF7F2", "#0A0907", "1px solid #e0dbd4")}>
            <FileText size={13} />  Fill Our Quote Form
          </button>
        </div>
      </div>
    </div>
  );
}

function snapBtn(bg: string, color: string, border?: string) {
  return {
    background: bg, color, border: border || "none",
    borderRadius: 10, padding: "10px 14px",
    fontSize: 12, fontWeight: 700, cursor: "pointer" as const,
    display: "flex" as const, alignItems: "center" as const,
    gap: 8, width: "100%" as const, justifyContent: "center" as const,
    fontFamily: "inherit",
  };
}

// ─── MAIN WIDGET ───────────────────────────────────────────────────────────────
export function JayyWidget() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [initiated, setInitiated] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load session
  useEffect(() => {
    try {
      const s = sessionStorage.getItem(SESSION_KEY);
      if (s) {
        const p = JSON.parse(s);
        if (p.messages) setMessages(p.messages);
        if (p.snapshot) setSnapshot(p.snapshot);
        if (p.answers) setAnswers(p.answers);
        if (p.step !== undefined) setStep(p.step);
        if (p.initiated) setInitiated(p.initiated);
      }
    } catch {}
  }, []);

  // Save session
  useEffect(() => {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ messages, snapshot, answers, step, initiated })); } catch {}
  }, [messages, snapshot, answers, step, initiated]);

  // Auto popup after 5 seconds
  useEffect(() => {
    if (sessionStorage.getItem(POPUP_KEY)) return;
    const t = setTimeout(() => {
      setPopupVisible(true);
      sessionStorage.setItem(POPUP_KEY, "1");
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading, snapshot]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 200); }, [open]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape" && open) setOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open]);

  const getGreeting = useCallback(() => {
    const pageSpecific = PAGE_GREETINGS[location.pathname];
    if (pageSpecific) return `Hey — I'm Jayy, your Kyvro assistant.\n\n${pageSpecific}`;
    return `Hey — I'm Jayy, your Kyvro assistant ✦\n\nI can help you figure out what your business needs online — website, app, booking system, automation, or something else entirely.\n\nWhat does your business do?`;
  }, [location.pathname]);

  const initJayy = useCallback(() => {
    if (initiated) return;
    setMessages([{ role: "assistant", content: getGreeting() }]);
    setInitiated(true);
  }, [initiated, getGreeting]);

  const handleOpen = () => {
    setOpen(true);
    setPopupVisible(false);
    setPopupDismissed(true);
    if (!initiated) initJayy();
  };

  const handleReset = () => {
    setMessages([]);
    setSnapshot(null);
    setAnswers({});
    setStep(0);
    setInitiated(false);
    sessionStorage.removeItem(SESSION_KEY);
    setTimeout(() => {
      setMessages([{ role: "assistant", content: getGreeting() }]);
      setInitiated(true);
    }, 80);
  };

  // ── Fallback step answer ──
  const handleAnswer = (value: string) => {
    const curr = STEPS[step];
    const newAnswers = { ...answers, [curr.key]: value };
    setAnswers(newAnswers);
    const userMsg: Message = { role: "user", content: value };
    const next = step + 1;

    if (next < STEPS.length) {
      setStep(next);
      const nextStep = STEPS[next];
      setMessages(prev => [
        ...prev,
        userMsg,
        { role: "assistant", content: `${nextStep.q}${nextStep.sub ? `\n\n${nextStep.sub}` : ""}` },
      ]);
    } else {
      // Build snapshot
      const snap: Snapshot = {
        business: newAnswers.business || "Your business",
        service: newAnswers.service || "Website Design",
        timeline: newAnswers.timeline || "To be confirmed",
        priceRange: PRICING_MAP[newAnswers.budget || ""] || "from AUD $499",
      };
      setSnapshot(snap);
      setMessages(prev => [
        ...prev,
        userMsg,
        { role: "assistant", content: `Here's your project snapshot based on what you've told me.\n\nChoose how you'd like to move forward — I'll make sure the team has everything they need.` },
      ]);
    }
  };

  const handleTextSubmit = () => {
    const t = input.trim();
    if (!t) return;
    setInput("");
    handleAnswer(t);
  };

  // ── Snapshot actions ──
  const handleEmail = () => {
    if (!snapshot) return;
    const body = `Hi Kyvro Digital,\n\nHere's my project snapshot:\n\nBusiness: ${snapshot.business}\nService: ${snapshot.service}\nTimeline: ${snapshot.timeline}\nBudget range: ${snapshot.priceRange}\n\nLooking forward to chatting!\n\nKind regards`;
    window.location.href = `mailto:${EMAIL}?subject=Enquiry — ${snapshot.service}&body=${encodeURIComponent(body)}`;
  };
  const handleWhatsApp = () => {
    if (!snapshot) return;
    const text = `Hi Kyvro Digital 👋\n\nProject snapshot:\n\n*${snapshot.business}*\nService: ${snapshot.service}\nTimeline: ${snapshot.timeline}\nBudget: ${snapshot.priceRange}\n\nWould love to chat!`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
  };
  const handleForm = () => {
    if (!snapshot) return;
    window.location.href = `/contact?service=${encodeURIComponent(snapshot.service)}&details=${encodeURIComponent(`Business: ${snapshot.business}. Timeline: ${snapshot.timeline}. Budget: ${snapshot.priceRange}.`)}`;
  };

  const currentStep = STEPS[step];
  const isComplete = !!snapshot;

  return (
    <>
      <style>{`
        @keyframes jFadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes jSlideUp{from{opacity:0;transform:translateY(20px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes jPulse{0%,80%,100%{opacity:0.25;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}
        @keyframes jPop{from{opacity:0;transform:scale(0.88) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes jGlow{0%,100%{box-shadow:0 0 0 0 rgba(210,155,60,0.4)}50%{box-shadow:0 0 0 8px rgba(210,155,60,0)}}
        .j-msg{animation:jFadeUp 0.3s ease}
        .j-panel{animation:jSlideUp 0.3s cubic-bezier(.16,1,.3,1)}
        .j-input:focus{outline:none!important;border-color:#D29B3C!important;box-shadow:0 0 0 3px rgba(210,155,60,0.12)!important}
        .j-opt{transition:all 0.15s!important}
        .j-opt:hover{background:#fff8ee!important;border-color:#D29B3C!important;color:#0A0907!important}
        .j-fab{transition:transform 0.2s,box-shadow 0.2s}
        .j-fab:hover{transform:scale(1.07)!important;box-shadow:0 8px 28px rgba(210,155,60,0.35)!important}
        @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
      `}</style>

      {/* ── FAB + popup ── */}
      {!open && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>

          {/* Popup bubble */}
          {popupVisible && !popupDismissed && (
            <div style={{ animation: "jPop 0.45s cubic-bezier(.16,1,.3,1)", position: "relative" }}>
              <div
                onClick={handleOpen}
                style={{
                  background: "#FAF7F2",
                  border: "1.5px solid #e8e3dc",
                  borderRadius: "16px 16px 4px 16px",
                  padding: "14px 16px",
                  maxWidth: 240,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "#D29B3C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#0A0907", flexShrink: 0 }}>J</div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0A0907" }}>Jayy</span>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#2ecc71", marginLeft: "auto" }} />
                </div>
                <div style={{ fontSize: 13, color: "#3a3530", lineHeight: 1.5 }}>
                  Hey 👋 I can help you figure out what your business needs online.
                </div>
                <div style={{ fontSize: 12, color: "#D29B3C", fontWeight: 600, marginTop: 8 }}>
                  Let's chat →
                </div>
              </div>
              {/* Dismiss */}
              <button
                onClick={e => { e.stopPropagation(); setPopupVisible(false); setPopupDismissed(true); }}
                style={{ position: "absolute", top: -8, right: -8, width: 20, height: 20, borderRadius: "50%", background: "#e8e3dc", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#6b6560" }}
              >×</button>
            </div>
          )}

          {/* FAB button */}
          <button
            className="j-fab"
            onClick={handleOpen}
            aria-label="Open Jayy assistant"
            style={{
              width: 58, height: 58, borderRadius: "50%",
              background: "#FAF7F2",
              border: "2px solid #D29B3C",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              position: "relative",
              animation: "jGlow 3s ease 6s 4",
            }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "#D29B3C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: "#0A0907" }}>J</div>
            <span style={{ position: "absolute", top: 2, right: 2, width: 12, height: 12, background: "#2ecc71", borderRadius: "50%", border: "2px solid #FAF7F2" }} />
          </button>
        </div>
      )}

      {/* ── Chat panel ── */}
      {open && (
        <div
          className="j-panel"
          role="dialog"
          aria-label="Jayy assistant"
          aria-modal="true"
          style={{
            position: "fixed",
            bottom: 28, right: 28,
            width: "min(420px, calc(100vw - 32px))",
            height: "min(640px, calc(100vh - 52px))",
            background: "#FAF7F2",
            border: "1.5px solid #e0dbd4",
            borderRadius: 20,
            boxShadow: "0 24px 72px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.06)",
            display: "flex", flexDirection: "column",
            zIndex: 9999, overflow: "hidden",
          }}
        >
          {/* ─ Header ─ */}
          <div style={{
            background: "#FAF7F2",
            borderBottom: "1px solid #ede8e1",
            padding: "14px 16px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: "#D29B3C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 800, color: "#0A0907", position: "relative" }}>
                J
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, background: "#2ecc71", borderRadius: "50%", border: "2px solid #FAF7F2" }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0A0907", lineHeight: 1.2 }}>Jayy</div>
                <div style={{ fontSize: 10, color: "#9b9590", letterSpacing: "0.02em" }}>Kyvro Digital assistant · online</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <button onClick={handleReset} title="Start over" aria-label="Start over"
                style={{ background: "none", border: "1px solid #e8e3dc", borderRadius: 8, cursor: "pointer", color: "#9b9590", padding: "5px 8px", display: "flex", alignItems: "center" }}>
                <RotateCcw size={12} />
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close"
                style={{ background: "none", border: "1px solid #e8e3dc", borderRadius: 8, cursor: "pointer", color: "#9b9590", padding: "5px 8px", display: "flex", alignItems: "center" }}>
                <X size={14} />
              </button>
            </div>
          </div>

          {/* ─ Messages ─ */}
          <div
            role="log"
            aria-live="polite"
            style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: 10, scrollbarWidth: "thin", scrollbarColor: "#e0dbd4 transparent" }}
          >
            {messages.map((msg, i) => (
              <div key={i} className="j-msg" style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 8 }}>
                {msg.role === "assistant" && (
                  <div style={{ width: 26, height: 26, borderRadius: 7, background: "#D29B3C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#0A0907", flexShrink: 0, marginBottom: 2 }}>J</div>
                )}
                <div style={{
                  maxWidth: "78%",
                  background: msg.role === "user" ? "#0A0907" : "#fff",
                  color: msg.role === "user" ? "#FAF7F2" : "#1a1714",
                  border: msg.role === "assistant" ? "1px solid #ede8e1" : "none",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
                  padding: "11px 14px",
                  fontSize: 13, lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                  boxShadow: msg.role === "assistant" ? "0 1px 4px rgba(0,0,0,0.04)" : "none",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Snapshot */}
            {snapshot && (
              <div className="j-msg" style={{ paddingLeft: 34 }}>
                <SnapshotCard snapshot={snapshot} onEmail={handleEmail} onWhatsApp={handleWhatsApp} onForm={handleForm} />
              </div>
            )}

            {/* Option buttons */}
            {!isComplete && !loading && currentStep?.type === "options" && messages.length > 0 && (
              <div className="j-msg" style={{ paddingLeft: 34, display: "flex", flexWrap: "wrap", gap: 7, marginTop: 2 }}>
                {currentStep.options?.map(opt => (
                  <button
                    key={opt}
                    className="j-opt"
                    onClick={() => handleAnswer(opt)}
                    style={{
                      background: "#fff",
                      border: "1.5px solid #e0dbd4",
                      borderRadius: 24,
                      padding: "7px 15px",
                      fontSize: 12,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      color: "#3a3530",
                      fontWeight: 500,
                    }}
                  >{opt}</button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="j-msg" style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: "#D29B3C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#0A0907", flexShrink: 0 }}>J</div>
                <div style={{ background: "#fff", border: "1px solid #ede8e1", borderRadius: "4px 16px 16px 16px", padding: "13px 18px", display: "flex", gap: 5, alignItems: "center" }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#D29B3C", animation: `jPulse 1.2s ease ${i * 0.18}s infinite` }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ─ Input area ─ */}
          <div style={{ borderTop: "1px solid #ede8e1", padding: "12px 16px 16px", flexShrink: 0, background: "#FAF7F2" }}>
            {!isComplete && currentStep?.type === "text" && (
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  ref={inputRef}
                  className="j-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleTextSubmit(); } }}
                  placeholder={currentStep.placeholder || "Type your answer..."}
                  style={{
                    flex: 1, border: "1.5px solid #e0dbd4", borderRadius: 12,
                    padding: "10px 14px", fontSize: 13, fontFamily: "inherit",
                    background: "#fff", color: "#0A0907",
                    transition: "border-color 0.15s, box-shadow 0.15s",
                  }}
                />
                <button
                  onClick={handleTextSubmit}
                  disabled={!input.trim()}
                  aria-label="Send"
                  style={{
                    background: input.trim() ? "#D29B3C" : "#ede8e1",
                    color: input.trim() ? "#0A0907" : "#b0a898",
                    border: "none", borderRadius: 12, padding: "10px 14px",
                    cursor: input.trim() ? "pointer" : "default",
                    transition: "all 0.15s", display: "flex", alignItems: "center",
                  }}
                >
                  <Send size={14} />
                </button>
              </div>
            )}

            {isComplete && (
              <button onClick={handleReset}
                style={{ width: "100%", background: "none", border: "1.5px solid #e0dbd4", borderRadius: 12, padding: "10px", color: "#9b9590", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                Start a new conversation
              </button>
            )}

            <div style={{ fontSize: 10, color: "#c8c0b6", textAlign: "center", marginTop: 10, letterSpacing: "0.02em" }}>
              Kyvro Digital · kyvrodigital.com
            </div>
          </div>
        </div>
      )}
    </>
  );
}
