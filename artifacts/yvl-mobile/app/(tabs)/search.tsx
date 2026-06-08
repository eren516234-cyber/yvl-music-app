import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SONGS, useMusic } from '@/contexts/MusicContext';
import { useTheme } from '@/contexts/ThemeContext';

const CATEGORIES = [
  { name: 'Pop', color: '#FF375F' },
  { name: 'Hip-Hop', color: '#BF5AF2' },
  { name: 'Rock', color: '#FF9F0A' },
  { name: 'K-Pop', color: '#30D158' },
  { name: 'Electronic', color: '#0A84FF' },
  { name: 'R&B', color: '#FF6B35' },
  { name: 'Bollywood', color: '#FF3B30' },
  { name: 'Jazz', color: '#64D2FF' },
];

const ARTISTS = [
  { name: 'The Weeknd', tag: 'R&B · Pop', color: '#FF3B30' },
  { name: 'Taylor Swift', tag: 'Pop · Country', color: '#BF5AF2' },
  { name: 'BTS', tag: 'K-Pop', color: '#0A84FF' },
  { name: 'BLACKPINK', tag: 'K-Pop', color: '#FF375F' },
  { name: 'Harry Styles', tag: 'Pop · Rock', color: '#30D158' },
];

export default function SearchScreen() {
  const { accentColor } = useTheme();
  const { setCurrentSong } = useMusic();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const results = query.length > 1
    ? SONGS.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.artist.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: 180 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Search</Text>

        {/* Search bar */}
        <View style={[styles.searchBar, { borderColor: query ? accentColor : '#38383A' }]}>
          <Ionicons name="search" size={18} color="#8E8E93" style={{ marginRight: 8 }} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Songs, artists, albums"
            placeholderTextColor="#636366"
            style={styles.searchInput}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color="#636366" />
            </TouchableOpacity>
          )}
        </View>

        {/* Results */}
        {results.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Results</Text>
            {results.map((song) => (
              <TouchableOpacity
                key={song.id}
                style={styles.songRow}
                onPress={() => setCurrentSong(song)}
              >
                <View style={[styles.art, { backgroundColor: song.color }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.songTitle}>{song.title}</Text>
                  <Text style={styles.songArtist}>{song.artist}</Text>
                </View>
                <Ionicons name="play-circle-outline" size={24} color={accentColor} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Categories */}
        {query.length === 0 && (
          <>
            <Text style={styles.sectionTitle}>Browse Categories</Text>
            <View style={styles.grid}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity key={cat.name} style={[styles.catCard, { backgroundColor: cat.color }]}>
                  <Text style={styles.catName}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 28 }]}>Top Artists</Text>
            {ARTISTS.map((artist) => (
              <View key={artist.name} style={styles.artistRow}>
                <View style={[styles.artistAvatar, { backgroundColor: artist.color }]}>
                  <Ionicons name="person" size={22} color="#fff" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.artistName}>{artist.name}</Text>
                  <Text style={styles.artistTag}>{artist.tag}</Text>
                </View>
                <TouchableOpacity style={[styles.followBtn, { borderColor: accentColor }]}>
                  <Text style={[styles.followText, { color: accentColor }]}>Follow</Text>
                </TouchableOpacity>
              </View>
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
  title: { color: '#fff', fontSize: 32, fontWeight: '800', marginBottom: 16 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  searchInput: { flex: 1, color: '#fff', fontSize: 15 },
  section: { marginBottom: 24 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 12 },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  art: { width: 52, height: 52, borderRadius: 10 },
  songTitle: { color: '#fff', fontSize: 15, fontWeight: '600' },
  songArtist: { color: '#8E8E93', fontSize: 13, marginTop: 2 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  catCard: {
    width: '47%',
    height: 80,
    borderRadius: 14,
    justifyContent: 'flex-end',
    padding: 14,
  },
  catName: { color: '#fff', fontSize: 16, fontWeight: '700' },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  artistAvatar: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  artistName: { color: '#fff', fontSize: 15, fontWeight: '600' },
  artistTag: { color: '#8E8E93', fontSize: 13, marginTop: 2 },
  followBtn: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  followText: { fontSize: 13, fontWeight: '600' },
});
