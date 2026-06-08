import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AlbumCard } from "@/components/AlbumCard";
import { SongRow } from "@/components/SongRow";
import { useTheme } from "@/contexts/ThemeContext";
import { Saavn } from "@/lib/saavn";

const GENRES = ["Pop", "Hip-Hop", "Rock", "R&B", "K-Pop", "Electronic", "Jazz", "Lo-Fi",
  "Bollywood", "Latin", "Classical", "Indie"] as const;
const RECENT_KEY = "yvl.recent.searches";
const GENRE_COLORS = ["#ffd23f","#22d3ee","#4ade80","#ec4899","#f97316","#3b82f6","#ff6f61","#a855f7",
  "#ef4444","#10b981","#8b5cf6","#f59e0b"];

export default function SearchScreen() {
  const { accent, colors, setRoute } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);

  const [q, setQ] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setRoute("search");
    AsyncStorage.getItem(RECENT_KEY).then((r) => {
      if (r) try { setRecent(JSON.parse(r)); } catch {}
    });
  }, [setRoute]);

  function saveRecent(term: string) {
    const next = [term, ...recent.filter((r) => r.toLowerCase() !== term.toLowerCase())].slice(0, 8);
    setRecent(next);
    AsyncStorage.setItem(RECENT_KEY, JSON.stringify(next));
  }

  function submit(term: string) {
    const t = term.trim();
    if (!t) return;
    setQ(t);
    setSubmitted(t);
    saveRecent(t);
    inputRef.current?.blur();
  }

  const songsQ = useQuery({
    queryKey: ["search", "songs", submitted],
    queryFn: () => Saavn.searchSongs(submitted, 20).then((r) => r.results),
    enabled: !!submitted, staleTime: 2 * 60_000,
  });
  const albumsQ = useQuery({
    queryKey: ["search", "albums", submitted],
    queryFn: () => Saavn.searchAlbums(submitted, 12).then((r) => r.results),
    enabled: !!submitted, staleTime: 2 * 60_000,
  });

  const allSongs = songsQ.data ?? [];
  const allAlbums = albumsQ.data ?? [];
  const loading = songsQ.isLoading || albumsQ.isLoading;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Search bar */}
      <View style={[styles.barWrap, { paddingTop: insets.top + 12, borderBottomColor: colors.border }]}>
        <View style={[styles.inputRow, {
          backgroundColor: colors.muted,
          borderColor: q ? accent : colors.border,
        }]}>
          <Feather name="search" size={18} color={colors.mutedForeground} />
          <TextInput
            ref={inputRef}
            value={q}
            onChangeText={setQ}
            onSubmitEditing={() => submit(q)}
            placeholder="Songs, artists, albums…"
            placeholderTextColor={colors.mutedForeground}
            style={[styles.input, { color: colors.foreground }]}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {q.length > 0 && (
            <Pressable onPress={() => { setQ(""); setSubmitted(""); }} hitSlop={8}>
              <Feather name="x" size={16} color={colors.mutedForeground} />
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: 160 }]}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      >
        {!submitted ? (
          <>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Browse</Text>
            <View style={styles.genreGrid}>
              {GENRES.map((g, i) => (
                <Pressable key={g} onPress={() => submit(g)}
                  style={[styles.genreChip, { backgroundColor: GENRE_COLORS[i % GENRE_COLORS.length] }]}>
                  <Text style={styles.genreText}>{g}</Text>
                </Pressable>
              ))}
            </View>

            {recent.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 28 }]}>Recent</Text>
                {recent.map((r) => (
                  <Pressable key={r} onPress={() => submit(r)} style={[styles.recentRow, { borderBottomColor: colors.border }]}>
                    <Feather name="clock" size={15} color={colors.mutedForeground} />
                    <Text style={[styles.recentText, { color: colors.foreground }]}>{r}</Text>
                  </Pressable>
                ))}
              </>
            )}
          </>
        ) : loading ? (
          <ActivityIndicator color={accent} style={styles.loader} />
        ) : (
          <>
            {allSongs.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Songs</Text>
                <View style={styles.songList}>
                  {allSongs.slice(0, 12).map((s) => <SongRow key={s.id} song={s} queue={allSongs} />)}
                </View>
              </>
            )}
            {allAlbums.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 24 }]}>Albums</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.albumsRow}>
                  {allAlbums.map((a) => (
                    <AlbumCard key={a.id} album={a} size={140}
                      onPress={(al) => router.push({ pathname: "/album/[id]", params: { id: al.id } })} />
                  ))}
                </ScrollView>
              </>
            )}
            {!allSongs.length && !allAlbums.length && (
              <View style={styles.empty}>
                <Feather name="search" size={40} color={colors.mutedForeground} />
                <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>No results for "{submitted}"</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  barWrap: { paddingHorizontal: 20, paddingBottom: 14, borderBottomWidth: 1 },
  inputRow: { flexDirection: "row", alignItems: "center", borderRadius: 14, borderWidth: 1.5, paddingHorizontal: 14, paddingVertical: 12, gap: 10 },
  input: { flex: 1, fontSize: 16, fontFamily: "Inter_400Regular" },
  content: { paddingHorizontal: 20, paddingTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "800", marginBottom: 14, letterSpacing: -0.4 },
  genreGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  genreChip: { borderRadius: 14, paddingHorizontal: 18, paddingVertical: 14, flex: 1, minWidth: "44%" },
  genreText: { color: "#000", fontSize: 14, fontWeight: "800" },
  recentRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 13, borderBottomWidth: 1 },
  recentText: { fontSize: 15 },
  loader: { marginTop: 48 },
  songList: { gap: 4 },
  albumsRow: { gap: 14 },
  empty: { alignItems: "center", paddingTop: 64, gap: 12 },
  emptyText: { fontSize: 16 },
});
