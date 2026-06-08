import { useState } from "react";

const IOS = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const lines = [
  { text: "I been runnin' out of time", past: true, active: false },
  { text: "Need a partner in crime", past: true, active: false },
  { text: "I feel ya movin' past me", past: true, active: false },
  { text: "And it's only just begun", past: false, active: true },
  { text: "I can't stop the feeling", past: false, active: false },
  { text: "Deep inside me, it's healing", past: false, active: false },
  { text: "Said, baby I'ma love you", past: false, active: false },
  { text: "Until you can't no more", past: false, active: false },
  { text: "It's Blinding Lights", past: false, active: false },
  { text: "That light up the sky", past: false, active: false },
];

const MODES = [
  { id: "apple", label: "Apple" },
  { id: "glow", label: "Glow" },
  { id: "cinema", label: "Cinema" },
];

function AppleLyrics() {
  return (
    <div style={{ padding: "0 0 160px", maskImage: "linear-gradient(to bottom,transparent 0%,black 10%,black 72%,transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom,transparent 0%,black 10%,black 72%,transparent 100%)" }}>
      {lines.map((line, i) => (
        <div key={i} style={{
          padding: "9px 0",
          fontSize: line.active ? 28 : line.past ? 17 : 19,
          fontWeight: line.active ? 800 : line.past ? 500 : 600,
          color: line.active ? "#fff" : line.past ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.32)",
          lineHeight: 1.25, letterSpacing: line.active ? "-0.8px" : "-0.2px",
          transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          {line.active ? (
            <span>
              {line.text.split(" ").map((w, wi) => (
                <span key={wi} style={{ marginRight: 7, color: wi < 3 ? "#fff" : "rgba(255,255,255,0.38)" }}>{w}</span>
              ))}
            </span>
          ) : line.text}
        </div>
      ))}
    </div>
  );
}

function GlowLyrics() {
  return (
    <div style={{ padding: "0 0 160px", maskImage: "linear-gradient(to bottom,transparent 0%,black 10%,black 72%,transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom,transparent 0%,black 10%,black 72%,transparent 100%)" }}>
      {lines.map((line, i) => (
        <div key={i} style={{
          padding: "10px 0",
          fontSize: line.active ? 26 : line.past ? 16 : 18,
          fontWeight: line.active ? 900 : line.past ? 400 : 600,
          color: line.active ? "#c77dff" : line.past ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.28)",
          lineHeight: 1.25, letterSpacing: line.active ? "-0.8px" : "-0.2px",
          textShadow: line.active ? "0 0 30px rgba(199,125,255,0.8), 0 0 60px rgba(199,125,255,0.4), 0 0 90px rgba(199,125,255,0.2)" : "none",
          transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          {line.text}
        </div>
      ))}
    </div>
  );
}

function CinemaLyrics() {
  const activeIdx = lines.findIndex(l => l.active);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0 160px" }}>
      {/* Past line */}
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.18)", fontWeight: 400, letterSpacing: "-0.2px", marginBottom: 28, textAlign: "center", fontStyle: "italic" }}>
        {lines[activeIdx - 1]?.text}
      </div>
      {/* Active line */}
      <div style={{
        fontSize: 30, fontWeight: 900, color: "#fff",
        letterSpacing: "-1.2px", lineHeight: 1.15, textAlign: "center",
        background: "linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.7) 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 0 30px rgba(255,255,255,0.3))",
        marginBottom: 28,
      }}>
        {lines[activeIdx]?.text}
      </div>
      {/* Next lines */}
      {lines.slice(activeIdx + 1, activeIdx + 4).map((line, i) => (
        <div key={i} style={{
          fontSize: 16 - i * 2, color: `rgba(255,255,255,${0.28 - i * 0.06})`,
          fontWeight: 500, letterSpacing: "-0.3px", textAlign: "center",
          marginBottom: 20,
          filter: i > 0 ? "blur(0.5px)" : "none",
        }}>
          {line.text}
        </div>
      ))}
    </div>
  );
}

