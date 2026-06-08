import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  Image,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { SaavnAlbum } from "@/lib/saavn";
import { bestImage } from "@/lib/saavn";

const { width: SCREEN_W } = Dimensions.get("window");
const CONTAINER = Math.min(SCREEN_W - 20, 400);
const R = CONTAINER * 0.38;
const TILE = CONTAINER * 0.11;
const PERSPECTIVE = CONTAINER * 1.6;
const CX = CONTAINER / 2;
const CY = CONTAINER / 2;

// Fibonacci sphere — even distribution
function fibonacciSphere(n: number) {
  const pts: { bx: number; by: number; bz: number }[] = [];
  const golden = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < n; i++) {
    const theta = 2 * Math.PI * (i / golden);
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
    pts.push({
      bx: Math.sin(phi) * Math.cos(theta),
      by: Math.sin(phi) * Math.sin(theta),
      bz: Math.cos(phi),
    });
  }
  return pts;
}

// Rotate + project 3D → 2D
function project(bx: number, by: number, bz: number, rx: number, ry: number) {
  const rxR = (rx * Math.PI) / 180;
  const ryR = (ry * Math.PI) / 180;
  // Y-axis rotation
  const x1 = bx * Math.cos(ryR) + bz * Math.sin(ryR);
  const y1 = by;
  const z1 = -bx * Math.sin(ryR) + bz * Math.cos(ryR);
  // X-axis rotation
  const x2 = x1;
  const y2 = y1 * Math.cos(rxR) - z1 * Math.sin(rxR);
  const z2 = y1 * Math.sin(rxR) + z1 * Math.cos(rxR);
  // Perspective divide
  const sc = PERSPECTIVE / (PERSPECTIVE - z2 * R);
  return { sx: CX + x2 * R * sc, sy: CY + y2 * R * sc, z: z2, sc };
}

const STARS = Array.from({ length: 40 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 1.8 + 0.5,
  opacity: Math.random() * 0.6 + 0.2,
}));

type Props = {
  albums: SaavnAlbum[];
  onAlbumPress: (album: SaavnAlbum) => void;
  accent: string;
};

