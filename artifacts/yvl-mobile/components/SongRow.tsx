import { Feather } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Alert, Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { usePlayer } from "@/contexts/PlayerContext";
import { useTheme } from "@/contexts/ThemeContext";
import { decodeHtml, toTrack, type SaavnSong } from "@/lib/saavn";
import { formatTime } from "@/lib/utils";
import { downloadSong } from "@/lib/download";
import { Equalizer } from "./Equalizer";

type Props = { song: SaavnSong; queue: SaavnSong[] };

export function SongRow({ song, queue }: Props) {
  const { play, current, isPlaying, toggle, quality } = usePlayer();
  const { accent, colors } = useTheme();
  const isCurrent = current?.id === song.id;
  const playing = isCurrent && isPlaying;
  const [downloading, setDownloading] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  function handlePress() {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 200, friction: 10, useNativeDriver: true }),
    ]).start();
    if (isCurrent) { void toggle(); return; }
    const tracks = (queue.length ? queue : [song]).map((s) => toTrack(s, quality));
    const idx = Math.max(0, (queue.length ? queue : [song]).findIndex((s) => s.id === song.id));
    void play(tracks, idx);
  }

  async function handleDownload() {
    const track = toTrack(song, quality);
    if (!track.stream) { Alert.alert("Error", "No download URL available"); return; }
    setDownloading(true);
    try {
      const ok = await downloadSong(track.stream, song.name, song.artists?.primary?.[0]?.name ?? "Unknown");
      if (ok) Alert.alert("Downloaded", `"${decodeHtml(song.name)}" saved to your device.`);
      else Alert.alert("Failed", "Could not download this song.");
    } finally {
      setDownloading(false);
    }
  }

  const cover = toTrack(song, quality).cover;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={handlePress}
        style={[styles.row, isCurrent && { backgroundColor: `${accent}15` }]}
      >
        <View style={[styles.cover, { backgroundColor: colors.muted }]}>
          {cover && <Image source={{ uri: cover }} style={styles.coverImg} />}
          {playing && (
            <View style={styles.playingOverlay}>
              <Equalizer color={accent} size={14} />
            </View>
          )}
        </View>

        <View style={styles.info}>
          <Text style={[styles.title, { color: isCurrent ? accent : colors.foreground }]} numberOfLines={1}>
            {decodeHtml(song.name)}
          </Text>
          <Text style={[styles.artist, { color: colors.mutedForeground }]} numberOfLines={1}>
            {song.artists?.primary?.map((a) => decodeHtml(a.name)).join(", ") ?? "Unknown"}
          </Text>
        </View>

        <Text style={[styles.dur, { color: colors.mutedForeground }]}>{formatTime(song.duration ?? 0)}</Text>

        <Pressable
          onPress={handleDownload}
          hitSlop={10}
          style={styles.dlBtn}
          disabled={downloading}
        >
          <Feather
            name={downloading ? "loader" : "download"}
            size={15}
            color={downloading ? accent : colors.mutedForeground}
          />
        </Pressable>

        <Pressable onPress={handlePress} style={[styles.playBtn, { backgroundColor: accent }]} hitSlop={8}>
          {playing
            ? <Feather name="pause" size={14} color="#000" />
            : <Feather name="play" size={14} color="#000" style={{ marginLeft: 1 }} />
          }
        </Pressable>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 11, paddingVertical: 8, paddingHorizontal: 8, borderRadius: 18 },
  cover: { width: 50, height: 50, borderRadius: 13, overflow: "hidden" },
  coverImg: { width: "100%", height: "100%" },
  playingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.45)", alignItems: "center", justifyContent: "center" },
  info: { flex: 1, minWidth: 0 },
  title: { fontSize: 15, fontWeight: "700", marginBottom: 2, letterSpacing: -0.2 },
  artist: { fontSize: 12, fontWeight: "500" },
  dur: { fontSize: 11 },
  dlBtn: { width: 28, height: 28, alignItems: "center", justifyContent: "center" },
  playBtn: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center" },
});
