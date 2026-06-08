import { Feather } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { usePlayer } from "@/contexts/PlayerContext";
import { useTheme, PRESET_ACCENTS } from "@/contexts/ThemeContext";

const QUALITIES = ["320kbps", "160kbps", "96kbps"] as const;

export default function SettingsScreen() {
  const { accent, colors, setRoute, paint, rainbow, perScreen, baseAccent,
    setPaint, setRainbow, setPerScreen, setBaseAccent } = useTheme();
  const { quality, setQuality } = usePlayer();
  const insets = useSafeAreaInsets();

  useEffect(() => { setRoute("settings"); }, [setRoute]);

  const bg = colors.background;
  const fg = colors.foreground;
  const card = colors.card;
  const muted = colors.mutedForeground;
  const border = colors.border;

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: bg }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: 160 }]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: fg }]}>Settings</Text>

      {/* ── Appearance ── */}
      <Text style={[styles.section, { color: accent }]}>Appearance</Text>

      {/* Color picker */}
      <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
        <Text style={[styles.cardTitle, { color: fg }]}>Accent Color</Text>
        <View style={styles.colorRow}>
          {PRESET_ACCENTS.map((hex) => (
            <Pressable
              key={hex}
              onPress={() => { setBaseAccent(hex); setPerScreen(false); setRainbow(false); }}
              style={[styles.colorDot, {
                backgroundColor: hex,
                borderWidth: baseAccent === hex && !perScreen && !rainbow ? 3 : 0,
                borderColor: fg,
              }]}
            />
          ))}
        </View>
      </View>

      {/* Toggles */}
      <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
        <SettingRow
          label="Per-screen Colors"
          desc="Each tab gets its own color"
          value={perScreen && !rainbow}
          onToggle={(v) => { setPerScreen(v); if (v) setRainbow(false); }}
          accent={accent} fg={fg} muted={muted}
        />
        <View style={[styles.divider, { backgroundColor: border }]} />
        <SettingRow
          label="Paint Mode"
          desc="Background becomes the accent color"
          value={paint}
          onToggle={setPaint}
          accent={accent} fg={fg} muted={muted}
        />
        <View style={[styles.divider, { backgroundColor: border }]} />
        <SettingRow
          label="🌈 Rainbow Mode"
          desc="Cycles through all colors automatically"
          value={rainbow}
          onToggle={(v) => { setRainbow(v); if (v) setPerScreen(false); setPaint(false); }}
          accent={accent} fg={fg} muted={muted}
        />
      </View>

      {/* ── Streaming quality ── */}
      <Text style={[styles.section, { color: accent }]}>Audio Quality</Text>
      <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
        <Text style={[styles.cardTitle, { color: fg }]}>Streaming Quality</Text>
        <Text style={[styles.cardDesc, { color: muted }]}>Higher quality uses more data.</Text>
        <View style={styles.qualityRow}>
          {QUALITIES.map((q) => (
            <Pressable
              key={q}
              onPress={() => setQuality(q)}
              style={[styles.qualityChip, {
                borderColor: quality === q ? accent : border,
                backgroundColor: quality === q ? accent : "transparent",
              }]}
            >
              <Text style={[styles.qualityText, { color: quality === q ? "#000" : fg }]}>{q}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* ── About ── */}
      <Text style={[styles.section, { color: accent }]}>About</Text>
      <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
        {[
          { icon: "music", label: "Music source", value: "JioSaavn" },
          { icon: "mic", label: "Lyrics source", value: "LRCLib" },
          { icon: "globe", label: "API", value: "saavn.dev" },
          { icon: "shield", label: "Version", value: "1.0.0" },
        ].map((row, i) => (
          <React.Fragment key={row.icon}>
            {i > 0 && <View style={[styles.divider, { backgroundColor: border }]} />}
            <View style={styles.aboutRow}>
              <Feather name={row.icon as any} size={15} color={accent} style={{ marginRight: 12 }} />
              <Text style={[styles.aboutLabel, { color: `${fg}99` }]}>{row.label}</Text>
              <Text style={[styles.aboutValue, { color: muted }]}>{row.value}</Text>
            </View>
          </React.Fragment>
        ))}
      </View>

      {/* Brand */}
      <View style={styles.brand}>
        <Text style={[styles.brandLogo, { color: accent }]}>YVL</Text>
        <Text style={[styles.brandSub, { color: muted }]}>Music streaming · JioSaavn · LRCLib</Text>
      </View>
    </ScrollView>
  );
}

function SettingRow({ label, desc, value, onToggle, accent, fg, muted }: {
  label: string; desc: string; value: boolean;
  onToggle: (v: boolean) => void;
  accent: string; fg: string; muted: string;
}) {
  return (
    <View style={styles.settingRow}>
      <View style={{ flex: 1, marginRight: 12 }}>
        <Text style={[styles.settingLabel, { color: fg }]}>{label}</Text>
        <Text style={[styles.settingDesc, { color: muted }]}>{desc}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "rgba(255,255,255,0.12)", true: accent }}
        thumbColor={value ? "#fff" : "#999"}
        ios_backgroundColor="rgba(255,255,255,0.12)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: 20 },
  title: { fontSize: 34, fontWeight: "800", letterSpacing: -1, marginBottom: 24 },
  section: { fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10, marginTop: 8 },
  card: { borderRadius: 18, borderWidth: 1, overflow: "hidden", marginBottom: 20, padding: 16 },
  cardTitle: { fontSize: 15, fontWeight: "700", marginBottom: 4 },
  cardDesc: { fontSize: 12, marginBottom: 14 },
  colorRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 10 },
  colorDot: { width: 36, height: 36, borderRadius: 18 },
  divider: { height: 1, marginVertical: 4 },
  settingRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  settingLabel: { fontSize: 15, fontWeight: "600" },
  settingDesc: { fontSize: 12, marginTop: 2 },
  qualityRow: { flexDirection: "row", gap: 10, marginTop: 10 },
  qualityChip: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20, borderWidth: 1.5 },
  qualityText: { fontSize: 13, fontWeight: "600" },
  aboutRow: { flexDirection: "row", alignItems: "center", paddingVertical: 11 },
  aboutLabel: { flex: 1, fontSize: 14 },
  aboutValue: { fontSize: 14 },
  brand: { alignItems: "center", paddingVertical: 24 },
  brandLogo: { fontSize: 60, fontWeight: "900", letterSpacing: -3 },
  brandSub: { fontSize: 12, marginTop: 6 },
});
