import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ACCENT_COLORS, useTheme } from '@/contexts/ThemeContext';

const AUDIO_QUALITIES = ['Normal', 'High', 'Very High', 'Lossless'];

export default function SettingsScreen() {
  const {
    rainbowEnabled, setRainbowEnabled,
    selectedColor, setSelectedColor,
    accentColor, rainbowAnim,
    perScreenColor, setPerScreenColor,
  } = useTheme();
  const insets = useSafeAreaInsets();
  const [audioQuality, setAudioQuality] = React.useState(1);
  const [crossfade, setCrossfade] = React.useState(true);
  const [normalizeVolume, setNormalizeVolume] = React.useState(false);

  const animBg = rainbowEnabled
    ? rainbowAnim.interpolate({
        inputRange: [0, 1, 2, 3, 4, 5],
        outputRange: ['#BF5AF2', '#0A84FF', '#30D158', '#FF9F0A', '#FF375F', '#BF5AF2'],
      })
    : accentColor;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: 180 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Settings</Text>

        {/* THEME */}
        <Text style={styles.sectionLabel}>THEME</Text>

        {/* Rainbow mode */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Animated.View style={[styles.iconWrap, { backgroundColor: (animBg as any) }]}>
              <Text style={styles.emoji}>🌈</Text>
            </Animated.View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>Rainbow Mode</Text>
              <Text style={styles.rowSub}>Colour cycles through the spectrum</Text>
            </View>
            <Switch
              value={rainbowEnabled}
              onValueChange={setRainbowEnabled}
              trackColor={{ false: '#38383A', true: accentColor }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Custom Colour */}
        <View style={[styles.card, { marginTop: 8 }]}>
          <View style={styles.row}>
            <View style={[styles.iconWrap, { backgroundColor: '#2C2C2E' }]}>
              <Text style={styles.emoji}>✏️</Text>
            </View>
            <Text style={styles.rowTitle}>Custom Colour</Text>
          </View>
          <View style={styles.colorGrid}>
            {ACCENT_COLORS.map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => { setSelectedColor(c); if (rainbowEnabled) setRainbowEnabled(false); }}
                style={[
                  styles.colorDot,
                  { backgroundColor: c },
                  selectedColor === c && !rainbowEnabled && styles.colorDotActive,
                ]}
              >
                {selectedColor === c && !rainbowEnabled && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Per-screen colour */}
        <View style={[styles.card, { marginTop: 8 }]}>
          <View style={styles.row}>
            <View style={[styles.iconWrap, { backgroundColor: '#2C2C2E' }]}>
              <Text style={styles.emoji}>🎨</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>Per-Screen Colour</Text>
              <Text style={styles.rowSub}>Each screen has its own accent</Text>
            </View>
            <Switch
              value={perScreenColor}
              onValueChange={setPerScreenColor}
              trackColor={{ false: '#38383A', true: accentColor }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Reset */}
        <TouchableOpacity
          style={styles.resetBtn}
          onPress={() => { setRainbowEnabled(false); setSelectedColor('#BF5AF2'); setPerScreenColor(false); }}
        >
          <Text style={styles.resetText}>Reset to Default</Text>
        </TouchableOpacity>

        {/* PLAYBACK */}
        <Text style={[styles.sectionLabel, { marginTop: 28 }]}>PLAYBACK</Text>

        <View style={styles.card}>
          <Text style={styles.rowTitle}>Audio Quality</Text>
          <Text style={styles.rowSub}>Streamed from JioSaavn (Melo API)</Text>
          <View style={styles.qualityRow}>
            {AUDIO_QUALITIES.map((q, i) => (
              <TouchableOpacity
                key={q}
                onPress={() => setAudioQuality(i)}
                style={[
                  styles.qualityBtn,
                  audioQuality === i && { backgroundColor: accentColor, borderColor: accentColor },
                ]}
              >
                <Text style={[styles.qualityText, audioQuality === i && { color: '#fff', fontWeight: '700' }]}>
                  {q}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.card, { marginTop: 8 }]}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>Crossfade</Text>
              <Text style={styles.rowSub}>Smooth transitions between songs</Text>
            </View>
            <Switch
              value={crossfade}
              onValueChange={setCrossfade}
              trackColor={{ false: '#38383A', true: accentColor }}
              thumbColor="#fff"
            />
          </View>
          <View style={[styles.row, { marginTop: 12 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>Normalize Volume</Text>
              <Text style={styles.rowSub}>Consistent volume across songs</Text>
            </View>
            <Switch
              value={normalizeVolume}
              onValueChange={setNormalizeVolume}
              trackColor={{ false: '#38383A', true: accentColor }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* ACCOUNT */}
        <Text style={[styles.sectionLabel, { marginTop: 28 }]}>ACCOUNT</Text>
        <View style={styles.card}>
          {[
            { icon: 'person-outline', label: 'Profile', sub: 'eren516234' },
            { icon: 'shield-checkmark-outline', label: 'Privacy', sub: 'Manage your data' },
            { icon: 'notifications-outline', label: 'Notifications', sub: 'Manage alerts' },
          ].map((item) => (
            <TouchableOpacity key={item.label} style={[styles.row, { marginBottom: 12 }]}>
              <Ionicons name={item.icon as any} size={22} color={accentColor} style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{item.label}</Text>
                <Text style={styles.rowSub}>{item.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#636366" />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.version}>YVL Music v1.0.0 · Powered by Melo API</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  content: { paddingHorizontal: 20 },
  title: { color: '#fff', fontSize: 32, fontWeight: '800', marginBottom: 24 },
  sectionLabel: { color: '#636366', fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 8 },
  card: { backgroundColor: '#1C1C1E', borderRadius: 14, padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: { fontSize: 18 },
  rowTitle: { color: '#fff', fontSize: 15, fontWeight: '600' },
  rowSub: { color: '#8E8E93', fontSize: 12, marginTop: 2 },
  colorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 },
  colorDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorDotActive: { borderColor: '#fff', borderWidth: 2.5 },
  resetBtn: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  resetText: { color: '#8E8E93', fontSize: 15, fontWeight: '600' },
  qualityRow: { flexDirection: 'row', gap: 8, marginTop: 14, flexWrap: 'wrap' },
  qualityBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#2C2C2E',
    borderWidth: 1,
    borderColor: '#38383A',
  },
  qualityText: { color: '#8E8E93', fontSize: 13 },
  version: { color: '#636366', fontSize: 12, textAlign: 'center', marginTop: 32 },
});
