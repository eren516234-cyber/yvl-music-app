export function LibraryScreen() {
  const playlists = [
    { name: "Liked Songs", count: 347, color: "#c62828", icon: "❤️" },
    { name: "Downloaded", count: 124, color: "#1565c0", icon: "↓" },
    { name: "Late Night Vibes", count: 42, color: "#6a1b9a", icon: "🌙" },
    { name: "Workout Bangers", count: 28, color: "#e65100", icon: "⚡" },
    { name: "Focus Mode", count: 63, color: "#00695c", icon: "🎯" },
    { name: "Chill Sunday", count: 19, color: "#37474f", icon: "☕" },
  ];

  const recent = [
    { title: "Blinding Lights", artist: "The Weeknd", color: "#c62828" },
    { title: "Butter", artist: "BTS", color: "#f57f17" },
    { title: "Flowers", artist: "Miley Cyrus", color: "#2e7d32" },
  ];

  return (
    <div style={{
      width: 390, height: 844,
      background: "#080808",
      fontFamily: "'Inter', sans-serif",
      color: "#fff",
      overflowY: "auto",
      scrollbarWidth: "none",
    }}>
      {/* Status bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-1">
        <span style={{ fontSize: 12, fontWeight: 600 }}>9:41</span>
        <div className="flex gap-1 items-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ width: 3, height: 6 + i * 2, background: i < 3 ? "#fff" : "#444", borderRadius: 1 }} />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-end px-5 pt-4 pb-4">
        <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-2px", color: "#fff", lineHeight: 1 }}>Library</div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round">
              <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="px-5 mb-6">
        <div style={{
          display: "flex", gap: 0,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 20, overflow: "hidden",
        }}>
          {[
            { label: "Tracks", value: "347" },
            { label: "Artists", value: "82" },
            { label: "Albums", value: "54" },
            { label: "Hours", value: "24h" },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: "14px 0", textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>{s.value}</div>
              <div style={{ fontSize: 9, color: "#444", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-5 mb-5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {["All", "Playlists", "Albums", "Artists", "Local"].map((t, i) => (
          <div key={t} style={{
            flexShrink: 0, padding: "7px 16px", borderRadius: 999,
            background: i === 0 ? "#fff" : "transparent",
            color: i === 0 ? "#000" : "#555",
            fontSize: 12, fontWeight: i === 0 ? 700 : 500,
            border: i === 0 ? "none" : "1px solid #222",
          }}>{t}</div>
        ))}
      </div>

      {/* Recently played */}
      <div className="mb-5">
        <div className="flex justify-between items-end px-5 mb-3">
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.3px" }}>Recently played</div>
          <div style={{ fontSize: 11, color: "#444" }}>See all</div>
        </div>
        <div className="flex gap-3 px-5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {recent.map((r, i) => (
            <div key={i} style={{ flexShrink: 0 }}>
              <div style={{
                width: 110, height: 110, borderRadius: 18, marginBottom: 8,
                background: `linear-gradient(135deg, ${r.color}88, ${r.color}22)`,
                border: `1px solid ${r.color}33`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: r.color, boxShadow: `0 0 20px ${r.color}88` }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#ddd", maxWidth: 110, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</div>
              <div style={{ fontSize: 10, color: "#555", marginTop: 1 }}>{r.artist}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Playlists */}
      <div className="px-5 mb-24">
        <div className="flex justify-between items-end mb-3">
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.3px" }}>Playlists</div>
          <div style={{ fontSize: 11, color: "#444" }}>Sort</div>
        </div>
        <div className="flex flex-col gap-1">
          {playlists.map((p, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "10px 0", borderBottom: "1px solid #111",
              cursor: "pointer",
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                background: `linear-gradient(135deg, ${p.color}88, ${p.color}22)`,
                border: `1px solid ${p.color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
              }}>
                {typeof p.icon === "string" && p.icon.length > 1 ? p.icon : (
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: p.color }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#ddd", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{p.count} tracks</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: 390, height: 68,
        background: "rgba(8,8,8,0.97)", backdropFilter: "blur(20px)",
        borderTop: "1px solid #1a1a1a",
        display: "flex", justifyContent: "space-around", alignItems: "center",
        paddingBottom: 8,
      }}>
        {[
          { label: "Home", active: false },
          { label: "Search", active: false },
          { label: "Library", active: true },
          { label: "Settings", active: false },
        ].map((n) => (
          <div key={n.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: n.active ? "#fff" : "transparent", border: n.active ? "none" : "2px solid #333" }} />
            <span style={{ fontSize: 9, fontWeight: n.active ? 700 : 500, color: n.active ? "#fff" : "#444", letterSpacing: "0.1em", textTransform: "uppercase" }}>{n.label}</span>
          </div>
        ))}
      </div>

      <div style={{ position: "fixed", bottom: 6, left: "50%", transform: "translateX(-50%)", width: 120, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
    </div>
  );
}
