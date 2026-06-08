import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/contexts/ThemeContext";

export default function TabLayout() {
  const { accent, colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: accent,
        tabBarInactiveTintColor: colors.mutedForeground,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: Platform.OS === "ios" ? "transparent" : colors.tabBar,
          borderTopWidth: 0,
          elevation: 0,
          height: 56 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView intensity={90} tint={colors.background === "#000000" ? "dark" : "light"} style={StyleSheet.absoluteFill} />
          ) : null,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
          letterSpacing: 0.4,
          textTransform: "uppercase",
        },
        animation: "shift",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="search"
        options={{ title: "Search", tabBarIcon: ({ color, size }) => <Feather name="search" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="library"
        options={{ title: "Library", tabBarIcon: ({ color, size }) => <Feather name="bookmark" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: "Settings", tabBarIcon: ({ color, size }) => <Feather name="settings" size={size} color={color} /> }}
      />
    </Tabs>
  );
}