export function EarthGlobe({ albums, onAlbumPress, accent }: Props) {
  const items = useMemo(() => albums.slice(0, 80), [albums]);
  const [rot, setRot] = useState({ x: -18, y: 30 });
  const rotRef = useRef({ x: -18, y: 30 });
  const velRef = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const frameCount = useRef(0);

  const basePoints = useMemo(() => fibonacciSphere(Math.min(items.length, 80)), [items.length]);

  useEffect(() => {
    let last = Date.now();
    const tick = () => {
      const now = Date.now();
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      frameCount.current++;

      if (!dragging.current) {
        const friction = 0.91;
        velRef.current.x *= friction;
        velRef.current.y *= friction;

        const autoY = Math.abs(velRef.current.y) < 0.08 && Math.abs(velRef.current.x) < 0.08 ? 0.18 * dt : 0;
        const nx = Math.max(-55, Math.min(55, rotRef.current.x + velRef.current.x));
        const ny = rotRef.current.y + velRef.current.y + autoY;
        rotRef.current = { x: nx, y: ny };

        // Only re-render at 30fps equivalent (every 2 frames)
        if (frameCount.current % 2 === 0) setRot({ x: nx, y: ny });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 3 || Math.abs(g.dy) > 3,
        onPanResponderGrant: (e) => {
          dragging.current = true;
          velRef.current = { x: 0, y: 0 };
          lastPos.current = { x: e.nativeEvent.pageX, y: e.nativeEvent.pageY };
        },
        onPanResponderMove: (e) => {
          const dx = e.nativeEvent.pageX - lastPos.current.x;
          const dy = e.nativeEvent.pageY - lastPos.current.y;
          lastPos.current = { x: e.nativeEvent.pageX, y: e.nativeEvent.pageY };
          const newVelY = dx * 0.55;
          const newVelX = -dy * 0.40;
          velRef.current = { x: newVelX, y: newVelY };
          const nx = Math.max(-55, Math.min(55, rotRef.current.x + newVelX));
          const ny = rotRef.current.y + newVelY;
          rotRef.current = { x: nx, y: ny };
          setRot({ x: nx, y: ny });
        },
        onPanResponderRelease: () => { dragging.current = false; },
        onPanResponderTerminate: () => { dragging.current = false; },
      }),
    [],
  );

  const projected = useMemo(() => {
    return items
      .map((album, i) => {
        if (i >= basePoints.length) return null;
        const { bx, by, bz } = basePoints[i];
        const { sx, sy, z, sc } = project(bx, by, bz, rot.x, rot.y);
        return { album, sx, sy, z, sc, i };
      })
      .filter(Boolean)
      .sort((a, b) => a!.z - b!.z) as {
        album: SaavnAlbum; sx: number; sy: number; z: number; sc: number; i: number;
      }[];
  }, [items, basePoints, rot]);

  if (!items.length) return null;

  return (
    <View style={[styles.container, { width: CONTAINER, height: CONTAINER }]}>
      {/* Deep space background */}
      <LinearGradient
        colors={["#03040f", "#060920", "#030410"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Stars */}
      {STARS.map((s, i) => (
        <View
          key={i}
          style={{
            position: "absolute",
            left: `${s.x}%` as any,
            top: `${s.y}%` as any,
            width: s.size,
            height: s.size,
            borderRadius: s.size / 2,
            backgroundColor: `rgba(255,255,255,${s.opacity})`,
          }}
          pointerEvents="none"
        />
      ))}

      {/* Equator ring */}
      <View
        style={[styles.equatorRing, { borderColor: `${accent}22` }]}
        pointerEvents="none"
      />

      {/* Outer glow */}
      <View
        style={[styles.outerGlow, {
          shadowColor: accent,
          shadowRadius: 50,
          shadowOpacity: 0.35,
          shadowOffset: { width: 0, height: 0 },
        }]}
        pointerEvents="none"
      />

      {/* Album tiles */}
      <View style={styles.scene} {...panResponder.panHandlers}>
        {projected.map(({ album, sx, sy, z, sc }) => {
          if (z < -0.88) return null;
          const size = Math.max(TILE * 0.6, TILE * sc * 0.92);
          const opacity = z > 0 ? 0.95 : Math.max(0.12, 0.6 + z * 0.8);
          const isFront = z > 0.3;
          const cover = bestImage(album.image);

          return (
            <Pressable
              key={album.id}
              onPress={() => isFront && onAlbumPress(album)}
              style={[styles.tile, {
                left: sx - size / 2,
                top: sy - size / 2,
                width: size,
                height: size,
                opacity,
                borderRadius: size * 0.18,
                borderWidth: isFront ? 1.5 : 0,
                borderColor: isFront ? `${accent}55` : "transparent",
                zIndex: Math.round(z * 100 + 100),
              }]}
            >
              {cover ? (
                <Image
                  source={{ uri: cover }}
                  style={[styles.tileImg, { borderRadius: size * 0.18 }]}
                />
              ) : (
                <View style={[styles.tileFallback, { borderRadius: size * 0.18 }]}>
                  <Text style={{ color: "#fff", fontSize: size * 0.32, fontWeight: "700" }}>
                    {album.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              {/* Neon glow on front tiles */}
              {isFront && (
                <View style={[StyleSheet.absoluteFill, {
                  borderRadius: size * 0.18,
                  shadowColor: accent,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.6,
                  shadowRadius: 8,
                }]} pointerEvents="none" />
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Center glow core */}
      <View style={[styles.coreGlow, { backgroundColor: `${accent}08` }]} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    borderRadius: 24,
    overflow: "hidden",
  },
  scene: { ...StyleSheet.absoluteFillObject },
  equatorRing: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
    marginTop: -1,
    left: "12%",
    right: "12%",
    height: 1,
    borderTopWidth: 1,
    borderStyle: "dashed",
  },
  outerGlow: {
    position: "absolute",
    width: CONTAINER * 0.65,
    height: CONTAINER * 0.65,
    borderRadius: CONTAINER * 0.325,
    alignSelf: "center",
    top: CONTAINER * 0.175,
    backgroundColor: "transparent",
  },
  coreGlow: {
    position: "absolute",
    width: CONTAINER * 0.5,
    height: CONTAINER * 0.5,
    borderRadius: CONTAINER * 0.25,
    alignSelf: "center",
    top: CONTAINER * 0.25,
  },
  tile: { position: "absolute", overflow: "hidden" },
  tileImg: { width: "100%", height: "100%" },
  tileFallback: {
    width: "100%", height: "100%",
    backgroundColor: "#1a1a2e",
    alignItems: "center", justifyContent: "center",
  },
});
