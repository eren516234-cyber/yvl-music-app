const IOS = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const playlists = [
  { name: "Liked Songs", count: 347, color: "#e63946", emoji: "❤️" },
  { name: "Downloaded", count: 124, color: "#1565c0", emoji: "⬇️" },
  { name: "Late Night Vibes", count: 42, color: "#6a1b9a", emoji: "🌙" },
  { name: "Workout Bangers", count: 28, color: "#e65100", emoji: "⚡" },
  { name: "Focus Mode", count: 63, color: "#00695c", emoji: "🎯" },
  { name: "Chill Sunday", count: 19, color: "#37474f", emoji: "☕" },
];

const recent = [
  { title: "Blinding Lights", artist: "The Weeknd", color: "#e63946" },
  { title: "Butter", artist: "BTS", color: "#f57f17" },
  { title: "Flowers", artist: "Miley Cyrus", color: "#2e7d32" },
];

const stats = [
  { label: "Tracks", value: "347" },
  { label: "Artists", value: "82" },
  { label: "Albums", value: "54" },
  { label: "Hours", value: "24h" },
];

const NAV = [
  { label: "Home", active: false, icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
  { label: "Search", active: false, icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  { label: "Library", active: true, icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { label: "Settings", active: false, icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

export function LibraryScreen() {
  return (
    <div style={{ width: 390, height: 844, background: "#080808", fontFamily: IOS, color: "#fff", overflowY: "auto", scrollbarWidth: "none", position: "relative" }}>
      {/* Status bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px 4px" }}>
        <span style={{ fontSize: 15, fontWeight: 600 }}>9:41</span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ width: 3, height: 6 + i * 2, background: i < 3 ? "#fff" : "#444", borderRadius: 1 }} />
          ))}
        </div>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "10px 22px 18px" }}>
        <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-2px", lineHeight: 1 }}>Library</div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round">
              <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ padding: "0 22px", marginBottom: 20 }}>
        <div style={{
          display: "flex",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 20, overflow: "hidden",
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: "14px 0", textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}>
              <div style={{ fontSize: 21, fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>{s.value}</div>
              <div style={{ fontSize: 9, color: "#444", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, padding: "0 22px", marginBottom: 22, overflowX: "auto", scrollbarWidth: "none" }}>
        {["All", "Playlists", "Albums", "Artists", "Local"].map((t, i) => (
          <div key={t} style={{
            flexShrink: 0, padding: "8px 18px", borderRadius: 999,
            background: i === 0 ? "#fff" : "transparent",
            color: i === 0 ? "#000" : "#555",
            fontSize: 12, fontWeight: i === 0 ? 700 : 500,
            border: i === 0 ? "none" : "1px solid #222",
          }}>{t}</div>
        ))}
      </div>

      {/* Recently played */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 22px", marginBottom: 14 }}>
          <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px" }}>Recently played</div>
          <div style={{ fontSize: 13, color: "#444" }}>See all</div>
        </div>
        <div style={{ display: "flex", gap: 14, padding: "0 22px", overflowX: "auto", scrollbarWidth: "none" }}>
          {recent.map((r, i) => (
            <div key={i} style={{ flexShrink: 0 }}>
              <div style={{
                width: 112, height: 112, borderRadius: 20, marginBottom: 8,
                background: `linear-gradient(135deg,${r.color}88,${r.color}22)`,
                border: `1px solid ${r.color}33`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: r.color, boxShadow: `0 0 22px ${r.color}88` }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#ddd", maxWidth: 112, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{r.artist}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Playlists */}
      <div style={{ padding: "0 22px", marginBottom: 120 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 }}>
          <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px" }}>Playlists</div>
          <div style={{ fontSize: 13, color: "#444" }}>Sort</div>
        </div>
        {playlists.map((p, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "10px 0", borderBottom: "1px solid #111",
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, flexShrink: 0,
              background: `linear-gradient(135deg,${p.color}88,${p.color}22)`,
              border: `1px solid ${p.color}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22,
            }}>{p.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#ddd", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{p.count} tracks</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="13" height="13" viewBox="0 0 10 12" fill="#555"><path d="M0 0L10 6L0 12V0Z" /></svg>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a2a2a" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: 390, height: 76, background: "rgba(8,8,8,0.97)", backdropFilter: "blur(24px)",
        borderTop: "1px solid #181818",
        display: "flex", justifyContent: "space-around", alignItems: "center",
        paddingBottom: 10,
      }}>
        {NAV.map((n) => (
          <div key={n.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={n.active ? "#fff" : "#3a3a3a"} strokeWidth={n.active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d={n.icon} />
            </svg>
            <span style={{ fontSize: 9, fontWeight: n.active ? 700 : 500, color: n.active ? "#fff" : "#3a3a3a", letterSpacing: "0.1em", textTransform: "uppercase" }}>{n.label}</span>
          </div>
        ))}
      </div>
      <div style={{ position: "fixed", bottom: 6, left: "50%", transform: "translateX(-50%)", width: 120, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
    </div>
  );
}
