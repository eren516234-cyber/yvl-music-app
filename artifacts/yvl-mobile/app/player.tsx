import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DownloadButton } from '@/components/DownloadButton';
import { SONGS, useMusic } from '@/contexts/MusicContext';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function PlayerScreen() {
  const router = useRouter();
  const { currentSong, isPlaying, togglePlay, likedSongs, toggleLike, setCurrentSong } = useMusic();
  const { accentColor } = useTheme();
  const insets = useSafeAreaInsets();
  const [progress, setProgress] = useState(0.35);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const albumScaleAnim = useRef(new Animated.Value(1)).current;

  const song = currentSong ?? SONGS[0];
  const isLiked = likedSongs.includes(song.id);
  const currentIdx = SONGS.findIndex((s) => s.id === song.id);

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(albumScaleAnim, { toValue: 1.04, duration: 800, useNativeDriver: true }),
          Animated.timing(albumScaleAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    } else {
      albumScaleAnim.stopAnimation();
      Animated.timing(albumScaleAnim, { toValue: 0.92, duration: 300, useNativeDriver: true }).start();
    }
  }, [isPlaying]);

  const skipNext = () => {
    const next = SONGS[(currentIdx + 1) % SONGS.length];
    setCurrentSong(next);
  };
  const skipPrev = () => {
    const prev = SONGS[(currentIdx - 1 + SONGS.length) % SONGS.length];
    setCurrentSong(prev);
  };

  const progressWidth = `${progress * 100}%`;

  return (
    <View style={[styles.root, { backgroundColor: song.color2 }]}>
      {/* Gradient overlay */}
      <View style={[StyleSheet.absoluteFill, styles.overlay]} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="chevron-down" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.headerLabel}>NOW PLAYING</Text>
          <Text style={styles.headerAlbum}>{song.album}</Text>
        </View>
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Album art */}
      <View style={styles.artContainer}>
        <Animated.View
          style={[
            styles.albumArt,
            { backgroundColor: song.color, transform: [{ scale: albumScaleAnim }] },
          ]}
        >
          <Ionicons name="musical-notes" size={72} color="rgba(255,255,255,0.6)" />
        </Animated.View>
      </View>

      {/* Song info */}
      <View style={styles.infoRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
          <Text style={styles.songArtist}>{song.artist}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleLike(song.id)}>
          <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={26} color={isLiked ? accentColor : '#fff'} />
        </TouchableOpacity>
      </View>

      {/* Progress */}
      <View style={styles.progressSection}>
        <TouchableOpacity
          style={styles.progressTrack}
          onPress={(e) => {
            const x = e.nativeEvent.locationX;
            setProgress(Math.max(0, Math.min(1, x / (width - 48))));
          }}
        >
          <View style={[styles.progressFill, { width: progressWidth as any, backgroundColor: accentColor }]} />
          <View style={[styles.progressThumb, { left: `${progress * 100}%` as any, backgroundColor: accentColor }]} />
        </TouchableOpacity>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>1:12</Text>
          <Text style={styles.timeText}>{song.duration}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="shuffle" size={22} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipPrev} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="play-skip-back" size={34} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.playBtn, { backgroundColor: accentColor }]} onPress={togglePlay}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={36} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipNext} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="play-skip-forward" size={34} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="repeat" size={22} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
      </View>

      {/* Bottom row */}
      <View style={[styles.bottomRow, { paddingBottom: insets.bottom + 24 }]}>
        <DownloadButton song={song} size={24} />
        <TouchableOpacity onPress={() => router.push('/lyrics')}>
          <Ionicons name="text-outline" size={22} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={22} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="list-outline" size={22} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  headerLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
  headerAlbum: { color: '#fff', fontSize: 13, fontWeight: '600', marginTop: 2 },
  artContainer: { alignItems: 'center', paddingVertical: 24 },
  albumArt: {
    width: width - 80,
    height: width - 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    marginBottom: 20,
  },
  songTitle: { color: '#fff', fontSize: 24, fontWeight: '800' },
  songArtist: { color: 'rgba(255,255,255,0.7)', fontSize: 16, marginTop: 4 },
  progressSection: { paddingHorizontal: 24, marginBottom: 16 },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'visible',
    position: 'relative',
  },
  progressFill: { height: '100%', borderRadius: 2 },
  progressThumb: {
    position: 'absolute',
    top: -6,
    marginLeft: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  timeText: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    marginBottom: 28,
  },
  playBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
  },
});
