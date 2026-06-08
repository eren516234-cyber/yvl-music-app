import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useMusic } from '../contexts/MusicContext';
import { useTheme } from '../contexts/ThemeContext';

export function MiniPlayer({ bottomOffset = 0 }: { bottomOffset?: number }) {
  const { currentSong, isPlaying, togglePlay } = useMusic();
  const { accentColor } = useTheme();
  const router = useRouter();
  const playAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(playAnim, { toValue: 0.7, duration: 600, useNativeDriver: true }),
          Animated.timing(playAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    } else {
      playAnim.stopAnimation();
      playAnim.setValue(1);
    }
  }, [isPlaying]);

  if (!currentSong) return null;

  return (
    <TouchableOpacity
      style={[styles.container, { bottom: bottomOffset }]}
      onPress={() => router.push('/player')}
      activeOpacity={0.95}
    >
      <Animated.View style={[styles.dot, { backgroundColor: accentColor, opacity: playAnim }]} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{currentSong.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{currentSong.artist}</Text>
      </View>
      <TouchableOpacity onPress={togglePlay} style={styles.btn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={22} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Ionicons name="play-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 10,
    right: 10,
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  dot: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 12,
  },
  info: { flex: 1 },
  title: { color: '#fff', fontSize: 14, fontWeight: '600' },
  artist: { color: '#8E8E93', fontSize: 12, marginTop: 2 },
  btn: { marginLeft: 14 },
});
