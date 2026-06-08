const IOS_FONT = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const tiles = [
  { bg: "linear-gradient(135deg,#c62828,#6a0000)", top: 0, left: 0, w: 180, h: 160, rotate: -2 },
  { bg: "linear-gradient(135deg,#1565c0,#003c8f)", top: 0, left: 186, w: 200, h: 120, rotate: 1 },
  { bg: "linear-gradient(135deg,#2e7d32,#1b5e20)", top: 128, left: 186, w: 200, h: 140, rotate: -1 },
  { bg: "linear-gradient(135deg,#6a1b9a,#4a148c)", top: 166, left: -4, w: 200, h: 160, rotate: 2 },
  { bg: "linear-gradient(135deg,#e65100,#bf360c)", top: 296, left: -4, w: 140, h: 120, rotate: -1 },
  { bg: "linear-gradient(135deg,#37474f,#1c313a)", top: 276, left: 146, w: 240, h: 140, rotate: 1.5 },
  { bg: "linear-gradient(135deg,#ad1457,#880e4f)", top: 0, left: 170, w: 240, h: 50, rotate: 0 },
];

const ArtTile = ({ tile }: { tile: typeof tiles[0] }) => (
  <div style={{
    position: "absolute",
    top: tile.top, left: tile.left,
    width: tile.w, height: tile.h,
    background: tile.bg,
    borderRadius: 20,
    transform: `rotate(${tile.rotate}deg)`,
    overflow: "hidden",
  }}>
    <div style={{
      position: "absolute", inset: 0,
      background: "rgba(0,0,0,0.18)",
    }} />
    <div style={{
      position: "absolute", bottom: 14, left: 14,
      width: 32, height: 32, borderRadius: "50%",
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 16,
    }}>🎵</div>
    <div style={{
      position: "absolute", top: 14, right: 14,
      padding: "3px 8px", borderRadius: 999,
      background: "rgba(255,255,255,0.12)",
      fontSize: 9, fontWeight: 700, color: "#fff",
      letterSpacing: "0.12em", textTransform: "uppercase",
    }}>NEW</div>
  </div>
);

export function SplashScreen() {
  return (
    <div style={{
      width: 390, height: 844,
      background: "#050505",
      fontFamily: IOS_FONT,
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Collage grid area */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 480, overflow: "hidden" }}>
        {tiles.map((tile, i) => <ArtTile key={i} tile={tile} />)}
        {/* Live badge */}
        <div style={{
          position: "absolute", bottom: 60, left: 24,
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 14px", borderRadius: 999,
          background: "rgba(20,20,20,0.8)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff3b30" }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#fff" }}>LIVE</span>
        </div>
        {/* Gradient fade down */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 200,
          background: "linear-gradient(to bottom, transparent 0%, #050505 100%)",
        }} />
      </div>

      {/* Bottom content */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "0 28px 48px",
      }}>
        {/* Brand badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          marginBottom: 20,
          padding: "6px 14px", borderRadius: 999,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.2em", color: "#fff" }}>YVL</span>
          <div style={{ width: 1, height: 12, background: "rgba(255,255,255,0.2)" }} />
          <span style={{ fontSize: 11, color: "#888", fontWeight: 500 }}>Music</span>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 42, fontWeight: 800,
          letterSpacing: "-1.5px",
          lineHeight: 1.05,
          marginBottom: 14,
          color: "#fff",
        }}>
          Music without<br />
          <span style={{ color: "#ffffff", opacity: 0.45 }}>borders</span>
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: 15, color: "#555", fontWeight: 400,
          lineHeight: 1.5, marginBottom: 36,
          maxWidth: 300,
        }}>
          Create playlists, find new tracks and listen to your favorite music anytime.
        </div>

        {/* Get Started button */}
        <div style={{
          width: "100%",
          padding: "17px 0",
          borderRadius: 16,
          background: "#fff",
          textAlign: "center",
          fontSize: 16, fontWeight: 700, color: "#000",
          letterSpacing: "-0.3px",
          cursor: "pointer",
          boxShadow: "0 0 40px rgba(255,255,255,0.12)",
        }}>
          Get started →
        </div>

        {/* Sign in */}
        <div style={{
          textAlign: "center", marginTop: 18,
          fontSize: 13, color: "#444", fontWeight: 500,
        }}>
          Already have an account?{" "}
          <span style={{ color: "#fff", fontWeight: 700 }}>Sign in</span>
        </div>
      </div>

      {/* iOS Home indicator */}
      <div style={{
        position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
        width: 120, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)",
      }} />
    </div>
  );
}
