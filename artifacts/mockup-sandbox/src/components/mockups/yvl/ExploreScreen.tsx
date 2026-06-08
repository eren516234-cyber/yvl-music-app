const IOS = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const floatingCards = [
  { title: "Levitating", artist: "Dua Lipa", color: "#c77dff", x: 28, y: 60, r: -8, size: 72 },
  { title: "Blinding Lights", artist: "The Weeknd", color: "#e63946", x: 160, y: 30, r: 5, size: 58 },
  { title: "Flowers", artist: "Miley Cyrus", color: "#2d6a4f", x: 268, y: 65, r: -4, size: 66 },
  { title: "good 4 u", artist: "Olivia Rodrigo", color: "#f4a261", x: 60, y: 155, r: 7, size: 52 },
  { title: "Dynamite", artist: "BTS", color: "#ad1457", x: 190, y: 148, r: -6, size: 60 },
  { title: "As It Was", artist: "Harry Styles", color: "#457b9d", x: 300, y: 140, r: 9, size: 48 },
  { title: "Stay", artist: "The Kid LAROI", color: "#e65100", x: 10, y: 260, r: -5, size: 56 },
  { title: "Anti-Hero", artist: "Taylor Swift", color: "#6d597a", x: 130, y: 255, r: 6, size: 64 },
  { title: "LALISA", artist: "LISA", color: "#7b1fa2", x: 255, y: 248, r: -7, size: 54 },
  { title: "Butter", artist: "BTS", color: "#f9c74f", x: 68, y: 355, r: 4, size: 48 },
  { title: "Unholy", artist: "Sam Smith", color: "#9b2226", x: 195, y: 365, r: -3, size: 58 },
  { title: "Pink Venom", artist: "BLACKPINK", color: "#d62828", x: 306, y: 348, r: 8, size: 50 },
];

const trending = [
  { rank: 1, title: "Blinding Lights", artist: "The Weeknd", color: "#e63946", change: "+3" },
  { rank: 2, title: "Levitating", artist: "Dua Lipa", color: "#c77dff", change: "+1" },
  { rank: 3, title: "Dynamite", artist: "BTS", color: "#ad1457", change: "-1" },
  { rank: 4, title: "As It Was", artist: "Harry Styles", color: "#457b9d", change: "+5" },
];

const NAV = [
  { label: "Home", active: false, icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
  { label: "Search", active: false, icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  { label: "Explore", active: true, icon: "M12 2a10 10 0 100 20A10 10 0 0012 2z M12 8a4 4 0 100 8 4 4 0 000-8z" },
  { label: "Library", active: false, icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { label: "Settings", active: false, icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

export function ExploreScreen() {
  return (
    <div style={{
      width: 390, height: 844,
      background: "#060606",
      fontFamily: IOS, color: "#fff",
      position: "relative", overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%,rgba(100,60,200,0.08) 0%,transparent 60%)" }} />

      {/* Status bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px 4px", position: "relative", zIndex: 10 }}>
        <span style={{ fontSize: 15, fontWeight: 600 }}>9:41</span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ width: 3, height: 6 + i * 2, background: i < 3 ? "#fff" : "#333", borderRadius: 1 }} />
          ))}
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: "8px 22px 0", position: "relative", zIndex: 10 }}>
        <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-2px", color: "#fff", lineHeight: 1 }}>
          Explore
          <span style={{ fontSize: 28, marginLeft: 8 }}>✦</span>
        </div>
        <div style={{ fontSize: 13, color: "#444", marginTop: 6, fontWeight: 400 }}>Discover new music just for you</div>
      </div>

      {/* Floating scattered song cards */}
      <div style={{ position: "relative", height: 430, margin: "16px 0 0", overflow: "hidden" }}>
        {/* Subtle grid lines for depth */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.015) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

        {floatingCards.map((c, i) => (
          <div key={i} style={{
            position: "absolute",
            left: c.x, top: c.y,
            transform: `rotate(${c.r}deg)`,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            cursor: "pointer",
          }}>
            {/* Circle avatar */}
            <div style={{
              width: c.size, height: c.size, borderRadius: "50%",
              background: `radial-gradient(circle at 35% 30%,${c.color}dd,${c.color}44)`,
              border: `2px solid ${c.color}66`,
              boxShadow: `0 6px 24px ${c.color}44, 0 0 0 4px ${c.color}11`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              <div style={{ width: c.size * 0.38, height: c.size * 0.38, borderRadius: "50%", background: `${c.color}cc`, boxShadow: `0 0 14px ${c.color}` }} />
              {/* Shine overlay */}
              <div style={{
                position: "absolute", top: "15%", left: "20%",
                width: "30%", height: "20%", borderRadius: "50%",
                background: "rgba(255,255,255,0.25)",
                filter: "blur(2px)",
              }} />
            </div>
            {/* Title & artist stacked */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.85)", maxWidth: 72, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", letterSpacing: "-0.2px" }}>{c.title}</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", maxWidth: 72, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 1 }}>{c.artist}</div>
            </div>
          </div>
        ))}

        {/* Center glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 200, height: 200, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(255,255,255,0.03) 0%,transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Fade edges */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 50, background: "linear-gradient(to bottom,#060606,transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top,#060606,transparent)", pointerEvents: "none" }} />
      </div>

      {/* Trending section */}
      <div style={{ padding: "0 22px", position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 }}>
          <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.5px" }}>🔥 Trending now</div>
          <div style={{ fontSize: 12, color: "#555", fontWeight: 500 }}>See all</div>
        </div>
        {trending.map((t) => (
          <div key={t.rank} style={{ display: "flex", alignItems: "center", gap: 14, padding: "9px 0", borderBottom: "1px solid #111" }}>
            <div style={{ width: 26, fontSize: 13, fontWeight: 800, color: "#333", textAlign: "center" }}>#{t.rank}</div>
            <div style={{
              width: 42, height: 42, borderRadius: 11, flexShrink: 0,
              background: `linear-gradient(135deg,${t.color}88,${t.color}22)`,
              border: `1px solid ${t.color}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ width: 15, height: 15, borderRadius: "50%", background: t.color }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#ddd", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.title}</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{t.artist}</div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.change.startsWith("+") ? "#2d6a4f" : "#555" }}>{t.change}</div>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: 390, height: 76,
        background: "rgba(6,6,6,0.97)", backdropFilter: "blur(24px)",
        borderTop: "1px solid #181818",
        display: "flex", justifyContent: "space-around", alignItems: "center",
        paddingBottom: 10,
      }}>
        {NAV.map((n) => (
          <div key={n.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={n.active ? "#fff" : "none"} stroke={n.active ? "none" : "#3a3a3a"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
