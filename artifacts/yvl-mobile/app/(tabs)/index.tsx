import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DownloadButton } from '@/components/DownloadButton';
import { SONGS, useMusic } from '@/contexts/MusicContext';
import { useTheme } from '@/contexts/ThemeContext';

const GENRES = ['For you', 'Rock', 'Hip-hop', 'K-Pop', 'EDM', 'Bollywood'];

export default function HomeScreen() {
  const { accentColor, rainbowAnim, rainbowEnabled } = useTheme();
  const { currentSong, setCurrentSong, isPlaying, likedSongs, toggleLike } = useMusic();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeGenre, setActiveGenre] = React.useState(0);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const animatedAccent = rainbowEnabled
    ? rainbowAnim.interpolate({
        inputRange: [0, 1, 2, 3, 4, 5],
        outputRange: ['#BF5AF2', '#0A84FF', '#30D158', '#FF9F0A', '#FF375F', '#BF5AF2'],
      })
    : accentColor;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 16, paddingBottom: 180 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting.toUpperCase()}</Text>
            <Animated.Text style={[styles.yvl, { color: animatedAccent as any }]}>
              YVL
            </Animated.Text>
          </View>
          <TouchableOpacity style={[styles.avatar, { backgroundColor: accentColor }]}>
            <Text style={styles.avatarText}>E</Text>
          </TouchableOpacity>
        </View>

        {/* Genre chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.genreRow}
          contentContainerStyle={styles.genreContent}
        >
          {GENRES.map((g, i) => (
            <TouchableOpacity
              key={g}
              onPress={() => setActiveGenre(i)}
              style={[
                styles.chip,
                activeGenre === i && { backgroundColor: accentColor, borderColor: accentColor },
              ]}
            >
              <Text style={[styles.chipText, activeGenre === i && { color: '#000', fontWeight: '700' }]}>
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Quick picks */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick picks</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: accentColor }]}>See all</Text>
          </TouchableOpacity>
        </View>
        {SONGS.slice(0, 5).map((song) => (
          <TouchableOpacity
            key={song.id}
            style={[
              styles.songRow,
              currentSong?.id === song.id && styles.songRowActive,
            ]}
            onPress={() => setCurrentSong(song)}
          >
            <View style={[styles.albumArt, { backgroundColor: song.color }]} />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
              <Text style={styles.songArtist} numberOfLines={1}>{song.artist}</Text>
            </View>
            <Text style={styles.duration}>{song.duration}</Text>
            <DownloadButton song={song} />
            <TouchableOpacity
              onPress={() => toggleLike(song.id)}
              style={styles.iconBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={likedSongs.includes(song.id) ? 'heart' : 'heart-outline'}
                size={20}
                color={likedSongs.includes(song.id) ? accentColor : '#636366'}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {/* Explore section */}
        <View style={[styles.sectionHeader, { marginTop: 28 }]}>
          <Text style={styles.sectionTitle}>Explore ✦</Text>
          <TouchableOpacity onPress={() => router.push('/explore')}>
            <Text style={[styles.seeAll, { color: accentColor }]}>See all →</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.exploreRow}
        >
          {SONGS.map((song) => (
            <TouchableOpacity
              key={song.id}
              style={styles.exploreCard}
              onPress={() => setCurrentSong(song)}
            >
              <View style={[styles.exploreCircle, { backgroundColor: song.color }]}>
                <Ionicons name="musical-notes" size={20} color="#fff" />
              </View>
              <Text style={styles.exploreName} numberOfLines={1}>{song.artist}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { color: '#8E8E93', fontSize: 11, fontWeight: '600', letterSpacing: 1.5 },
  yvl: { fontSize: 48, fontWeight: '800', letterSpacing: -1, marginTop: -4 },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  genreRow: { marginBottom: 24 },
  genreContent: { paddingRight: 20, gap: 8, flexDirection: 'row' },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#38383A',
  },
  chipText: { color: '#fff', fontSize: 13, fontWeight: '500' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  seeAll: { fontSize: 14, fontWeight: '500' },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  songRowActive: { backgroundColor: '#1C1C1E' },
  albumArt: { width: 52, height: 52, borderRadius: 10, marginRight: 12 },
  songInfo: { flex: 1 },
  songTitle: { color: '#fff', fontSize: 15, fontWeight: '600' },
  songArtist: { color: '#8E8E93', fontSize: 13, marginTop: 2 },
  duration: { color: '#8E8E93', fontSize: 13, marginRight: 8 },
  iconBtn: { marginLeft: 4, width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  exploreRow: { paddingRight: 20, gap: 16, flexDirection: 'row' },
  exploreCard: { alignItems: 'center', width: 72 },
  exploreCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  exploreName: { color: '#8E8E93', fontSize: 11, textAlign: 'center' },
});
