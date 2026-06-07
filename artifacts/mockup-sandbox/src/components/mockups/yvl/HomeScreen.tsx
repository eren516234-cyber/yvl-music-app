export function HomeScreen() {
  const songs = [
    { title: "Blinding Lights", artist: "The Weeknd", dur: "3:20", color: "#e63946" },
    { title: "As It Was", artist: "Harry Styles", dur: "2:37", color: "#457b9d" },
    { title: "Flowers", artist: "Miley Cyrus", dur: "3:21", color: "#2d6a4f" },
    { title: "Anti-Hero", artist: "Taylor Swift", dur: "3:21", color: "#6d597a" },
    { title: "Unholy", artist: "Sam Smith", dur: "2:36", color: "#c77dff" },
  ];
  const albums = [
    { title: "After Hours", artist: "The Weeknd", color: "#c62828" },
    { title: "Fine Line", artist: "Harry Styles", color: "#1565c0" },
    { title: "Endless Summer", artist: "Miley Cyrus", color: "#2e7d32" },
    { title: "Midnights", artist: "Taylor Swift", color: "#4a148c" },
    { title: "Gloria", artist: "Sam Smith", color: "#37474f" },
  ];
  const more = [
    { title: "Levitating", artist: "Dua Lipa", dur: "3:23" },
    { title: "good 4 u", artist: "Olivia Rodrigo", dur: "2:58" },
    { title: "Stay", artist: "The Kid LAROI", dur: "2:21" },
    { title: "Bad Habits", artist: "Ed Sheeran", dur: "3:51" },
    { title: "Save Your Tears", artist: "The Weeknd", dur: "3:35" },
    { title: "Peaches", artist: "Justin Bieber", dur: "3:18" },
  ];
  const tabs = ["For you", "Rock", "Hip-hop", "K-Pop", "Pop", "Bolly"];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: 390,
        height: 844,
        background: "#080808",
        fontFamily: "'Inter', sans-serif",
        color: "#fff",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
    >
      {/* Status bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-1">
        <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>9:41</span>
        <div className="flex gap-1 items-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ width: 3, height: 6 + i * 2, background: i < 3 ? "#fff" : "#444", borderRadius: 1 }} />
          ))}
          <div style={{ width: 15, height: 8, border: "1.5px solid #fff", borderRadius: 3, marginLeft: 4, position: "relative" }}>
            <div style={{ position: "absolute", left: 2, top: 1.5, width: 8, height: 5, background: "#fff", borderRadius: 1 }} />
            <div style={{ position: "absolute", right: -3, top: 2.5, width: 2, height: 3, background: "#fff", borderRadius: 1 }} />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-end px-5 pt-3 pb-2">
        <div>
          <div style={{ fontSize: 11, fontWeight: 500, color: "#666", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 2 }}>Good evening</div>
          <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-2px", color: "#fff", lineHeight: 1 }}>YVL</div>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "linear-gradient(135deg, #fff 0%, #aaa 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 800, color: "#000"
        }}>E</div>
      </div>

      {/* Genre tabs */}
      <div className="flex gap-2 px-5 pb-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {tabs.map((t, i) => (
          <div key={t} style={{
            flexShrink: 0,
            padding: "7px 16px",
            borderRadius: 999,
            background: i === 0 ? "#fff" : "transparent",
            color: i === 0 ? "#000" : "#666",
            fontSize: 13,
            fontWeight: i === 0 ? 700 : 500,
            border: i === 0 ? "none" : "1px solid #222",
            cursor: "pointer",
          }}>{t}</div>
        ))}
      </div>

      {/* Quick Picks */}
      <div className="px-5 mb-5">
        <div className="flex justify-between items-end mb-3">
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>Quick picks</div>
          <div style={{ fontSize: 12, color: "#555", fontWeight: 500 }}>See all</div>
        </div>
        <div className="flex flex-col gap-1">
          {songs.map((s, i) => (
            <div key={i} className="flex items-center gap-3" style={{
              padding: "10px 12px", borderRadius: 16,
              background: i === 1 ? "rgba(255,255,255,0.05)" : "transparent",
              cursor: "pointer",
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                background: `linear-gradient(135deg, ${s.color}88, ${s.color}33)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `1px solid ${s.color}44`,
              }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: s.color, boxShadow: `0 0 12px ${s.color}` }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: i === 1 ? "#fff" : "#ddd", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>{s.artist}</div>
              </div>
              <div style={{ fontSize: 11, color: "#444" }}>{s.dur}</div>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                background: i === 1 ? "#fff" : "#1a1a1a",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <svg width="10" height="12" viewBox="0 0 10 12" fill={i === 1 ? "#000" : "#555"}>
                  <path d="M0 0L10 6L0 12V0Z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Songs / Albums */}
      <div className="mb-5">
        <div className="flex justify-between items-end px-5 mb-3">
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>New songs</div>
          <div style={{ fontSize: 12, color: "#555", fontWeight: 500 }}>See all</div>
        </div>
        <div className="flex gap-3 px-5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {albums.map((a, i) => (
            <div key={i} style={{ flexShrink: 0, width: 140 }}>
              <div style={{
                width: 140, height: 140, borderRadius: 20,
                background: `linear-gradient(135deg, ${a.color}cc, ${a.color}44)`,
                marginBottom: 10, position: "relative", overflow: "hidden",
                border: `1px solid ${a.color}33`,
              }}>
                <div style={{
                  position: "absolute", bottom: -20, right: -20, width: 80, height: 80,
                  borderRadius: "50%", background: `${a.color}44`, backdropFilter: "blur(8px)"
                }} />
                <div style={{
                  position: "absolute", top: 12, left: 12, fontSize: 11, fontWeight: 700,
                  color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.15em"
                }}>Album</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#ddd", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.title}</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{a.artist}</div>
            </div>
          ))}
        </div>
      </div>

      {/* More to play */}
      <div className="px-5 mb-24">
        <div className="flex justify-between items-end mb-3">
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>More to play</div>
          <div style={{ fontSize: 12, color: "#555", fontWeight: 500 }}>See all</div>
        </div>
        <div className="flex flex-col gap-0">
          {more.map((s, i) => (
            <div key={i} className="flex items-center gap-3" style={{ padding: "9px 0", borderBottom: "1px solid #111" }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: `hsl(${i * 60}, 30%, 15%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: `hsl(${i * 60}, 60%, 50%)` }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#ddd", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>{s.artist}</div>
              </div>
              <div style={{ fontSize: 11, color: "#444" }}>{s.dur}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini player */}
      <div style={{
        position: "fixed", bottom: 68, left: "50%", transform: "translateX(-50%)",
        width: 358, borderRadius: 20,
        background: "rgba(20,20,20,0.95)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "10px 14px",
        display: "flex", alignItems: "center", gap: 12,
        boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
          background: "linear-gradient(135deg, #e6394644, #e6394611)",
          border: "1px solid #e6394433",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#e63946" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>As It Was</div>
          <div style={{ fontSize: 11, color: "#666" }}>Harry Styles</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <svg width="14" height="16" viewBox="0 0 14 16" fill="#fff">
            <path d="M0 0L9 8L0 16V0Z M10 0H14V16H10Z" />
          </svg>
          <svg width="14" height="16" viewBox="0 0 14 16" fill="#fff">
            <path d="M14 0L5 8L14 16V0Z M0 0H4V16H0Z" />
          </svg>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderLeft: "12px solid #000", marginLeft: 2 }} />
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: 390, height: 68,
        background: "rgba(8,8,8,0.95)", backdropFilter: "blur(20px)",
        borderTop: "1px solid #1a1a1a",
        display: "flex", justifyContent: "space-around", alignItems: "center",
        paddingBottom: 8,
      }}>
        {[
          { label: "Home", active: true, icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
          { label: "Search", active: false, icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
          { label: "Library", active: false, icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
          { label: "Settings", active: false, icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
        ].map((n) => (
          <div key={n.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={n.active ? "#fff" : "#444"} strokeWidth={n.active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d={n.icon} />
            </svg>
            <span style={{ fontSize: 9, fontWeight: n.active ? 700 : 500, color: n.active ? "#fff" : "#444", letterSpacing: "0.1em", textTransform: "uppercase" }}>{n.label}</span>
          </div>
        ))}
      </div>

      {/* Home indicator */}
      <div style={{ position: "fixed", bottom: 6, left: "50%", transform: "translateX(-50%)", width: 120, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
    </div>
  );
}
