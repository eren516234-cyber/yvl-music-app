const IOS = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const NAV = [
  { label: "Home", active: true, icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
  { label: "Search", active: false, icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  { label: "Library", active: false, icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { label: "Settings", active: false, icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

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
];

const tabs = ["For you", "Rock", "Hip-hop", "K-Pop", "Pop", "Bolly"];

const exploreCards = [
  { title: "Levitating", artist: "Dua Lipa", color: "#c77dff", x: 30, y: 22, r: -8, size: 54 },
  { title: "Blinding Lights", artist: "The Weeknd", color: "#e63946", x: 140, y: 8, r: 5, size: 46 },
  { title: "Flowers", artist: "Miley Cyrus", color: "#2d6a4f", x: 240, y: 20, r: -4, size: 52 },
  { title: "good 4 u", artist: "Olivia Rodrigo", color: "#f4a261", x: 80, y: 72, r: 6, size: 42 },
  { title: "Anti-Hero", artist: "Taylor Swift", color: "#6d597a", x: 200, y: 68, r: -6, size: 48 },
  { title: "As It Was", artist: "Harry Styles", color: "#457b9d", x: 300, y: 50, r: 8, size: 38 },
];

export function HomeScreen() {
  return (
    <div style={{
      width: 390, height: 844, background: "#080808",
      fontFamily: IOS, color: "#fff",
      overflowY: "auto", scrollbarWidth: "none", position: "relative",
    }}>
      {/* Status bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px 4px" }}>
        <span style={{ fontSize: 15, fontWeight: 600 }}>9:41</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <svg width="17" height="12" viewBox="0 0 17 12" fill="#fff">
            <rect x="0" y="3" width="3" height="9" rx="1" opacity="0.4" />
            <rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.6" />
            <rect x="9" y="0" width="3" height="12" rx="1" />
            <rect x="13.5" y="0" width="3" height="12" rx="1" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="#fff">
            <path d="M8 2.4C5.6 2.4 3.4 3.4 1.8 5L0 3.2C2.1 1.2 4.9 0 8 0s5.9 1.2 8 3.2L14.2 5C12.6 3.4 10.4 2.4 8 2.4z" opacity="0.5" />
            <path d="M8 5.6C6.4 5.6 5 6.2 3.9 7.2L2.1 5.4C3.7 3.9 5.7 3 8 3s4.3.9 5.9 2.4L12.1 7.2C11 6.2 9.6 5.6 8 5.6z" opacity="0.75" />
            <circle cx="8" cy="10" r="2" />
          </svg>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <div style={{ width: 25, height: 12, border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 3.5, position: "relative", padding: "1.5px" }}>
              <div style={{ width: "75%", height: "100%", background: "#fff", borderRadius: 1.5 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "10px 22px 8px" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#555", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 3 }}>Good evening</div>
          <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: "-2.5px", color: "#fff", lineHeight: 1 }}>YVL</div>
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: "linear-gradient(135deg,#fff 0%,#ccc 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 800, color: "#000",
        }}>E</div>
      </div>

      {/* Genre tabs */}
      <div style={{ display: "flex", gap: 8, padding: "0 22px 16px", overflowX: "auto", scrollbarWidth: "none" }}>
        {tabs.map((t, i) => (
          <div key={t} style={{
            flexShrink: 0, padding: "8px 18px", borderRadius: 999,
            background: i === 0 ? "#fff" : "transparent",
            color: i === 0 ? "#000" : "#555",
            fontSize: 13, fontWeight: i === 0 ? 700 : 500,
            border: i === 0 ? "none" : "1px solid #222",
          }}>{t}</div>
        ))}
      </div>

      {/* Quick Picks */}
      <div style={{ padding: "0 22px", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>Quick picks</div>
          <div style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>See all</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {songs.map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 12px", borderRadius: 16,
              background: i === 1 ? "rgba(255,255,255,0.05)" : "transparent",
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 13, flexShrink: 0,
                background: `linear-gradient(135deg,${s.color}88,${s.color}22)`,
                border: `1px solid ${s.color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: s.color, boxShadow: `0 0 14px ${s.color}` }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: i === 1 ? "#fff" : "#ddd", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</div>
                <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{s.artist}</div>
              </div>
              <div style={{ fontSize: 12, color: "#444" }}>{s.dur}</div>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: i === 1 ? "#fff" : "#1a1a1a",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="10" height="12" viewBox="0 0 10 12" fill={i === 1 ? "#000" : "#555"}>
                  <path d="M0 0L10 6L0 12V0Z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✨ EXPLORE SECTION */}
      <div style={{ padding: "0 22px", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>Explore ✦</div>
          <div style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>See all →</div>
        </div>
        <div style={{
          borderRadius: 22, overflow: "hidden", position: "relative",
          background: "linear-gradient(135deg,#0e0e0e 0%,#141414 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          height: 130, cursor: "pointer",
        }}>
          {/* Scattered floating cards */}
          <div style={{ position: "absolute", inset: 0 }}>
            {exploreCards.map((c, i) => (
              <div key={i} style={{
                position: "absolute",
                left: c.x, top: c.y,
                transform: `rotate(${c.r}deg)`,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              }}>
                <div style={{
                  width: c.size, height: c.size, borderRadius: "50%",
                  background: `radial-gradient(circle at 35% 30%,${c.color}cc,${c.color}33)`,
                  border: `1.5px solid ${c.color}55`,
                  boxShadow: `0 4px 16px ${c.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ width: c.size * 0.35, height: c.size * 0.35, borderRadius: "50%", background: c.color }} />
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.7)", textAlign: "center", maxWidth: 60, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</div>
              </div>
            ))}
          </div>
          {/* Overlay gradient */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, transparent 60%, #141414 100%)",
          }} />
          {/* Explore label */}
          <div style={{
            position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)",
            display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="3" />
                <path d="M11 2a9 9 0 100 18A9 9 0 0011 2z" />
                <path d="M14.5 14.5L21 21" />
              </svg>
            </div>
            <div style={{ fontSize: 11, color: "#fff", fontWeight: 700, letterSpacing: "0.08em" }}>EXPLORE</div>
          </div>
        </div>
      </div>

      {/* New Songs */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 22px", marginBottom: 12 }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>New songs</div>
          <div style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>See all</div>
        </div>
        <div style={{ display: "flex", gap: 14, padding: "0 22px", overflowX: "auto", scrollbarWidth: "none" }}>
          {albums.map((a, i) => (
            <div key={i} style={{ flexShrink: 0, width: 140 }}>
              <div style={{
                width: 140, height: 140, borderRadius: 22,
                background: `linear-gradient(135deg,${a.color}cc,${a.color}33)`,
                marginBottom: 10, position: "relative", overflow: "hidden",
                border: `1px solid ${a.color}33`,
              }}>
                <div style={{
                  position: "absolute", bottom: -20, right: -20,
                  width: 80, height: 80, borderRadius: "50%", background: `${a.color}33`,
                }} />
                <div style={{
                  position: "absolute", top: 12, left: 12,
                  fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase", letterSpacing: "0.18em",
                }}>Album</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#ddd", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.title}</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{a.artist}</div>
            </div>
          ))}
        </div>
      </div>

      {/* More to play */}
      <div style={{ padding: "0 22px", marginBottom: 160 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>More to play</div>
          <div style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>See all</div>
        </div>
        {more.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #111" }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: `hsl(${i * 55},30%,13%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: `hsl(${i * 55},60%,50%)` }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#ddd", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{s.artist}</div>
            </div>
            <div style={{ fontSize: 11, color: "#444" }}>{s.dur}</div>
          </div>
        ))}
      </div>

      {/* Mini player */}
      <div style={{
        position: "fixed", bottom: 76, left: "50%", transform: "translateX(-50%)",
        width: 358, borderRadius: 20,
        background: "rgba(18,18,18,0.96)", backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "11px 16px",
        display: "flex", alignItems: "center", gap: 12,
        boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: 11, flexShrink: 0,
          background: "linear-gradient(135deg,#e6394644,#e6394611)",
          border: "1px solid #e6394433",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: 15, height: 15, borderRadius: "50%", background: "#e63946" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>As It Was</div>
          <div style={{ fontSize: 11, color: "#666" }}>Harry Styles</div>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#aaa">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="#000">
              <path d="M0 0L12 7L0 14V0Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: 390, height: 76,
        background: "rgba(8,8,8,0.96)", backdropFilter: "blur(24px)",
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

      <div style={{ position: "fixed", bottom: 6, left: "50%", transform: "translateX(-50%)", width: 120, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.18)" }} />
    </div>
  );
}
