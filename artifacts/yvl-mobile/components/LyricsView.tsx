import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { Lyrics, LyricsLine } from "@/lib/lrclib";
import { usePlayer } from "@/contexts/PlayerContext";

function useSmoothPosition(position: number) {
  const { isPlaying } = usePlayer();
  const [smooth, setSmooth] = useState(position);
  const baseRef = useRef({ pos: position, t: Date.now(), playing: isPlaying });
  useEffect(() => {
    baseRef.current = { pos: position, t: Date.now(), playing: isPlaying };
    setSmooth(position);
  }, [position, isPlaying]);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const b = baseRef.current;
      if (b.playing) setSmooth(b.pos + (Date.now() - b.t) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return smooth;
}

export type LyricsMode =
  | "ios" | "karaoke" | "word" | "char" | "wave" | "neon" | "cinematic" | "floating";

export const LYRICS_MODES: { key: LyricsMode; icon: string; label: string }[] = [
  { key: "ios",       icon: "🎵", label: "Apple" },
  { key: "karaoke",   icon: "🎤", label: "Karaoke" },
  { key: "word",      icon: "✨", label: "Word" },
  { key: "char",      icon: "⌨️", label: "Char" },
  { key: "wave",      icon: "🌊", label: "Wave" },
  { key: "neon",      icon: "💫", label: "Neon" },
  { key: "cinematic", icon: "🎬", label: "Cinema" },
  { key: "floating",  icon: "🌙", label: "Float" },
];

type Props = {
  lyrics: Lyrics;
  position: number;
  duration: number;
  loading: boolean;
  accent: string;
  fg: string;
  bg: string;
  mode: LyricsMode;
  onSeek?: (t: number) => void;
};

function useWaveAnim() {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(anim, { toValue: 1, duration: 3200, useNativeDriver: true })
    );
    loop.start();
    return () => loop.stop();
  }, []);
  return anim;
}

function useGlowAnim(active: boolean) {
  const anim = useRef(new Animated.Value(0.6)).current;
  useEffect(() => {
    if (!active) return;
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 700, useNativeDriver: false }),
        Animated.timing(anim, { toValue: 0.5, duration: 700, useNativeDriver: false }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [active]);
  return anim;
}

