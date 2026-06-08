import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SONGS, useMusic } from '@/contexts/MusicContext';
import { useTheme } from '@/contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

const LYRICS = [
  { id: 0, text: "I been runnin' out of time", active: false },
  { id: 1, text: "Need a partner in crime", active: false },
  { id: 2, text: "I feel ya movin' past me", active: false },
  { id: 3, text: "And it's only just begun", active: true },
  { id: 4, text: "I can't stop the feeling", active: false },
  { id: 5, text: "Deep inside me, it's healing", active: false },
  { id: 6, text: "Said, baby I'ma love you", active: false },
  { id: 7, text: "Until you can't no more", active: false },
  { id: 8, text: "It's Blinding Lights", active: false },
  { id: 9, text: "That light up the sky", active: false },
  { id: 10, text: "You said I'm running wild", active: false },
  { id: 11, text: "But you know that I shine", active: false },
];

type LyricsMode = 'Apple' | 'Glow' | 'Cinema';

export default function LyricsScreen() {
  const router = useRouter();
  const { currentSong } = useMusic();
  const { accentColor } = useTheme();
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<LyricsMode>('Apple');
  const [activeLine, setActiveLine] = useState(3);
  const glowAnim = useRef(new Animated.Value(0)).current;
  const song = currentSong ?? SONGS[0];

  React.useEffect(() => {
    if (mode === 'Glow') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, { toValue: 1, duration: 800, useNativeDriver: false }),
          Animated.timing(glowAnim, { toValue: 0, duration: 800, useNativeDriver: false }),
        ])
      ).start();
    } else {
      glowAnim.stopAnimation();
    }
  }, [mode]);

  const renderApple = () => (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 20, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {LYRICS.map((line, i) => (
        <TouchableOpacity key={line.id} onPress={() => setActiveLine(i)} style={styles.lyricLine}>
          {i === activeLine ? (
            <Text style={styles.activeLineText}>{line.text}</Text>
          ) : (
            <Text style={[styles.inactiveLineText, i < activeLine && { opacity: 0.25 }]}>
              {line.text}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderGlow = () => (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 20, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {LYRICS.map((line, i) => {
        const glowColor = glowAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [accentColor + 'BB', accentColor],
        });
        return (
          <TouchableOpacity key={line.id} onPress={() => setActiveLine(i)} style={styles.lyricLine}>
            {i === activeLine ? (
              <Animated.Text style={[styles.glowActiveLine, { color: glowColor as any, textShadowColor: accentColor }]}>
                {line.text}
              </Animated.Text>
            ) : (
              <Text style={[styles.glowInactiveLine, i < activeLine && { opacity: 0.2 }]}>
                {line.text}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  const renderCinema = () => (
    <View style={styles.cinemaContainer}>
      {LYRICS.map((line, i) => {
        const dist = Math.abs(i - activeLine);
        if (dist > 2) return null;
        const opacity = dist === 0 ? 1 : dist === 1 ? 0.4 : 0.15;
        const fontSize = dist === 0 ? 26 : dist === 1 ? 18 : 14;
        return (
          <TouchableOpacity
            key={line.id}
            onPress={() => setActiveLine(i)}
            style={[styles.cinemaLine, { marginVertical: dist === 0 ? 14 : 6 }]}
          >
            <Text style={[styles.cinemaText, { opacity, fontSize, color: dist === 0 ? accentColor : '#fff' }]}>
              {line.text}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.root}>
      {/* Background */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: song.color2 }]} />
      <View style={[StyleSheet.absoluteFill, styles.bgOverlay]} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-down" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.headerTitle}>Lyrics</Text>
          <Text style={styles.headerSub}>LrcLib · Synced ✓</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Mode switcher */}
      <View style={styles.modeSwitcher}>
        {(['Apple', 'Glow', 'Cinema'] as LyricsMode[]).map((m) => (
          <TouchableOpacity
            key={m}
            onPress={() => setMode(m)}
            style={[styles.modeBtn, mode === m && { backgroundColor: accentColor }]}
          >
            <Text style={[styles.modeBtnText, mode === m && { color: '#fff', fontWeight: '700' }]}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Song info pill */}
      <View style={styles.songPill}>
        <View style={[styles.pillArt, { backgroundColor: song.color }]} />
        <View style={{ flex: 1 }}>
          <Text style={styles.pillTitle}>{song.title}</Text>
          <Text style={styles.pillArtist}>{song.artist} · {song.album}</Text>
        </View>
        <Ionicons name="heart-outline" size={22} color="#fff" />
      </View>

      {/* Lyrics */}
      {mode === 'Apple' && renderApple()}
      {mode === 'Glow' && renderGlow()}
      {mode === 'Cinema' && renderCinema()}

      {/* Progress bar */}
      <View style={[styles.progressBar, { bottom: insets.bottom + 20 }]}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { backgroundColor: accentColor }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  bgOverlay: { backgroundColor: 'rgba(0,0,0,0.75)' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  headerTitle: { color: '#fff', fontSize: 17, fontWeight: '700' },
  headerSub: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 },
  modeSwitcher: {
    flexDirection: 'row',
    marginHorizontal: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 3,
    marginBottom: 16,
  },
  modeBtn: { flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: 'center' },
  modeBtnText: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  songPill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: 12,
    gap: 12,
    marginBottom: 8,
  },
  pillArt: { width: 44, height: 44, borderRadius: 10 },
  pillTitle: { color: '#fff', fontSize: 15, fontWeight: '700' },
  pillArtist: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 },
  lyricLine: { marginVertical: 6 },
  activeLineText: { color: '#fff', fontSize: 24, fontWeight: '800', lineHeight: 34 },
  inactiveLineText: { color: 'rgba(255,255,255,0.4)', fontSize: 18, lineHeight: 28 },
  glowActiveLine: {
    fontSize: 24,
    fontWeight: '800',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
    lineHeight: 34,
  },
  glowInactiveLine: { color: 'rgba(255,255,255,0.35)', fontSize: 18, lineHeight: 28 },
  cinemaContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  cinemaLine: { alignItems: 'center' },
  cinemaText: { textAlign: 'center', fontWeight: '700', lineHeight: 36 },
  progressBar: {
    position: 'absolute',
    left: 24,
    right: 24,
  },
  progressTrack: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', width: '35%', borderRadius: 2 },
});
