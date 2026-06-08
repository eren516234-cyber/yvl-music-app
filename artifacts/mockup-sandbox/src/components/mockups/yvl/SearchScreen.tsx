const IOS = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const genres = [
  { name: "Pop", color1: "#c62828", color2: "#880e4f" },
  { name: "Hip-Hop", color1: "#1565c0", color2: "#0d47a1" },
  { name: "Rock", color1: "#2e7d32", color2: "#1b5e20" },
  { name: "R&B", color1: "#6a1b9a", color2: "#4a148c" },
  { name: "K-Pop", color1: "#ad1457", color2: "#880e4f" },
  { name: "Electronic", color1: "#00695c", color2: "#004d40" },
  { name: "Jazz", color1: "#e65100", color2: "#bf360c" },
  { name: "Lo-Fi", color1: "#37474f", color2: "#263238" },
];

const recent = ["The Weeknd", "K-Pop hits", "Arijit Singh", "Blinding Lights"];

const results = [
  { title: "Dynamite", artist: "BTS", color: "#ad1457" },
  { title: "LALISA", artist: "LISA", color: "#7b1fa2" },
  { title: "Butter", artist: "BTS", color: "#f57f17" },
  { title: "Pink Venom", artist: "BLACKPINK", color: "#c62828" },
  { title: "After LIKE", artist: "IVE", color: "#1565c0" },
];

const artists = [
  { name: "BTS", color: "#4a148c", emoji: "🎤" },
  { name: "BLACKPINK", color: "#c62828", emoji: "💗" },
  { name: "LISA", color: "#7b1fa2", emoji: "✨" },
  { name: "aespa", color: "#004d40", emoji: "🤖" },
];

const NAV = [
  { label: "Home", active: false, icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
  { label: "Search", active: true, icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  { label: "Library", active: false, icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { label: "Settings", active: false, icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

export function SearchScreen() {
  return (
    <div style={{ width: 390, height: 844, background: "#080808", fontFamily: IOS, color: "#fff", overflowY: "auto", scrollbarWidth: "none" }}>
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
      <div style={{ padding: "10px 22px 12px" }}>
        <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-2px", marginBottom: 16, lineHeight: 1 }}>Search</div>
        {/* Search bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16, padding: "14px 16px",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span style={{ fontSize: 15, color: "#333", flex: 1, fontWeight: 400 }}>Songs, artists, albums…</span>
          <div style={{ width: 1, height: 18, background: "#222" }} />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
          </svg>
        </div>
      </div>

      {/* Recent */}
      <div style={{ padding: "0 22px", marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#444", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Recent</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {recent.map((r) => (
            <div key={r} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 14px", borderRadius: 999,
              border: "1px solid #1e1e1e", background: "#0e0e0e",
              fontSize: 13, color: "#aaa",
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round">
                <path d="M3 12a9 9 0 109-9M3 3v9h9" />
              </svg>
              {r}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Artists */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 22px", marginBottom: 14 }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>Artists</div>
          <div style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>See all</div>
        </div>
        <div style={{ display: "flex", gap: 18, padding: "0 22px", overflowX: "auto", scrollbarWidth: "none" }}>
          {artists.map((a) => (
            <div key={a.name} style={{ flexShrink: 0, textAlign: "center", width: 80 }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: `radial-gradient(circle at 38% 32%,${a.color}99,${a.color}22)`,
                border: `2px solid ${a.color}44`,
                marginBottom: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28,
              }}>{a.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#ddd" }}>{a.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Song results */}
      <div style={{ padding: "0 22px", marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 14 }}>Songs</div>
        {results.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: "1px solid #111" }}>
            <div style={{
              width: 46, height: 46, borderRadius: 11, flexShrink: 0,
              background: `linear-gradient(135deg,${s.color}88,${s.color}22)`,
              border: `1px solid ${s.color}33`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", background: s.color }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#ddd", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{s.artist} · Song</div>
            </div>
            <div style={{ padding: "6px 8px" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Browse genres */}
      <div style={{ padding: "0 22px", marginBottom: 120 }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 16 }}>Browse</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {genres.map((g) => (
            <div key={g.name} style={{
              height: 80, borderRadius: 20, position: "relative", overflow: "hidden",
              background: `linear-gradient(135deg,${g.color1} 0%,${g.color2} 100%)`,
              padding: "16px 18px",
              display: "flex", alignItems: "flex-end",
            }}>
              <div style={{ position: "absolute", top: -22, right: -22, width: 85, height: 85, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
              <div style={{ position: "absolute", bottom: -32, left: -22, width: 95, height: 95, borderRadius: "50%", background: "rgba(0,0,0,0.13)" }} />
              <span style={{ fontSize: 17, fontWeight: 800, color: "#fff", position: "relative", letterSpacing: "-0.5px" }}>{g.name}</span>
            </div>
          ))}
        </div>
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
