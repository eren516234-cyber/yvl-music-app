import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AlbumCard } from "@/components/AlbumCard";
import { SongRow } from "@/components/SongRow";
import { usePlayer } from "@/contexts/PlayerContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Saavn, bestImage, toTrack } from "@/lib/saavn";

export default function ArtistScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { accent, colors, setRoute } = useTheme();
  const { play, quality } = usePlayer();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  useEffect(() => { setRoute("artist"); }, [setRoute]);

  const { data: artist, isLoading } = useQuery({
    queryKey: ["artist", id],
    queryFn: () => Saavn.artist(id),
    enabled: !!id, staleTime: 10 * 60_000,
  });

  const cover = bestImage(artist?.image);
  const topSongs = artist?.topSongs ?? [];
  const topAlbums = artist?.topAlbums ?? [];

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
          {cover && <Image source={{ uri: cover }} style={styles.blurBg} blurRadius={30} />}
          <View style={[styles.blurOverlay, { backgroundColor: `${colors.background}c8` }]} />

          <View style={styles.artWrap}>
            {cover ? (
              <Image source={{ uri: cover }} style={styles.art} />
            ) : (
              <View style={[styles.art, styles.artFallback, { backgroundColor: colors.muted }]}>
                <Feather name="user" size={60} color={colors.mutedForeground} />
              </View>
            )}
          </View>

          <View style={styles.info}>
            <Text style={[styles.artistName, { color: colors.foreground }]}>{artist?.name}</Text>
            {(artist?.followerCount ?? 0) > 0 && (
              <Text style={[styles.followers, { color: colors.mutedForeground }]}>
                {((artist!.followerCount ?? 0) / 1_000_000).toFixed(1)}M followers
              </Text>
            )}
          </View>

          {topSongs.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionRow}>
                <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Popular</Text>
                <Pressable onPress={() => play(topSongs.map((s) => toTrack(s, quality)), 0)}
                  style={[styles.playBtn, { backgroundColor: accent }]}>
                  <Feather name="play" size={14} color="#000" style={{ marginLeft: 1 }} />
                  <Text style={styles.playBtnText}>Play</Text>
                </Pressable>
              </View>
              <View style={styles.songList}>
                {topSongs.slice(0, 8).map((s) => <SongRow key={s.id} song={s} queue={topSongs} />)}
              </View>
            </View>
          )}

          {topAlbums.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Albums</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.albumsRow}>
                {topAlbums.map((a) => (
                  <AlbumCard key={a.id} album={a} size={130}
                    onPress={(al) => router.push({ pathname: "/album/[id]", params: { id: al.id } })} />
                ))}
              </ScrollView>
            </View>
          )}
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
  blurBg: { position: "absolute", top: 0, left: 0, right: 0, height: 340, opacity: 0.45 },
  blurOverlay: { position: "absolute", top: 0, left: 0, right: 0, height: 340 },
  artWrap: { alignItems: "center", marginBottom: 16, marginTop: 8, zIndex: 1 },
  art: { width: 180, height: 180, borderRadius: 90 },
  artFallback: { alignItems: "center", justifyContent: "center" },
  info: { alignItems: "center", gap: 5, marginBottom: 24, zIndex: 1 },
  artistName: { fontSize: 28, fontWeight: "800", letterSpacing: -0.8 },
  followers: { fontSize: 13 },
  section: { marginBottom: 28, zIndex: 1 },
  sectionRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "800", letterSpacing: -0.4 },
  playBtn: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 },
  playBtnText: { color: "#000", fontWeight: "700", fontSize: 13 },
  songList: { gap: 4 },
  albumsRow: { gap: 14 },
});