export function LyricsView({ lyrics, position, duration, loading, accent, fg, bg, mode, onSeek }: Props) {
  const smoothPos = useSmoothPosition(position);
  const scrollRef = useRef<ScrollView>(null);
  const lineYs = useRef<number[]>([]);
  const [containerH, setContainerH] = useState(500);
  const userScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const waveAnim = useWaveAnim();

  const synced = lyrics?.synced ?? [];

  const activeLine = useMemo(() => {
    let idx = -1;
    for (let i = 0; i < synced.length; i++) {
      if (synced[i].time <= smoothPos) idx = i;
      else break;
    }
    return idx;
  }, [synced, smoothPos]);

  useEffect(() => {
    if (activeLine < 0 || userScrolling.current) return;
    const y = lineYs.current[activeLine];
    if (y == null) return;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - containerH / 2 + 36), animated: true });
  }, [activeLine, containerH]);

  const { activeWord, activeChar } = useMemo(() => {
    if (activeLine < 0 || !synced.length) return { activeWord: -1, activeChar: -1 };
    const line = synced[activeLine];
    const lineEnd = synced[activeLine + 1]?.time ?? duration;
    const elapsed = Math.max(0, smoothPos - line.time);
    const lineDur = Math.max(0.5, lineEnd - line.time);
    const words = (line.text || "").split(" ").filter(Boolean);
    const chars = [...(line.text || "")];
    return {
      activeWord: Math.min(words.length - 1, Math.floor(elapsed / (lineDur / Math.max(1, words.length)))),
      activeChar: Math.min(chars.length - 1, Math.floor(elapsed / (lineDur / Math.max(1, chars.length)))),
    };
  }, [activeLine, smoothPos, synced, duration]);

  const onScrollBeginDrag = useCallback(() => {
    userScrolling.current = true;
    clearTimeout(scrollTimeout.current);
  }, []);
  const onScrollEnd = useCallback(() => {
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => { userScrolling.current = false; }, 3500);
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={[styles.statusText, { color: `${fg}77` }]}>Loading lyrics…</Text>
      </View>
    );
  }
  if (!synced.length) {
    if (lyrics?.plain) {
      return (
        <ScrollView contentContainerStyle={styles.plainContainer} showsVerticalScrollIndicator={false}>
          <Text style={[styles.plainText, { color: fg }]}>{lyrics.plain}</Text>
        </ScrollView>
      );
    }
    return (
      <View style={styles.center}>
        <Text style={[styles.statusText, { color: `${fg}44` }]}>No synced lyrics</Text>
      </View>
    );
  }

  const renderLine = (line: LyricsLine, i: number) => {
    const dist = i - activeLine;
    const isActive = dist === 0;
    const isPast = dist < 0;
    const absD = Math.abs(dist);

    switch (mode) {

      /* ── iOS (default) ─────────────────────────────────────── */
      case "ios": {
        const opacity = isActive ? 1 : absD === 1 ? 0.6 : absD === 2 ? 0.35 : 0.18;
        const fs = isActive ? 28 : absD === 1 ? 20 : absD === 2 ? 17 : 15;
        const fw: any = isActive ? "900" : absD <= 1 ? "600" : "400";
        return (
          <Pressable key={i} onPress={() => onSeek?.(line.time)}
            onLayout={(e) => { lineYs.current[i] = e.nativeEvent.layout.y; }}
            style={styles.lineWrap}>
            <Text style={[styles.lineBase, { opacity, fontSize: fs, fontWeight: fw, color: isActive ? accent : fg,
              transform: [{ scale: isActive ? 1.04 : 1 }], lineHeight: isActive ? 38 : 26 }]}>
              {line.text || "·"}
            </Text>
          </Pressable>
        );
      }

      /* ── Karaoke ──────────────────────────────────────────── */
      case "karaoke": {
        const opacity = isActive ? 1 : absD === 1 ? 0.5 : 0.18;
        return (
          <Pressable key={i} onPress={() => onSeek?.(line.time)}
            onLayout={(e) => { lineYs.current[i] = e.nativeEvent.layout.y; }}
            style={[styles.lineWrap, isActive && { backgroundColor: `${accent}20`, borderRadius: 14, marginHorizontal: 12 }]}>
            <Text style={[styles.lineBase, { opacity, fontSize: isActive ? 26 : 17, fontWeight: isActive ? "900" : "500",
              color: isActive ? accent : fg, lineHeight: isActive ? 36 : 26 }]}>
              {line.text || "·"}
            </Text>
          </Pressable>
        );
      }

      /* ── Word-by-word ─────────────────────────────────────── */
      case "word": {
        const words = (line.text || "").split(" ");
        const opacity = isActive ? 1 : absD === 1 ? 0.5 : 0.18;
        return (
          <Pressable key={i} onPress={() => onSeek?.(line.time)}
            onLayout={(e) => { lineYs.current[i] = e.nativeEvent.layout.y; }}
            style={styles.lineWrap}>
            <View style={styles.wordRow}>
              {words.map((word, wi) => {
                const wa = isActive && wi === activeWord;
                const wp = isActive && wi < activeWord;
                return (
                  <Text key={wi} style={[styles.lineBase, {
                    color: wa ? accent : wp ? `${accent}bb` : fg,
                    opacity: isActive ? (wa ? 1 : wp ? 0.85 : 0.3) : opacity,
                    fontSize: isActive ? 22 : 15, fontWeight: wa ? "900" : isActive ? "600" : "400",
                    transform: [{ scale: wa ? 1.1 : 1 }], marginHorizontal: 2,
                  }]}>
                    {word}
                  </Text>
                );
              })}
            </View>
          </Pressable>
        );
      }

      /* ── Character-by-character ───────────────────────────── */
      case "char": {
        const chars = [...(line.text || "")];
        const opacity = isActive ? 1 : absD === 1 ? 0.45 : 0.15;
        return (
          <Pressable key={i} onPress={() => onSeek?.(line.time)}
            onLayout={(e) => { lineYs.current[i] = e.nativeEvent.layout.y; }}
            style={styles.lineWrap}>
            <View style={styles.wordRow}>
              {chars.map((ch, ci) => {
                const ca = isActive && ci === activeChar;
                const cp = isActive && ci < activeChar;
                return (
                  <Text key={ci} style={[styles.lineBase, {
                    color: ca ? accent : cp ? `${accent}cc` : fg,
                    opacity: isActive ? (ca ? 1 : cp ? 0.9 : 0.25) : opacity,
                    fontSize: isActive ? 22 : 14, fontWeight: ca ? "900" : "500",
                    transform: [{ scale: ca ? 1.18 : 1 }],
                  }]}>
                    {ch}
                  </Text>
                );
              })}
            </View>
          </Pressable>
        );
      }

      /* ── Wave ─────────────────────────────────────────────── */
      case "wave": {
        const opacity = isActive ? 1 : absD <= 1 ? 0.55 : absD <= 2 ? 0.3 : 0.12;
        const phase = i * 0.8;
        const translateY = waveAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [Math.sin(phase) * (isActive ? 4 : 6), Math.sin(phase + Math.PI) * (isActive ? 4 : 6)],
        });
        return (
          <Pressable key={i} onPress={() => onSeek?.(line.time)}
            onLayout={(e) => { lineYs.current[i] = e.nativeEvent.layout.y; }}
            style={styles.lineWrap}>
            <Animated.Text style={[styles.lineBase, {
              opacity, color: isActive ? accent : fg,
              fontSize: isActive ? 26 : 16, fontWeight: isActive ? "900" : "400",
              transform: [{ translateY }],
            }]}>
              {line.text || "·"}
            </Animated.Text>
          </Pressable>
        );
      }

      /* ── Neon Glow ────────────────────────────────────────── */
      case "neon": {
        const opacity = isActive ? 1 : absD === 1 ? 0.4 : 0.12;
        return (
          <Pressable key={i} onPress={() => onSeek?.(line.time)}
            onLayout={(e) => { lineYs.current[i] = e.nativeEvent.layout.y; }}
            style={styles.lineWrap}>
            <Text style={[styles.lineBase, {
              opacity,
              color: isActive ? accent : `${fg}66`,
              fontSize: isActive ? 26 : 16,
              fontWeight: isActive ? "900" : "400",
              textShadowColor: isActive ? accent : "transparent",
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: isActive ? 16 : 0,
            } as any]}>
              {line.text || "·"}
            </Text>
          </Pressable>
        );
      }

      /* ── Cinematic ────────────────────────────────────────── */
      case "cinematic": {
        const opacity = isActive ? 1 : absD === 1 ? 0.08 : 0.03;
        return (
          <Pressable key={i} onPress={() => onSeek?.(line.time)}
            onLayout={(e) => { lineYs.current[i] = e.nativeEvent.layout.y; }}
            style={[styles.lineWrap, isActive && styles.cinematicActive]}>
            {isActive && <View style={[styles.spotlight, { backgroundColor: `${accent}15` }]} />}
            <Text style={[styles.lineBase, {
              opacity, color: isActive ? "#fff" : fg,
              fontSize: isActive ? 28 : 16, fontWeight: isActive ? "900" : "400",
              letterSpacing: isActive ? 0.5 : 0, lineHeight: isActive ? 40 : 26,
            }]}>
              {line.text || "·"}
            </Text>
          </Pressable>
        );
      }

      /* ── Floating ─────────────────────────────────────────── */
      case "floating": {
        const opacity = isActive ? 1 : absD <= 1 ? 0.55 : absD <= 2 ? 0.28 : 0.1;
        const tx = isActive ? 0 : dist * -7;
        const ty = isActive ? 0 : dist * 2;
        return (
          <Pressable key={i} onPress={() => onSeek?.(line.time)}
            onLayout={(e) => { lineYs.current[i] = e.nativeEvent.layout.y; }}
            style={styles.lineWrap}>
            <Text style={[styles.lineBase, {
              opacity, color: isActive ? accent : fg,
              fontSize: isActive ? 26 : 16, fontWeight: isActive ? "900" : "400",
              transform: [{ translateX: tx }, { translateY: ty }, { scale: isActive ? 1.05 : 1 }],
            }]}>
              {line.text || "·"}
            </Text>
          </Pressable>
        );
      }

      default: return null;
    }
  };

  return (
    <View
      style={[styles.container, mode === "cinematic" && styles.cinematicBg]}
      onLayout={(e: LayoutChangeEvent) => setContainerH(e.nativeEvent.layout.height)}
    >
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onScrollBeginDrag={onScrollBeginDrag}
        onMomentumScrollEnd={onScrollEnd}
        onScrollEndDrag={onScrollEnd}
        decelerationRate={0.994}
      >
        {synced.map((line, i) => renderLine(line, i))}
      </ScrollView>

      <LinearGradient
        colors={["rgba(0,0,0,1)", "rgba(0,0,0,0)"]}
        style={styles.topMask}
        pointerEvents="none"
      />
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
        style={styles.bottomMask}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, overflow: "hidden" },
  cinematicBg: { backgroundColor: "#000" },
  listContent: { paddingVertical: 220, paddingHorizontal: 24 },
  lineWrap: { paddingVertical: 12, alignItems: "center", position: "relative" },
  lineBase: { textAlign: "center" },
  wordRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 3 },
  cinematicActive: { paddingVertical: 22 },
  spotlight: { ...StyleSheet.absoluteFillObject, borderRadius: 20, marginHorizontal: -24 },
  topMask: { position: "absolute", top: 0, left: 0, right: 0, height: 120, pointerEvents: "none" as any },
  bottomMask: { position: "absolute", bottom: 0, left: 0, right: 0, height: 120, pointerEvents: "none" as any },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  statusText: { fontSize: 16, fontWeight: "600" },
  plainContainer: { padding: 28 },
  plainText: { fontSize: 18, lineHeight: 32, fontWeight: "500" },
});
