import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DownloadButton } from '@/components/DownloadButton';
import { PLAYLISTS, SONGS, useMusic } from '@/contexts/MusicContext';
import { useTheme } from '@/contexts/ThemeContext';

const TABS = ['Playlists', 'Downloads', 'Liked'];

export default function LibraryScreen() {
  const { accentColor } = useTheme();
  const { downloadedSongs, downloadProgress, downloadSong, downloadPlaylist, likedSongs, setCurrentSong, downloadingPlaylist } = useMusic();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(0);

  const downloadedList = SONGS.filter((s) => downloadedSongs.includes(s.id));
  const likedList = SONGS.filter((s) => likedSongs.includes(s.id));
  const downloadingAny = Object.keys(downloadProgress).length > 0;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: 180 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>My Library</Text>
          <TouchableOpacity style={[styles.addBtn, { backgroundColor: accentColor }]}>
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {TABS.map((t, i) => (
            <TouchableOpacity
              key={t}
              onPress={() => setActiveTab(i)}
              style={[styles.tab, activeTab === i && { backgroundColor: accentColor }]}
            >
              <Text style={[styles.tabText, activeTab === i && { color: '#000', fontWeight: '700' }]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Playlists */}
        {activeTab === 0 && (
          <>
            {PLAYLISTS.map((pl) => (
              <View key={pl.id} style={styles.playlistCard}>
                <View style={[styles.playlistArt, { backgroundColor: pl.color }]}>
                  <Ionicons name="musical-notes" size={28} color="#fff" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.playlistName}>{pl.name}</Text>
                  <Text style={styles.playlistCount}>{pl.count} songs</Text>
                </View>
                <TouchableOpacity
                  onPress={() => downloadPlaylist(pl.id)}
                  style={[
                    styles.dlBtn,
                    downloadingPlaylist === pl.id && { borderColor: accentColor },
                  ]}
                >
                  <Ionicons
                    name={downloadingPlaylist === pl.id ? 'arrow-down' : 'arrow-down-circle-outline'}
                    size={22}
                    color={downloadingPlaylist === pl.id ? accentColor : '#8E8E93'}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.playBtn}>
                  <Ionicons name="play-circle" size={40} color={accentColor} />
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        {/* Downloads */}
        {activeTab === 1 && (
          <>
            {downloadingAny && (
              <View style={[styles.infoBox, { borderColor: accentColor + '44' }]}>
                <Ionicons name="arrow-down-circle" size={18} color={accentColor} />
                <Text style={[styles.infoText, { color: accentColor }]}>
                  {Object.keys(downloadProgress).length} song{Object.keys(downloadProgress).length > 1 ? 's' : ''} downloading…
                </Text>
              </View>
            )}

            {/* In-progress downloads */}
            {Object.keys(downloadProgress).map((id) => {
              const song = SONGS.find((s) => s.id === id);
              if (!song) return null;
              const pct = Math.round(downloadProgress[id] ?? 0);
              return (
                <View key={id} style={styles.songRow}>
                  <View style={[styles.albumArt, { backgroundColor: song.color }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.songTitle}>{song.title}</Text>
                    <Text style={styles.songArtist}>{song.artist}</Text>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${pct}%` as any, backgroundColor: accentColor }]} />
                    </View>
                  </View>
                  <Text style={[styles.pctText, { color: accentColor }]}>{pct}%</Text>
                </View>
              );
            })}

            {downloadedList.length === 0 && !downloadingAny && (
              <View style={styles.empty}>
                <Ionicons name="arrow-down-circle-outline" size={52} color="#38383A" />
                <Text style={styles.emptyTitle}>No Downloads Yet</Text>
                <Text style={styles.emptyText}>Download songs from Home or Search to listen offline</Text>
              </View>
            )}

            {downloadedList.map((song) => (
              <TouchableOpacity key={song.id} style={styles.songRow} onPress={() => setCurrentSong(song)}>
                <View style={[styles.albumArt, { backgroundColor: song.color }]}>
                  <Ionicons name="checkmark" size={18} color="#fff" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.songTitle}>{song.title}</Text>
                  <Text style={styles.songArtist}>{song.artist}</Text>
                </View>
                <Ionicons name="play-circle-outline" size={26} color={accentColor} />
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* Liked */}
        {activeTab === 2 && (
          <>
            {likedList.length === 0 && (
              <View style={styles.empty}>
                <Ionicons name="heart-outline" size={52} color="#38383A" />
                <Text style={styles.emptyTitle}>No Liked Songs</Text>
                <Text style={styles.emptyText}>Heart songs from Home to see them here</Text>
              </View>
            )}
            {likedList.map((song) => (
              <TouchableOpacity key={song.id} style={styles.songRow} onPress={() => setCurrentSong(song)}>
                <View style={[styles.albumArt, { backgroundColor: song.color }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.songTitle}>{song.title}</Text>
                  <Text style={styles.songArtist}>{song.artist}</Text>
                </View>
                <Ionicons name="heart" size={20} color={accentColor} />
                <DownloadButton song={song} />
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  content: { paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { color: '#fff', fontSize: 32, fontWeight: '800' },
  addBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1C1C1E',
  },
  tabText: { color: '#fff', fontSize: 13, fontWeight: '500' },
  playlistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  playlistArt: { width: 56, height: 56, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  playlistName: { color: '#fff', fontSize: 16, fontWeight: '600' },
  playlistCount: { color: '#8E8E93', fontSize: 13, marginTop: 2 },
  dlBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#38383A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {},
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    gap: 8,
  },
  infoText: { fontSize: 14, fontWeight: '500' },
  empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  emptyText: { color: '#8E8E93', fontSize: 14, textAlign: 'center', paddingHorizontal: 40 },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  albumArt: { width: 52, height: 52, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  songTitle: { color: '#fff', fontSize: 15, fontWeight: '600' },
  songArtist: { color: '#8E8E93', fontSize: 13, marginTop: 2 },
  progressTrack: { height: 3, backgroundColor: '#38383A', borderRadius: 2, marginTop: 6, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
  pctText: { fontSize: 12, fontWeight: '700', marginLeft: 4 },
});
