import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { usePlayer } from "@/contexts/PlayerContext";
import { useTheme } from "@/contexts/ThemeContext";

export function MiniPlayer() {
  const { current, isPlaying, toggle, next, expand, position, duration } = usePlayer();
  const { accent, colors } = useTheme();
  const slideIn = useRef(new Animated.Value(80)).current;
  const prevId = useRef<string | null>(null);

  useEffect(() => {
    if (current && current.id !== prevId.current) {
      prevId.current = current.id;
      slideIn.setValue(80);
      Animated.spring(slideIn, {
        toValue: 0, tension: 80, friction: 12, useNativeDriver: true,
      }).start();
    }
  }, [current?.id]);

  if (!current) return null;

  const pct = duration ? Math.min(1, position / duration) : 0;

  return (
    <Animated.View
      style={[styles.container, {
        backgroundColor: colors.card,
        borderColor: colors.border,
        transform: [{ translateY: slideIn }],
      }]}
    >
      <Pressable onPress={() => expand(true)} style={styles.main}>
        <View style={styles.coverWrap}>
          {current.cover ? (
            <Image source={{ uri: current.cover }} style={styles.cover} />
          ) : (
            <View style={[styles.cover, { backgroundColor: colors.muted }]} />
          )}
        </View>

        <View style={styles.info}>
          <Text style={[styles.title, { color: colors.foreground }]} numberOfLines={1}>
            {current.title}
          </Text>
          <Text style={[styles.artist, { color: colors.mutedForeground }]} numberOfLines={1}>
            {current.artist}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={(e) => { e.stopPropagation(); void toggle(); }}
        style={[styles.btn, { backgroundColor: accent }]}
        hitSlop={8}
      >
        <Feather name={isPlaying ? "pause" : "play"} size={16} color="#000"
          style={{ marginLeft: isPlaying ? 0 : 1 }} />
      </Pressable>

      <Pressable
        onPress={(e) => { e.stopPropagation(); void next(); }}
        style={styles.btnGhost}
        hitSlop={8}
      >
        <Feather name="skip-forward" size={18} color={colors.foreground} />
      </Pressable>

      {/* Progress */}
      <View style={[styles.progress, { backgroundColor: colors.muted }]}>
        <View style={[styles.progressFill, { width: `${pct * 100}%` as any, backgroundColor: accent }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 28,
    padding: 8,
    paddingRight: 14,
    borderWidth: 1,
    overflow: "hidden",
    elevation: 8,
  },
  main: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  coverWrap: { width: 44, height: 44, borderRadius: 22, overflow: "hidden" },
  cover: { width: 44, height: 44 },
  info: { flex: 1, minWidth: 0 },
  title: { fontSize: 13, fontWeight: "700" },
  artist: { fontSize: 11, marginTop: 2 },
  btn: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center" },
  btnGhost: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  progress: { position: "absolute", bottom: 0, left: 0, right: 0, height: 2 },
  progressFill: { height: "100%", borderRadius: 1 },
});
