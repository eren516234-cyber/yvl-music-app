import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { usePlayer } from "@/contexts/PlayerContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Saavn, bestImage, decodeHtml, primaryArtist, toTrack, type SaavnAlbum } from "@/lib/saavn";

type Props = { album: SaavnAlbum; onPress?: (a: SaavnAlbum) => void; size?: number };

export function AlbumCard({ album, onPress, size = 140 }: Props) {
  const { play, quality } = usePlayer();
  const { accent, colors } = useTheme();
  const cover = bestImage(album.image);

  async function quickPlay() {
    let songs = album.songs;
    if (!songs?.length) {
      try { const full = await Saavn.album(album.id); songs = full.songs ?? []; } catch { return; }
    }
    if (songs?.length) void play(songs.map((s) => toTrack(s, quality)), 0);
  }

  return (
    <Pressable onPress={() => onPress?.(album)} style={({ pressed }) => [styles.card, { width: size }, pressed && { opacity: 0.8 }]}>
      <View style={[styles.imgWrap, { width: size, height: size, backgroundColor: colors.muted }]}>
        {cover ? (
          <Image source={{ uri: cover }} style={styles.img} />
        ) : (
          <View style={styles.fallback}>
            <Text style={{ color: colors.mutedForeground, fontSize: size * 0.3, fontWeight: "700" }}>
              {album.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <Pressable onPress={quickPlay} style={[styles.playBtn, { backgroundColor: accent }]} hitSlop={4}>
          <Feather name="play" size={13} color="#000" style={{ marginLeft: 1 }} />
        </Pressable>
      </View>
      <Text style={[styles.name, { color: colors.foreground }]} numberOfLines={2}>{decodeHtml(album.name)}</Text>
      <Text style={[styles.artist, { color: colors.mutedForeground }]} numberOfLines={1}>{decodeHtml(primaryArtist(album))}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { gap: 6 },
  imgWrap: { borderRadius: 16, overflow: "hidden" },
  img: { width: "100%", height: "100%" },
  fallback: { flex: 1, alignItems: "center", justifyContent: "center" },
  playBtn: { position: "absolute", bottom: 8, right: 8, width: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  name: { fontSize: 13, fontWeight: "700", lineHeight: 18 },
  artist: { fontSize: 11 },
});
