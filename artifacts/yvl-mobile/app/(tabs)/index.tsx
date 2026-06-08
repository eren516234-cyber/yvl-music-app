import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AlbumCard } from "@/components/AlbumCard";
import { SongRow } from "@/components/SongRow";
import { usePlayer } from "@/contexts/PlayerContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Saavn, toTrack, type SaavnAlbum, bestImage } from "@/lib/saavn";

const TABS = [
  { key: "for-you",  label: "For You",  query: "top hits 2026" },
  { key: "trending", label: "Trending",  query: "trending songs 2026" },
  { key: "rock",     label: "Rock",      query: "rock hits" },
  { key: "hiphop",   label: "Hip-Hop",   query: "hip hop hits" },
  { key: "kpop",     label: "K-Pop",     query: "k-pop hits" },
  { key: "pop",      label: "Pop",       query: "pop hits" },
  { key: "bolly",    label: "Bollywood", query: "bollywood hits 2026" },
  { key: "lofi",     label: "Lo-Fi",     query: "lofi chill" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function HomeScreen() {
  const { accent, colors, setRoute } = useTheme();
  const { play, quality } = usePlayer();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("for-you");
  const [expanded, setExpanded] = useState(false);
  const heroAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setRoute("home");
    Animated.timing(heroAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, [setRoute]);

  const active = TABS.find((t) => t.key === tab)!;

  const songsQ = useQuery({
    queryKey: ["home", "songs", active.query],
    queryFn: () => Saavn.searchSongs(active.query, 40).then((r) => r.results),
    staleTime: 5 * 60_000,
  });
  const albumsQ = useQuery({
    queryKey: ["home", "albums", active.query],
    queryFn: () => Saavn.searchAlbums(active.query, 20).then((r) => r.results),
    staleTime: 5 * 60_000,
  });

  const allSongs = songsQ.data ?? [];
  const albums = albumsQ.data ?? [];
  const displayed = expanded ? allSongs : allSongs.slice(0, 10);
  const heroAlbum = albums[0];
  const heroSongs = allSongs.slice(0, 3);

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 160 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header ── */}
      <Animated.View style={[styles.header, { opacity: heroAnim, transform: [{ translateY: heroAnim.interpolate({ inputRange: [0,1], outputRange: [-12,0] }) }] }]}>
        <View>
          <Text style={[styles.greeting, { color: colors.mutedForeground }]}>Good music</Text>
          <Text style={[styles.logo, { color: colors.foreground }]}>YVL</Text>
        </View>
        <View style={[styles.avatar, { backgroundColor: accent }]}>
          <Text style={styles.avatarText}>♪</Text>
        </View>
      </Animated.View>

      {/* ── Genre chips ── */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsRow}
        style={{ marginBottom: 28 }}
      >
        {TABS.map((t) => {
          const sel = t.key === tab;
          return (
            <Pressable
              key={t.key}
              onPress={() => { setTab(t.key); setExpanded(false); }}
              style={[styles.tabPill, {
                backgroundColor: sel ? colors.foreground : colors.muted,
                borderColor: sel ? colors.foreground : colors.border,
              }]}
            >
              <Text style={[styles.tabText, { color: sel ? colors.background : colors.mutedForeground }]}>
                {t.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* ── Hero banner ── */}
      {heroAlbum && (
        <Pressable
          onPress={() => router.push({ pathname: "/album/[id]", params: { id: heroAlbum.id } })}
          style={styles.hero}
        >
          <Image source={{ uri: bestImage(heroAlbum.image) }} style={styles.heroImg} blurRadius={2} />
          <LinearGradient colors={["transparent", "rgba(0,0,0,0.92)"]} style={styles.heroGradient} />
          <View style={styles.heroContent}>
            <Text style={styles.heroLabel}>Featured Album</Text>
            <Text style={styles.heroTitle} numberOfLines={2}>{heroAlbum.name}</Text>
            <Pressable
              onPress={() => void play(heroSongs.map((s) => toTrack(s, quality)), 0)}
              style={[styles.heroPlay, { backgroundColor: accent }]}
            >
              <Feather name="play" size={16} color="#000" style={{ marginLeft: 2 }} />
              <Text style={[styles.heroPlayText, { color: "#000" }]}>Play Now</Text>
            </Pressable>
          </View>
        </Pressable>
      )}

      {/* ── Quick picks ── */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Quick Picks</Text>
        {songsQ.isLoading && <ActivityIndicator color={accent} style={{ marginTop: 12 }} />}
        <View style={styles.songList}>
          {displayed.map((s) => <SongRow key={s.id} song={s} queue={allSongs} />)}
        </View>
        {allSongs.length > 10 && (
          <Pressable onPress={() => setExpanded((v) => !v)} style={styles.showMore}>
            <Text style={[styles.showMoreText, { color: accent }]}>
              {expanded ? "Show less" : `Show ${allSongs.length - 10} more`}
            </Text>
            <Feather name={expanded ? "chevron-up" : "chevron-down"} size={14} color={accent} />
          </Pressable>
        )}
      </View>

      {/* ── Albums grid ── */}
      {albums.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Albums</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 14 }}>
            {albums.map((a) => (
              <AlbumCard
                key={a.id} album={a} size={150}
                onPress={(al) => router.push({ pathname: "/album/[id]", params: { id: al.id } })}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  header: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: 24, marginBottom: 20 },
  greeting: { fontSize: 14, fontWeight: "600", letterSpacing: 0.5, textTransform: "uppercase" },
  logo: { fontSize: 64, fontWeight: "900", letterSpacing: -4, lineHeight: 68, marginTop: -4 },
  avatar: { width: 42, height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  avatarText: { fontSize: 18, color: "#000" },
  tabsRow: { paddingHorizontal: 24, gap: 8 },
  tabPill: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 24, borderWidth: 1 },
  tabText: { fontSize: 14, fontWeight: "700", letterSpacing: -0.2 },

  hero: { marginHorizontal: 24, borderRadius: 28, overflow: "hidden", height: 280, marginBottom: 36 },
  heroImg: { width: "100%", height: "100%", position: "absolute" },
  heroGradient: { position: "absolute", bottom: 0, left: 0, right: 0, height: 180 },
  heroContent: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 22 },
  heroLabel: { fontSize: 11, fontWeight: "700", letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 5 },
  heroTitle: { fontSize: 26, fontWeight: "900", color: "#fff", letterSpacing: -0.8, marginBottom: 14 },
  heroPlay: { flexDirection: "row", alignItems: "center", gap: 8, alignSelf: "flex-start", paddingHorizontal: 22, paddingVertical: 12, borderRadius: 24 },
  heroPlayText: { fontWeight: "800", fontSize: 15 },

  section: { marginBottom: 36, paddingHorizontal: 24 },
  sectionTitle: { fontSize: 24, fontWeight: "900", letterSpacing: -0.8, marginBottom: 16 },
  songList: { gap: 2 },
  showMore: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 14, paddingVertical: 12 },
  showMoreText: { fontSize: 15, fontWeight: "700" },
});
