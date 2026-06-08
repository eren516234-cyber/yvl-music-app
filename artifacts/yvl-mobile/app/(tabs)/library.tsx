import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { usePlayer } from "@/contexts/PlayerContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLikes } from "@/contexts/LikesContext";
import { usePlaylists, type Playlist } from "@/contexts/PlaylistContext";

export default function LibraryScreen() {
  const { accent, colors, setRoute } = useTheme();
  const { play } = usePlayer();
  const { liked } = useLikes();
  const { playlists, createPlaylist, deletePlaylist } = usePlaylists();
  const insets = useSafeAreaInsets();
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => { setRoute("library"); }, [setRoute]);

  function handleCreate() {
    if (!newName.trim()) return;
    createPlaylist(newName.trim());
    setNewName(""); setCreating(false);
  }

  function playPlaylist(pl: Playlist) {
    if (!pl.tracks.length) return;
    void play(pl.tracks, 0);
  }

  const likedCount = liked.size;

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: 160 }]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: colors.foreground }]}>Library</Text>

      {/* Liked songs */}
      <Text style={[styles.section, { color: accent }]}>Liked Songs</Text>
      <Pressable
        style={[styles.likedCard, { backgroundColor: `${accent}22`, borderColor: `${accent}44` }]}
        onPress={() => {}}
      >
        <View style={[styles.likedIcon, { backgroundColor: accent }]}>
          <Feather name="heart" size={24} color="#000" />
        </View>
        <View style={styles.likedInfo}>
          <Text style={[styles.likedTitle, { color: colors.foreground }]}>Liked Songs</Text>
          <Text style={[styles.likedCount, { color: colors.mutedForeground }]}>
            {likedCount > 0 ? `${likedCount} songs` : "None yet — tap ♥ on any song"}
          </Text>
        </View>
        <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
      </Pressable>

      {/* Playlists */}
      <View style={styles.sectionRow}>
        <Text style={[styles.section, { color: accent, marginBottom: 0 }]}>Playlists</Text>
        <Pressable onPress={() => setCreating(true)} style={[styles.addBtn, { borderColor: accent }]} hitSlop={8}>
          <Feather name="plus" size={16} color={accent} />
        </Pressable>
      </View>

      {creating && (
        <View style={[styles.createRow, { backgroundColor: colors.muted }]}>
          <TextInput
            value={newName} onChangeText={setNewName}
            placeholder="Playlist name…" placeholderTextColor={colors.mutedForeground}
            style={[styles.createInput, { color: colors.foreground }]}
            autoFocus returnKeyType="done" onSubmitEditing={handleCreate}
          />
          <Pressable onPress={handleCreate} style={[styles.createOk, { backgroundColor: accent }]}>
            <Text style={styles.createOkText}>Add</Text>
          </Pressable>
          <Pressable onPress={() => setCreating(false)} hitSlop={8}>
            <Feather name="x" size={18} color={colors.mutedForeground} />
          </Pressable>
        </View>
      )}

      {playlists.length === 0 && !creating ? (
        <View style={styles.empty}>
          <Feather name="list" size={32} color={colors.mutedForeground} />
          <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>No playlists yet</Text>
        </View>
      ) : (
        playlists.map((pl) => (
          <Pressable key={pl.id} style={[styles.playlistRow, { borderBottomColor: colors.border }]}
            onPress={() => playPlaylist(pl)}>
            <View style={[styles.plIcon, { backgroundColor: colors.muted }]}>
              {pl.tracks[0]?.cover ? (
                <Image source={{ uri: pl.tracks[0].cover }} style={styles.plCover} />
              ) : (
                <Feather name="music" size={18} color={colors.mutedForeground} />
              )}
            </View>
            <View style={styles.plInfo}>
              <Text style={[styles.plName, { color: colors.foreground }]} numberOfLines={1}>{pl.name}</Text>
              <Text style={[styles.plCount, { color: colors.mutedForeground }]}>{pl.tracks.length} songs</Text>
            </View>
            <Pressable onPress={() => playPlaylist(pl)} hitSlop={8} style={styles.plPlay}>
              <Feather name="play" size={16} color={accent} />
            </Pressable>
            <Pressable
              onPress={() => Alert.alert("Delete", `Delete "${pl.name}"?`, [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => deletePlaylist(pl.id) },
              ])}
              hitSlop={8}
            >
              <Feather name="trash-2" size={16} color={colors.mutedForeground} />
            </Pressable>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: 20 },
  title: { fontSize: 34, fontWeight: "800", letterSpacing: -1, marginBottom: 24 },
  section: { fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 },
  sectionRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 24, marginBottom: 12 },
  addBtn: { width: 32, height: 32, borderRadius: 16, borderWidth: 1.5, alignItems: "center", justifyContent: "center" },
  likedCard: { flexDirection: "row", alignItems: "center", gap: 14, padding: 14, borderRadius: 18, borderWidth: 1.5, marginBottom: 20 },
  likedIcon: { width: 52, height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  likedInfo: { flex: 1 },
  likedTitle: { fontSize: 16, fontWeight: "700" },
  likedCount: { fontSize: 12, marginTop: 2 },
  createRow: { flexDirection: "row", alignItems: "center", gap: 10, borderRadius: 14, padding: 12, marginBottom: 14 },
  createInput: { flex: 1, fontSize: 15, fontFamily: "Inter_400Regular" },
  createOk: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 10 },
  createOkText: { color: "#000", fontWeight: "700", fontSize: 13 },
  empty: { alignItems: "center", paddingVertical: 32, gap: 10 },
  emptyText: { fontSize: 15 },
  playlistRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 11, borderBottomWidth: 1 },
  plIcon: { width: 50, height: 50, borderRadius: 12, overflow: "hidden", alignItems: "center", justifyContent: "center" },
  plCover: { width: "100%", height: "100%" },
  plInfo: { flex: 1 },
  plName: { fontSize: 15, fontWeight: "600" },
  plCount: { fontSize: 12, marginTop: 2 },
  plPlay: { padding: 4 },
});
