export function LyricsScreen() {
  const lines = [
    { text: "I been runnin' out of time", active: false, past: true },
    { text: "Need a partner in crime", active: false, past: true },
    { text: "I feel ya movin' past me", active: false, past: true },
    { text: "And it's only just begun", active: true, past: false },
    { text: "I can't stop the feeling", active: false, past: false },
    { text: "Deep inside me, it's healing", active: false, past: false },
    { text: "Said, baby I'ma love you", active: false, past: false },
    { text: "Until you can't no more", active: false, past: false },
    { text: "It's Blinding Lights", active: false, past: false },
    { text: "That light up the sky", active: false, past: false },
  ];

  return (
    <div style={{
      width: 390, height: 844,
      background: "#040404",
      fontFamily: "'Inter', sans-serif",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Cinematic background */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 30%, rgba(198,40,40,0.25) 0%, transparent 65%)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 20% 80%, rgba(69,21,130,0.18) 0%, transparent 50%)",
      }} />
      {/* Grain texture */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* Status bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-1 relative" style={{ zIndex: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span>
        <div className="flex gap-1 items-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ width: 3, height: 6 + i * 2, background: i < 3 ? "#fff" : "#333", borderRadius: 1 }} />
          ))}
        </div>
      </div>

      {/* Top bar */}
      <div className="flex justify-between items-center px-5 py-3 relative" style={{ zIndex: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 17l-7-7 7-7" />
          </svg>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Lyrics</div>
          <div style={{ fontSize: 10, color: "#444", marginTop: 1 }}>LrcLib · Synced</div>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {["Word", "Line", "Full", "Float"].map((m, i) => (
            <div key={m} style={{
              padding: "4px 8px", borderRadius: 8, fontSize: 9, fontWeight: 700,
              background: i === 0 ? "rgba(255,255,255,0.12)" : "transparent",
              color: i === 0 ? "#fff" : "#444",
              letterSpacing: "0.05em",
            }}>{m}</div>
          ))}
        </div>
      </div>

      {/* Mini album art + info */}
      <div className="flex items-center gap-4 px-6 py-3 relative" style={{ zIndex: 10 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 12, flexShrink: 0,
          background: "linear-gradient(135deg, #c62828, #4a0000)",
          boxShadow: "0 4px 20px rgba(198,40,40,0.4)",
        }} />
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>Blinding Lights</div>
          <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>The Weeknd · After Hours</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h8M4 18h16" />
            </svg>
          </div>
        </div>
      </div>

      {/* Lyrics */}
      <div style={{
        flex: 1, padding: "0 28px 120px",
        position: "relative", zIndex: 10,
        maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 75%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 75%, transparent 100%)",
      }}>
        {lines.map((line, i) => (
          <div key={i} style={{
            padding: "10px 0",
            fontSize: line.active ? 26 : line.past ? 16 : 18,
            fontWeight: line.active ? 900 : line.past ? 500 : 600,
            color: line.active ? "#fff" : line.past ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.3)",
            lineHeight: 1.2,
            letterSpacing: line.active ? "-1px" : "-0.3px",
            transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            textShadow: line.active ? "0 0 40px rgba(255,255,255,0.3)" : "none",
          }}>
            {line.active ? (
              <span>
                {line.text.split(" ").map((word, wi) => (
                  <span key={wi} style={{
                    marginRight: 8,
                    color: wi < 3 ? "#fff" : "rgba(255,255,255,0.4)",
                    textDecoration: wi < 3 ? "none" : "none",
                  }}>{word}</span>
                ))}
              </span>
            ) : line.text}
          </div>
        ))}
      </div>

      {/* Bottom mini controls */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20,
        background: "linear-gradient(to top, rgba(4,4,4,1) 60%, transparent)",
        padding: "20px 28px 30px",
      }}>
        {/* Progress */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: "38%", height: "100%", background: "rgba(255,255,255,0.6)", borderRadius: 2 }} />
          </div>
          <div className="flex justify-between mt-2">
            <span style={{ fontSize: 10, color: "#444" }}>1:15</span>
            <span style={{ fontSize: 10, color: "#444" }}>3:20</span>
          </div>
        </div>
        {/* Playback controls */}
        <div className="flex items-center justify-between">
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#aaa">
              <path d="M19 20L9 12l10-8v16z M5 4h2v16H5z" />
            </svg>
          </div>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(255,255,255,0.15)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#000">
              <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
            </svg>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#aaa">
              <path d="M5 4l10 8-10 8V4z M19 4h2v16h-2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