export function LyricsScreen() {
  const [mode, setMode] = useState<"apple" | "glow" | "cinema">("apple");

  return (
    <div style={{
      width: 390, height: 844, background: "#040404",
      fontFamily: IOS, color: "#fff",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background gradients */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%,rgba(198,40,40,0.22) 0%,transparent 65%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 80%,rgba(69,21,130,0.16) 0%,transparent 50%)" }} />
      {mode === "glow" && (
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%,rgba(199,125,255,0.12) 0%,transparent 55%)" }} />
      )}

      {/* Status bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px 4px", position: "relative", zIndex: 10 }}>
        <span style={{ fontSize: 15, fontWeight: 600 }}>9:41</span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ width: 3, height: 6 + i * 2, background: i < 3 ? "#fff" : "#333", borderRadius: 1 }} />
          ))}
        </div>
      </div>

      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 20px 10px", position: "relative", zIndex: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 17l-7-7 7-7" />
          </svg>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Lyrics</div>
          <div style={{ fontSize: 10, color: "#555", marginTop: 1 }}>LrcLib · Synced ✓</div>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
          </svg>
        </div>
      </div>

      {/* 3 beautiful view mode switcher */}
      <div style={{ display: "flex", gap: 0, margin: "0 20px 16px", background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 4, position: "relative", zIndex: 10 }}>
        {MODES.map((m) => (
          <button key={m.id} onClick={() => setMode(m.id as typeof mode)} style={{
            flex: 1, padding: "8px 0", borderRadius: 10, border: "none", cursor: "pointer",
            background: mode === m.id ? "rgba(255,255,255,0.12)" : "transparent",
            color: mode === m.id ? "#fff" : "#555",
            fontSize: 13, fontWeight: mode === m.id ? 700 : 500,
            letterSpacing: "-0.2px",
            transition: "all 0.2s",
            fontFamily: IOS,
            boxShadow: mode === m.id ? "0 1px 8px rgba(0,0,0,0.3)" : "none",
          }}>{m.label}</button>
        ))}
      </div>

      {/* Mini album + info */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "0 24px 16px", position: "relative", zIndex: 10 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 12, flexShrink: 0,
          background: "linear-gradient(135deg,#c62828,#4a0000)",
          boxShadow: "0 4px 20px rgba(198,40,40,0.45)",
        }} />
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>Blinding Lights</div>
          <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>The Weeknd · After Hours</div>
        </div>
        <div style={{ marginLeft: "auto", width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </div>
      </div>

      {/* Lyrics body */}
      <div style={{ padding: "0 28px", position: "relative", zIndex: 10, overflowY: "auto", height: 400 }}>
        {mode === "apple" && <AppleLyrics />}
        {mode === "glow" && <GlowLyrics />}
        {mode === "cinema" && <CinemaLyrics />}
      </div>

      {/* Bottom controls */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20,
        background: "linear-gradient(to top,rgba(4,4,4,1) 65%,transparent)",
        padding: "20px 28px 36px",
      }}>
        {/* Progress */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: "38%", height: "100%", background: mode === "glow" ? "#c77dff" : "rgba(255,255,255,0.7)", borderRadius: 2 }} />
            <div style={{
              position: "absolute", left: "38%", top: "50%", transform: "translate(-50%,-50%)",
              width: 13, height: 13, borderRadius: "50%",
              background: mode === "glow" ? "#c77dff" : "#fff",
              boxShadow: mode === "glow" ? "0 0 12px #c77dff" : "none",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: 11, color: "#444" }}>1:15</span>
            <span style={{ fontSize: 11, color: "#444" }}>3:20</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="#aaa">
              <path d="M19 20L9 12l10-8v16z M5 4h2v16H5z" />
            </svg>
          </div>
          <div style={{ width: 58, height: 58, borderRadius: "50%", background: mode === "glow" ? "#c77dff" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: mode === "glow" ? "0 0 30px rgba(199,125,255,0.6)" : "0 0 30px rgba(255,255,255,0.15)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill={mode === "glow" ? "#fff" : "#000"}>
              <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
            </svg>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="#aaa">
              <path d="M5 4l10 8-10 8V4z M19 4h2v16h-2z" />
            </svg>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 120, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
    </div>
  );
}
