export function SearchScreen() {
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
    { title: "Dynamite", artist: "BTS", type: "Song", color: "#ad1457" },
    { title: "LALISA", artist: "LISA", type: "Song", color: "#7b1fa2" },
    { title: "Butter", artist: "BTS", type: "Song", color: "#f57f17" },
    { title: "Pink Venom", artist: "BLACKPINK", type: "Song", color: "#c62828" },
    { title: "After LIKE", artist: "IVE", type: "Song", color: "#1565c0" },
    { title: "Nxde", artist: "(G)I-DLE", type: "Song", color: "#2e7d32" },
  ];

  const artists = [
    { name: "BTS", color: "#4a148c" },
    { name: "BLACKPINK", color: "#c62828" },
    { name: "LISA", color: "#7b1fa2" },
    { name: "aespa", color: "#004d40" },
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
      <div className="px-5 pt-4 pb-3">
        <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-2px", color: "#fff", lineHeight: 1, marginBottom: 16 }}>Search</div>

        {/* Search bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16, padding: "13px 16px",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span style={{ fontSize: 14, color: "#333", flex: 1 }}>Songs, artists, albums…</span>
          <div style={{ width: 1, height: 18, background: "#222" }} />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
          </svg>
        </div>
      </div>

      {/* Recent searches */}
      <div className="px-5 mb-5">
        <div style={{ fontSize: 11, fontWeight: 700, color: "#444", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Recent</div>
        <div className="flex flex-wrap gap-2">
          {recent.map((r) => (
            <div key={r} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 14px", borderRadius: 999,
              border: "1px solid #222", background: "#0e0e0e",
              fontSize: 13, color: "#aaa", cursor: "pointer",
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

      {/* Artists row */}
      <div className="mb-5">
        <div className="flex justify-between items-end px-5 mb-3">
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>Artists</div>
        </div>
        <div className="flex gap-4 px-5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {artists.map((a, i) => (
            <div key={i} style={{ flexShrink: 0, textAlign: "center", width: 80 }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: `radial-gradient(circle at 40% 35%, ${a.color}88, ${a.color}22)`,
                border: `2px solid ${a.color}44`,
                marginBottom: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: a.color }} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#ddd" }}>{a.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Song results */}
      <div className="px-5 mb-5">
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>Songs</div>
        <div className="flex flex-col gap-1">
          {results.map((s, i) => (
            <div key={i} className="flex items-center gap-3" style={{ padding: "9px 0", borderBottom: "1px solid #111" }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                background: `linear-gradient(135deg, ${s.color}88, ${s.color}22)`,
                border: `1px solid ${s.color}33`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: s.color }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#ddd", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>{s.artist} · {s.type}</div>
              </div>
              <div style={{ padding: "6px 8px", cursor: "pointer" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browse genres */}
      <div className="px-5 mb-24">
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 14 }}>Browse</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {genres.map((g) => (
            <div key={g.name} style={{
              height: 76, borderRadius: 18, position: "relative", overflow: "hidden",
              background: `linear-gradient(135deg, ${g.color1} 0%, ${g.color2} 100%)`,
              cursor: "pointer", padding: "14px 16px",
              display: "flex", alignItems: "flex-end",
            }}>
              <div style={{
                position: "absolute", top: -20, right: -20,
                width: 80, height: 80, borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
              }} />
              <div style={{
                position: "absolute", bottom: -30, left: -20,
                width: 90, height: 90, borderRadius: "50%",
                background: "rgba(0,0,0,0.15)",
              }} />
              <span style={{ fontSize: 16, fontWeight: 800, color: "#fff", position: "relative", letterSpacing: "-0.5px" }}>{g.name}</span>
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
          { label: "Home", active: false, path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
          { label: "Search", active: true, path: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
          { label: "Library", active: false, path: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
          { label: "Settings", active: false, path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
        ].map((n) => (
          <div key={n.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={n.active ? "#fff" : "#444"} strokeWidth={n.active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d={n.path} />
            </svg>
            <span style={{ fontSize: 9, fontWeight: n.active ? 700 : 500, color: n.active ? "#fff" : "#444", letterSpacing: "0.1em", textTransform: "uppercase" }}>{n.label}</span>
          </div>
        ))}
      </div>

      <div style={{ position: "fixed", bottom: 6, left: "50%", transform: "translateX(-50%)", width: 120, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
    </div>
  );
}
