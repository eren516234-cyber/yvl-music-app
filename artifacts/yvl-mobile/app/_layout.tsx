import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AnimatedSplash } from "@/components/AnimatedSplash";
import { FullPlayer } from "@/components/FullPlayer";
import { MiniPlayer } from "@/components/MiniPlayer";
import { LikesProvider } from "@/contexts/LikesContext";
import { PlaylistProvider } from "@/contexts/PlaylistContext";
import { PlayerProvider, usePlayer } from "@/contexts/PlayerContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60_000, retry: 2 } },
});

/** Cross-fade overlay when background color changes */
function BgTransitionOverlay() {
  const { colors } = useTheme();
  const prevBg = useRef(colors.background);
  const opacityRef = useRef(new Animated.Value(1));
  const [overlay, setOverlay] = useState<{ bg: string; opacity: Animated.Value } | null>(null);

  useEffect(() => {
    const newBg = colors.background;
    if (newBg === prevBg.current) return;
    const oldBg = prevBg.current;
    prevBg.current = newBg;

    const opacity = new Animated.Value(1);
    setOverlay({ bg: oldBg, opacity });
    Animated.timing(opacity, {
      toValue: 0,
      duration: 380,
      useNativeDriver: true,
    }).start(() => setOverlay(null));
  }, [colors.background]);

  if (!overlay) return null;
  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, { backgroundColor: overlay.bg, opacity: overlay.opacity, zIndex: 900 }]}
      pointerEvents="none"
    />
  );
}

function FloatingMiniPlayer() {
  const { current } = usePlayer();
  const insets = useSafeAreaInsets();
  if (!current) return null;
  return (
    <View style={[styles.miniFloat, { bottom: 58 + insets.bottom + 6 }]}>
      <MiniPlayer />
    </View>
  );
}

function AppContent() {
  const { colors } = useTheme();
  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
          animation: "ios_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="album/[id]" options={{ animation: "ios_from_right" }} />
        <Stack.Screen name="artist/[id]" options={{ animation: "ios_from_right" }} />
      </Stack>
      <BgTransitionOverlay />
      <FloatingMiniPlayer />
      <FullPlayer />
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <LikesProvider>
              <PlaylistProvider>
                <PlayerProvider>
                  <GestureHandlerRootView style={styles.flex}>
                    <KeyboardProvider>
                      <AppContent />
                      {!splashDone && (
                        <AnimatedSplash onDone={() => setSplashDone(true)} />
                      )}
                    </KeyboardProvider>
                  </GestureHandlerRootView>
                </PlayerProvider>
              </PlaylistProvider>
            </LikesProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  miniFloat: {
    position: "absolute",
    left: 12,
    right: 12,
    zIndex: 50,
  },
});
