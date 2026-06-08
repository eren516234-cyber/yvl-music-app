import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SONGS, useMusic } from '@/contexts/MusicContext';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

const SCATTER = [
  { x: 20, y: 0, rotate: '-8deg', size: 80 },
  { x: 140, y: -20, rotate: '5deg', size: 72 },
  { x: 260, y: 10, rotate: '-3deg', size: 76 },
  { x: 60, y: 90, rotate: '6deg', size: 68 },
  { x: 190, y: 70, rotate: '-10deg', size: 84 },
  { x: 300, y: 80, rotate: '4deg', size: 72 },
  { x: 30, y: 180, rotate: '-5deg', size: 76 },
  { x: 160, y: 160, rotate: '8deg', size: 80 },
];

const TRENDING = [
  { rank: 1, change: '+2', song: SONGS[0] },
  { rank: 2, change: '-1', song: SONGS[1] },
  { rank: 3, change: 'NEW', song: SONGS[2] },
  { rank: 4, change: '+5', song: SONGS[3] },
  { rank: 5, change: '—', song: SONGS[4] },
];

export default function ExploreScreen() {
  const router = useRouter();
  const { accentColor } = useTheme();
  const { setCurrentSong } = useMusic();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Explore ✦</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Scattered circles */}
        <View style={styles.scatterContainer}>
          {SONGS.slice(0, 8).map((song, i) => {
            const pos = SCATTER[i] ?? { x: 0, y: 0, rotate: '0deg', size: 72 };
            return (
              <TouchableOpacity
                key={song.id}
                onPress={() => setCurrentSong(song)}
                style={[
                  styles.floatingCard,
                  {
                    left: pos.x,
                    top: pos.y,
                    width: pos.size,
                    height: pos.size,
                    backgroundColor: song.color,
                    transform: [{ rotate: pos.rotate }],
                  },
                ]}
              >
                <Text style={styles.floatingText} numberOfLines={2}>{song.artist}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Featured tag */}
        <View style={[styles.featuredBadge, { backgroundColor: accentColor }]}>
          <Text style={styles.featuredText}>✦ Discover New Music</Text>
        </View>

        {/* Trending */}
        <Text style={styles.trendingTitle}>Trending Now</Text>
        {TRENDING.map((item) => (
          <TouchableOpacity
            key={item.rank}
            style={styles.trendingRow}
            onPress={() => setCurrentSong(item.song)}
          >
            <Text style={[styles.rank, { color: item.rank <= 3 ? accentColor : '#636366' }]}>
              #{item.rank}
            </Text>
            <View style={[styles.art, { backgroundColor: item.song.color }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.songTitle}>{item.song.title}</Text>
              <Text style={styles.songArtist}>{item.song.artist}</Text>
            </View>
            <Text style={[
              styles.change,
              { color: item.change.startsWith('+') ? '#30D158' : item.change === 'NEW' ? accentColor : '#636366' },
            ]}>
              {item.change}
            </Text>
            <Ionicons name="play-circle-outline" size={28} color={accentColor} />
          </TouchableOpacity>
        ))}

        {/* Genres grid */}
        <Text style={[styles.trendingTitle, { marginTop: 28 }]}>Mood & Genre</Text>
        <View style={styles.genreGrid}>
          {[
            { name: 'Party', color: '#FF375F' },
            { name: 'Focus', color: '#0A84FF' },
            { name: 'Sleep', color: '#5E5CE6' },
            { name: 'Workout', color: '#30D158' },
            { name: 'Chill', color: '#BF5AF2' },
            { name: 'Sad', color: '#636366' },
          ].map((g) => (
            <TouchableOpacity key={g.name} style={[styles.genreCard, { backgroundColor: g.color }]}>
              <Text style={styles.genreText}>{g.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  content: { paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  title: { color: '#fff', fontSize: 22, fontWeight: '800' },
  scatterContainer: { height: 280, position: 'relative', marginBottom: 24 },
  floatingCard: {
    position: 'absolute',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingText: { color: '#fff', fontSize: 10, fontWeight: '700', textAlign: 'center' },
  featuredBadge: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24,
  },
  featuredText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  trendingTitle: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 16 },
  trendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    gap: 12,
  },
  rank: { fontSize: 16, fontWeight: '800', width: 32 },
  art: { width: 48, height: 48, borderRadius: 10 },
  songTitle: { color: '#fff', fontSize: 15, fontWeight: '600' },
  songArtist: { color: '#8E8E93', fontSize: 13, marginTop: 2 },
  change: { fontSize: 13, fontWeight: '700', width: 36, textAlign: 'center' },
  genreGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  genreCard: { width: (width - 50) / 3, height: 70, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  genreText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
