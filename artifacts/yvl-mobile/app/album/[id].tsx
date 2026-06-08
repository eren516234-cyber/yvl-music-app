import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SongRow } from "@/components/SongRow";
import { usePlayer } from "@/contexts/PlayerContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Saavn, bestImage, decodeHtml, primaryArtist, toTrack } from "@/lib/saavn";

export default function AlbumScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { accent, colors, setRoute } = useTheme();
  const { play, quality } = usePlayer();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  useEffect(() => { setRoute("album"); }, [setRoute]);

  const { data: album, isLoading } = useQuery({
    queryKey: ["album", id],
    queryFn: () => Saavn.album(id),
    enabled: !!id, staleTime: 10 * 60_000,
  });

  const cover = bestImage(album?.image);
  const songs = album?.songs ?? [];

  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <View style={styles.backBar}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: `${colors.foreground}14` }]} hitSlop={10}>
          <Feather name="chevron-left" size={26} color={colors.foreground} />
        </Pressable>
      </View>

      {isLoading ? (
        <ActivityIndicator color={accent} style={{ flex: 1 }} />
      ) : (
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 160 }]} showsVerticalScrollIndicator={false}>
          {/* Album art with blur bg */}
          {cover && (
            <Image source={{ uri: cover }} style={styles.blurBg} blurRadius={25} />
          )}
          <View style={[styles.blurOverlay, { backgroundColor: `${colors.background}cc` }]} />

          <View style={styles.artWrap}>
            {cover ? (
              <Image source={{ uri: cover }} style={styles.art} />
            ) : (
              <View style={[styles.art, styles.artFallback, { backgroundColor: colors.muted }]}>
                <Feather name="disc" size={60} color={colors.mutedForeground} />
              </View>
            )}
          </View>

          <View style={styles.info}>
            <Text style={[styles.albumName, { color: colors.foreground }]}>{decodeHtml(album?.name ?? "")}</Text>
            <Text style={[styles.artistName, { color: colors.mutedForeground }]}>{decodeHtml(primaryArtist(album))}</Text>
            {album?.year && (
              <Text style={[styles.meta, { color: colors.mutedForeground }]}>{album.year} · {songs.length} songs</Text>
            )}
          </View>

          <View style={styles.actions}>
            <Pressable
              onPress={() => songs.length && play(songs.map((s) => toTrack(s, quality)), 0)}
              style={[styles.playAllBtn, { backgroundColor: accent }]}
            >
              <Feather name="play" size={20} color="#000" style={{ marginLeft: 3 }} />
              <Text style={styles.playAllText}>Play All</Text>
            </Pressable>
          </View>

          <View style={styles.songList}>
            {songs.map((s) => <SongRow key={s.id} song={s} queue={songs} />)}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  backBar: { paddingHorizontal: 16, paddingBottom: 8, zIndex: 2 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  content: { paddingHorizontal: 20 },
  blurBg: { position: "absolute", top: 0, left: 0, right: 0, height: 320, opacity: 0.5 },
  blurOverlay: { position: "absolute", top: 0, left: 0, right: 0, height: 320 },
  artWrap: { alignItems: "center", marginBottom: 18, marginTop: 8, zIndex: 1 },
  art: { width: 210, height: 210, borderRadius: 20 },
  artFallback: { alignItems: "center", justifyContent: "center" },
  info: { alignItems: "center", gap: 5, marginBottom: 20, zIndex: 1 },
  albumName: { fontSize: 22, fontWeight: "800", textAlign: "center", letterSpacing: -0.5 },
  artistName: { fontSize: 15 },
  meta: { fontSize: 12 },
  actions: { flexDirection: "row", justifyContent: "center", marginBottom: 24, zIndex: 1 },
  playAllBtn: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 34, paddingVertical: 15, borderRadius: 30 },
  playAllText: { color: "#000", fontWeight: "800", fontSize: 16 },
  songList: { gap: 4, zIndex: 1 },
});
