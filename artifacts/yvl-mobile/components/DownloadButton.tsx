import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Song, useMusic } from '../contexts/MusicContext';
import { useTheme } from '../contexts/ThemeContext';

export function DownloadButton({ song, size = 22 }: { song: Song; size?: number }) {
  const { downloadedSongs, downloadProgress, downloadSong } = useMusic();
  const { accentColor } = useTheme();
  const progress = downloadProgress[song.id];
  const isDownloaded = downloadedSongs.includes(song.id);
  const isDownloading = progress !== undefined;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isDownloading) {
      Animated.loop(
        Animated.timing(rotateAnim, { toValue: 1, duration: 1000, useNativeDriver: true })
      ).start();
      Animated.timing(progressAnim, {
        toValue: (progress ?? 0) / 100,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      rotateAnim.stopAnimation();
      rotateAnim.setValue(0);
    }
  }, [isDownloading, progress]);

  if (isDownloaded) {
    return (
      <View style={[styles.iconBtn, { backgroundColor: accentColor + '22' }]}>
        <Ionicons name="checkmark-circle" size={size} color={accentColor} />
      </View>
    );
  }

  if (isDownloading) {
    const circumference = 2 * Math.PI * 9;
    return (
      <View style={[styles.iconBtn, styles.progressContainer]}>
        <Ionicons name="arrow-down" size={size - 4} color={accentColor} />
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.iconBtn}
      onPress={() => downloadSong(song)}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Ionicons name="arrow-down-circle-outline" size={size} color="#8E8E93" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    borderWidth: 2,
    borderColor: '#BF5AF2',
  },
});
