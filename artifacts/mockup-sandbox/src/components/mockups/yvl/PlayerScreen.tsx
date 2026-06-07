export function PlayerScreen() {
  return (
    <div style={{
      width: 390, height: 844,
      background: "#060606",
      fontFamily: "'Inter', sans-serif",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Dynamic blurred background from album art */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 40%, rgba(198,40,40,0.35) 0%, rgba(100,0,0,0.15) 40%, transparent 70%)",
        zIndex: 0,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 80% 80%, rgba(69,21,130,0.2) 0%, transparent 60%)",
        zIndex: 0,
      }} />

      {/* Status bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-1 relative" style={{ zIndex: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span>
        <div className="flex gap-1 items-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ width: 3, height: 6 + i * 2, background: i < 3 ? "#fff" : "#444", borderRadius: 1 }} />
          ))}
          <div style={{ width: 15, height: 8, border: "1.5px solid #fff", borderRadius: 3, marginLeft: 4, position: "relative" }}>
            <div style={{ position: "absolute", left: 2, top: 1.5, width: 8, height: 5, background: "#fff", borderRadius: 1 }} />
          </div>
        </div>
      </div>

      {/* Top bar */}
      <div className="flex justify-between items-center px-5 py-4 relative" style={{ zIndex: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#555", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>Now Playing</div>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
          </svg>
        </div>
      </div>

      {/* Album artwork */}
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 32px 28px", position: "relative", zIndex: 10 }}>
        <div style={{ position: "relative" }}>
          {/* Glow shadow */}
          <div style={{
            position: "absolute", inset: -20, borderRadius: 40,
            background: "radial-gradient(ellipse at center, rgba(198,40,40,0.4) 0%, transparent 70%)",
            filter: "blur(20px)",
          }} />
          {/* Album art */}
          <div style={{
            width: 310, height: 310, borderRadius: 28,
            background: "linear-gradient(135deg, #c62828 0%, #8b0000 40%, #4a0000 80%, #1a0000 100%)",
            position: "relative", overflow: "hidden",
            boxShadow: "0 20px 60px rgba(198,40,40,0.4), 0 8px 30px rgba(0,0,0,0.8)",
          }}>
            {/* Vinyl record effect */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 200, height: 200, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.05)",
              boxShadow: "0 0 0 20px rgba(0,0,0,0.15), 0 0 0 40px rgba(0,0,0,0.1)",
            }}>
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 30, height: 30, borderRadius: "50%",
                background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(255,255,255,0.1)",
              }} />
            </div>
            <div style={{
              position: "absolute", top: 16, left: 16,
              fontSize: 48, fontWeight: 900, color: "rgba(255,255,255,0.08)",
              letterSpacing: "-3px", lineHeight: 1,
            }}>AFTER<br/>HOURS</div>
            {/* Artist label */}
            <div style={{
              position: "absolute", bottom: 16, left: 16,
              fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.2em", textTransform: "uppercase",
            }}>The Weeknd</div>
          </div>
        </div>
      </div>

      {/* Track info */}
      <div className="px-7 relative" style={{ zIndex: 10 }}>
        <div className="flex justify-between items-start mb-4">
          <div style={{ flex: 1, minWidth: 0, marginRight: 16 }}>
            <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-1px", color: "#fff", lineHeight: 1.1 }}>Blinding Lights</div>
            <div style={{ fontSize: 15, color: "#666", marginTop: 4, fontWeight: 500 }}>The Weeknd</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #333", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2" strokeLinecap="round">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, position: "relative", marginBottom: 8 }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: "38%", height: "100%", background: "#fff", borderRadius: 2 }} />
            <div style={{ position: "absolute", left: "38%", top: "50%", transform: "translate(-50%, -50%)", width: 14, height: 14, borderRadius: "50%", background: "#fff", boxShadow: "0 0 0 3px rgba(255,255,255,0.2)" }} />
          </div>
          <div className="flex justify-between">
            <span style={{ fontSize: 11, color: "#555" }}>1:15</span>
            <span style={{ fontSize: 11, color: "#555" }}>3:20</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div style={{ padding: 8, cursor: "pointer" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round">
              <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
            </svg>
          </div>
          <div style={{ padding: 8, cursor: "pointer" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#aaa">
              <path d="M19 20L9 12l10-8v16z M5 4h2v16H5z" />
            </svg>
          </div>
          <div style={{
            width: 68, height: 68, borderRadius: "50%", background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 30px rgba(255,255,255,0.2)",
            cursor: "pointer",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
              <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
            </svg>
          </div>
          <div style={{ padding: 8, cursor: "pointer" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#aaa">
              <path d="M5 4l10 8-10 8V4z M19 4h2v16h-2z" />
            </svg>
          </div>
          <div style={{ padding: 8, cursor: "pointer" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round">
              <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 014-4h14" />
              <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 01-4 4H3" />
            </svg>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="flex justify-between items-center">
          {[
            { icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z", label: "Queue" },
            { icon: "M4 6h16M4 12h16M4 18h7", label: "Lyrics" },
            { icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z", label: "Share" },
            { icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", label: "Save" },
          ].map((a) => (
            <div key={a.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={a.icon} />
              </svg>
              <span style={{ fontSize: 9, color: "#444", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Home indicator */}
      <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 120, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
    </div>
  );
}
