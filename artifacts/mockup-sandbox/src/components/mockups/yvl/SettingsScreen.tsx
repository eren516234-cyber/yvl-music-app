import { useState } from "react";

const IOS = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const COLORS = [
  "#ff6b6b", "#c77dff", "#4ecdc4", "#457b9d", "#f72585",
  "#f4a261", "#06d6a0", "#e63946",
];

const NAV = [
  { label: "Home", active: false, icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
  { label: "Search", active: false, icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  { label: "Library", active: false, icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { label: "Settings", active: true, icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

function Toggle({ on }: { on: boolean }) {
  return (
    <div style={{
      width: 50, height: 28, borderRadius: 14,
      background: on ? "#fff" : "#2a2a2a",
      position: "relative", transition: "background 0.2s",
      flexShrink: 0,
    }}>
      <div style={{
        position: "absolute", top: 3, left: on ? 25 : 3,
        width: 22, height: 22, borderRadius: "50%",
        background: on ? "#000" : "#555",
        transition: "left 0.2s",
        boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
      }} />
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: "#444", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10, marginTop: 4 }}>{label}</div>
  );
}

export function SettingsScreen() {
  const [rainbow, setRainbow] = useState(true);
  const [perScreen, setPerScreen] = useState(true);
  const [selectedColor, setSelectedColor] = useState(1);

  return (
    <div style={{
      width: 390, height: 844, background: "#080808",
      fontFamily: IOS, color: "#fff",
      overflowY: "auto", scrollbarWidth: "none", position: "relative",
    }}>
      {/* Status bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px 4px" }}>
        <span style={{ fontSize: 15, fontWeight: 600 }}>9:41</span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ width: 3, height: 6 + i * 2, background: i < 3 ? "#fff" : "#333", borderRadius: 1 }} />
          ))}
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: "12px 22px 24px" }}>
        <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-2px", lineHeight: 1 }}>Settings</div>
      </div>

      <div style={{ padding: "0 18px 160px" }}>
        {/* THEME */}
        <SectionLabel label="Theme" />

        {/* Rainbow Mode */}
        <div style={{
          background: "#111", borderRadius: 18, padding: "16px 18px",
          marginBottom: 10, border: "1px solid #1e1e1e",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} onClick={() => setRainbow(!rainbow)}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 18 }}>🌈</span>
                <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.3px" }}>Rainbow Mode</span>
              </div>
              <div style={{ fontSize: 12, color: "#555", paddingLeft: 26 }}>Change the whole app's colour</div>
            </div>
            <Toggle on={rainbow} />
          </div>
        </div>

        {/* Custom Colour */}
        <div style={{
          background: "#111", borderRadius: 18, padding: "16px 18px",
          marginBottom: 10, border: "1px solid #1e1e1e",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 18 }}>✏️</span>
            <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.3px" }}>Custom Colour</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {COLORS.map((c, i) => (
              <div key={i} onClick={() => setSelectedColor(i)} style={{
                width: 46, height: 46, borderRadius: "50%",
                background: c,
                cursor: "pointer", position: "relative",
                boxShadow: selectedColor === i ? `0 0 0 3px #fff, 0 0 0 5px ${c}` : "none",
                transition: "box-shadow 0.2s",
              }}>
                {selectedColor === i && (
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Per-Screen Colour */}
        <div style={{
          background: "#111", borderRadius: 18, padding: "16px 18px",
          marginBottom: 10, border: "1px solid #1e1e1e",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} onClick={() => setPerScreen(!perScreen)}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 18 }}>🎨</span>
                <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.3px" }}>Per-Screen Colour</span>
              </div>
              <div style={{ fontSize: 12, color: "#555", paddingLeft: 26 }}>Each screen has its own colour</div>
            </div>
            <Toggle on={perScreen} />
          </div>
        </div>

        {/* Reset button */}
        <div style={{
          background: "#111", borderRadius: 18, padding: "16px 18px",
          marginBottom: 28, border: "1px solid #1e1e1e",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#aaa", letterSpacing: "-0.2px" }}>Reset to Black &amp; White</span>
        </div>

        {/* PLAYBACK */}
        <SectionLabel label="Playback" />

        {/* Audio Quality */}
        <div style={{
          background: "#111", borderRadius: 18, padding: "16px 18px",
          marginBottom: 10, border: "1px solid #1e1e1e",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.3px", marginBottom: 3 }}>🎧 Audio Quality</div>
              <div style={{ fontSize: 12, color: "#555" }}>Streamed from JioSaavn (Melo API)</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12, color: "#555", fontWeight: 600 }}>High</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Download Quality */}
        <div style={{
          background: "#111", borderRadius: 18, padding: "16px 18px",
          marginBottom: 10, border: "1px solid #1e1e1e",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.3px", marginBottom: 3 }}>⬇️ Download Quality</div>
              <div style={{ fontSize: 12, color: "#555" }}>Stored locally on device</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12, color: "#555", fontWeight: 600 }}>320kbps</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Crossfade */}
        <div style={{
          background: "#111", borderRadius: 18, padding: "16px 18px",
          marginBottom: 28, border: "1px solid #1e1e1e",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.3px", marginBottom: 3 }}>🎚️ Crossfade</div>
              <div style={{ fontSize: 12, color: "#555" }}>Smooth transition between songs</div>
            </div>
            <Toggle on={false} />
          </div>
        </div>

        {/* ACCOUNT */}
        <SectionLabel label="Account" />

        <div style={{
          background: "#111", borderRadius: 18, overflow: "hidden",
          border: "1px solid #1e1e1e", marginBottom: 28,
        }}>
          {[
            { emoji: "👤", label: "Profile", sub: "eren516234-cyber" },
            { emoji: "🔒", label: "Privacy", sub: "Manage your data" },
            { emoji: "🔔", label: "Notifications", sub: "Push alerts & reminders" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", padding: "14px 18px",
              borderBottom: i < 2 ? "1px solid #1a1a1a" : "none",
            }}>
              <span style={{ fontSize: 18, marginRight: 12 }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.2px" }}>{item.label}</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>{item.sub}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          ))}
        </div>

        {/* Version */}
        <div style={{ textAlign: "center", fontSize: 11, color: "#2a2a2a", fontWeight: 500 }}>YVL Music · v1.0.0 · Built with ❤️</div>
      </div>

      {/* Bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: 390, height: 76,
        background: "rgba(8,8,8,0.97)", backdropFilter: "blur(24px)",
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
