import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert, Animated, Dimensions, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { usePlayer } from "@/contexts/PlayerContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLikes } from "@/contexts/LikesContext";
import { fetchLyrics, type Lyrics } from "@/lib/lrclib";
import { downloadSong } from "@/lib/download";
import { formatTime } from "@/lib/utils";
import { LyricsView, LYRICS_MODES, type LyricsMode } from "./LyricsView";

const { width: W } = Dimensions.get("window");
const MODE_KEY = "yvl.lyricsmode.v2";

export function FullPlayer() {
  const { current, expanded, expand, isPlaying, toggle, next, prev, position, duration, seek } = usePlayer();
  const { accent, colors, setRoute } = useTheme();
  const { isLiked, toggleLike } = useLikes();
  const insets = useSafeAreaInsets();

  const [showLyrics, setShowLyrics] = useState(false);
  const [lyrics, setLyrics] = useState<Lyrics>(null);
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const [lyricsMode, setLyricsMode] = useState<LyricsMode>("ios");
  const [downloading, setDownloading] = useState(false);

  const slideAnim = useRef(new Animated.Value(800)).current;
  const scaleAnim = useRef(new Animated.Value(0.94)).current;
  const coverScale = useRef(new Animated.Value(1)).current;
  const coverRotate = useRef(new Animated.Value(0)).current;

  const liked = current ? isLiked(current.id) : false;

  useEffect(() => {
    AsyncStorage.getItem(MODE_KEY).then((v) => { if (v) setLyricsMode(v as LyricsMode); });
  }, []);

  useEffect(() => { if (expanded) setRoute("player"); }, [expanded, setRoute]);

  useEffect(() => {
    if (expanded) {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, tension: 90, friction: 13, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, tension: 90, friction: 13, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 800, duration: 240, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 0.94, duration: 240, useNativeDriver: true }),
      ]).start();
    }
  }, [expanded]);

  // Cover pulse on song change
  useEffect(() => {
    Animated.sequence([
      Animated.timing(coverScale, { toValue: 0.88, duration: 160, useNativeDriver: true }),
      Animated.spring(coverScale, { toValue: 1, tension: 100, friction: 9, useNativeDriver: true }),
    ]).start();
  }, [current?.id]);

  // Cover rotation when playing
  useEffect(() => {
    if (isPlaying) {
      const loop = Animated.loop(
        Animated.timing(coverRotate, { toValue: 1, duration: 30000, useNativeDriver: true })
      );
      loop.start();
      return () => loop.stop();
    }
  }, [isPlaying]);

  const rotation = coverRotate.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  useEffect(() => {
    if (!current) return;
    setLyrics(null);
    setLyricsLoading(true);
    fetchLyrics(current.title, current.artist, current.duration)
      .then(setLyrics)
      .catch(() => setLyrics(null))
      .finally(() => setLyricsLoading(false));
  }, [current?.id]);

  async function handleDownload() {
    if (!current?.stream) { Alert.alert("Error", "No URL available"); return; }
    setDownloading(true);
    try {
      const ok = await downloadSong(current.stream, current.title, current.artist);
      if (ok) Alert.alert("Downloaded", `"${current.title}" saved to your device.`);
    } finally {
      setDownloading(false);
    }
  }

  if (!current) return null;

  const pct = duration ? Math.min(1, position / duration) : 0;
  const progressW = W - 48;

  return (
    <Modal
      visible={expanded}
      animationType="none"
      presentationStyle="overFullScreen"
      onRequestClose={() => expand(false)}
      statusBarTranslucent
    >
      <Animated.View style={[styles.root, { transform: [{ translateY: slideAnim }, { scale: scaleAnim }] }]}>
        {/* Blurred background */}
        {current.cover && (
          <Image source={{ uri: current.cover }} style={styles.bgImg} blurRadius={40} />
        )}
        <View style={styles.overlay} />

        <View style={[styles.content, { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 16 }]}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={() => expand(false)} style={styles.iconBtn} hitSlop={12}>
              <Feather name="chevron-down" size={24} color="#fff" />
            </Pressable>
            <View style={styles.headerCenter}>
              <Text style={styles.nowLabel}>NOW PLAYING</Text>
              <Text style={[styles.appName, { color: accent }]}>YVL</Text>
            </View>
            <Pressable
              onPress={() => setShowLyrics((v) => !v)}
              style={[styles.iconBtn, showLyrics && { backgroundColor: accent }]}
              hitSlop={12}
            >
              <Feather name="mic" size={18} color={showLyrics ? "#000" : "#fff"} />
            </Pressable>
          </View>

          {showLyrics ? (
            <View style={styles.lyricsPanel}>
              {/* Mode chips */}
              <ScrollView
                horizontal showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.modeRow}
                style={{ maxHeight: 46 }}
              >
                {LYRICS_MODES.map((m) => (
                  <Pressable
                    key={m.key}
                    onPress={() => { setLyricsMode(m.key); AsyncStorage.setItem(MODE_KEY, m.key); }}
                    style={[styles.modeChip, lyricsMode === m.key && { backgroundColor: accent }]}
                  >
                    <Text style={styles.modeIcon}>{m.icon}</Text>
                    <Text style={[styles.modeLabel, lyricsMode === m.key && { color: "#000" }]}>{m.label}</Text>
                  </Pressable>
                ))}
              </ScrollView>

              <LyricsView
                lyrics={lyrics}
                position={position}
                duration={duration}
                loading={lyricsLoading}
                accent={accent}
                fg="#fff"
                bg="#000"
                mode={lyricsMode}
                onSeek={seek}
              />
            </View>
          ) : (
            /* Cover art — rotates when playing */
            <View style={styles.coverContainer}>
              <Animated.View style={[styles.coverWrap, { transform: [{ scale: coverScale }] }]}>
                <Animated.View style={[styles.coverInner, { transform: [{ rotate: rotation }] }]}>
                  {current.cover ? (
                    <Image source={{ uri: current.cover }} style={styles.cover} />
                  ) : (
                    <View style={[styles.cover, styles.coverFallback]}>
                      <Text style={styles.coverFallbackTxt}>{current.title.charAt(0).toUpperCase()}</Text>
                    </View>
                  )}
                </Animated.View>
                {/* Vinyl center dot */}
                <View style={[styles.vinylDot, { backgroundColor: accent }]} />
              </Animated.View>
            </View>
          )}

          {/* Track info */}
          <View style={styles.trackInfo}>
            <View style={styles.trackText}>
              <Text style={styles.trackTitle} numberOfLines={1}>{current.title}</Text>
              <Text style={styles.trackArtist} numberOfLines={1}>{current.artist}</Text>
            </View>
            <View style={styles.trackActions}>
              <Pressable onPress={handleDownload} hitSlop={10} style={styles.actionBtn} disabled={downloading}>
                <Feather name={downloading ? "loader" : "download"} size={20} color={downloading ? accent : "rgba(255,255,255,0.5)"} />
              </Pressable>
              <Pressable onPress={() => current && toggleLike(current.id)} hitSlop={10} style={styles.actionBtn}>
                <Feather name="heart" size={22} color={liked ? accent : "rgba(255,255,255,0.35)"} />
              </Pressable>
            </View>
          </View>

          {/* Progress */}
          <View style={styles.progressSection}>
            <Pressable
              style={[styles.progressTrack, { width: progressW }]}
              onPress={(e) => void seek(Math.max(0, Math.min((e.nativeEvent.locationX / progressW) * duration, duration)))}
            >
              <View style={[styles.progressFill, { width: `${pct * 100}%` as any, backgroundColor: accent }]} />
              <View style={[styles.progressThumb, { left: `${pct * 100}%` as any, backgroundColor: accent }]} />
            </Pressable>
            <View style={styles.progressTimes}>
              <Text style={styles.timeText}>{formatTime(position)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <Pressable onPress={() => void prev()} hitSlop={14} style={styles.ctrlBtn}>
              <Feather name="skip-back" size={30} color="#fff" />
            </Pressable>
            <Pressable
              onPress={() => void toggle()}
              style={[styles.playBtn, { backgroundColor: accent }]}
            >
              <Feather
                name={isPlaying ? "pause" : "play"}
                size={32}
                color="#000"
                style={{ marginLeft: isPlaying ? 0 : 3 }}
              />
            </Pressable>
            <Pressable onPress={() => void next()} hitSlop={14} style={styles.ctrlBtn}>
              <Feather name="skip-forward" size={30} color="#fff" />
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  bgImg: { ...StyleSheet.absoluteFillObject, opacity: 0.55 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.58)" },
  content: { flex: 1, paddingHorizontal: 24 },

  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  headerCenter: { alignItems: "center" },
  nowLabel: { fontSize: 10, fontWeight: "800", letterSpacing: 2.5, color: "rgba(255,255,255,0.4)", marginBottom: 1 },
  appName: { fontSize: 15, fontWeight: "900", letterSpacing: -0.5 },
  iconBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: "rgba(255,255,255,0.12)", alignItems: "center", justifyContent: "center" },

  lyricsPanel: { flex: 1, marginHorizontal: -24 },
  modeRow: { paddingHorizontal: 20, gap: 8, alignItems: "center" },
  modeChip: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 13, paddingVertical: 7, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.10)" },
  modeIcon: { fontSize: 13 },
  modeLabel: { fontSize: 11, fontWeight: "700", color: "rgba(255,255,255,0.8)" },

  coverContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  coverWrap: { position: "relative", alignItems: "center", justifyContent: "center" },
  coverInner: { width: W - 80, height: W - 80, borderRadius: (W - 80) / 2, overflow: "hidden", elevation: 24 },
  cover: { width: "100%", height: "100%" },
  coverFallback: { backgroundColor: "#1a1a1a", alignItems: "center", justifyContent: "center" },
  coverFallbackTxt: { fontSize: 80, fontWeight: "900", color: "#fff" },
  vinylDot: { position: "absolute", width: 20, height: 20, borderRadius: 10, zIndex: 10 },

  trackInfo: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 16, marginBottom: 14 },
  trackText: { flex: 1, marginRight: 12 },
  trackTitle: { fontSize: 24, fontWeight: "900", color: "#fff", letterSpacing: -0.8, marginBottom: 3 },
  trackArtist: { fontSize: 15, color: "rgba(255,255,255,0.55)", fontWeight: "500" },
  trackActions: { flexDirection: "row", gap: 4 },
  actionBtn: { width: 38, height: 38, alignItems: "center", justifyContent: "center" },

  progressSection: { alignItems: "center", gap: 10, marginBottom: 22 },
  progressTrack: { height: 5, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 3, position: "relative" },
  progressFill: { height: "100%", borderRadius: 3 },
  progressThumb: { position: "absolute", top: -7, width: 18, height: 18, borderRadius: 9, marginLeft: -9 },
  progressTimes: { width: "100%", flexDirection: "row", justifyContent: "space-between" },
  timeText: { fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: "600" },

  controls: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 46 },
  ctrlBtn: { width: 52, height: 52, alignItems: "center", justifyContent: "center" },
  playBtn: { width: 78, height: 78, borderRadius: 39, alignItems: "center", justifyContent: "center", elevation: 10 },
});
