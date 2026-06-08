import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, Platform, StyleSheet, View } from "react-native";
import { Video, ResizeMode } from "expo-av";

const { width: W, height: H } = Dimensions.get("window");

type Props = {
  onDone: () => void;
};

export function AnimatedSplash({ onDone }: Props) {
  const opacity = useRef(new Animated.Value(1)).current;
  const called = useRef(false);

  function finish() {
    if (called.current) return;
    called.current = true;
    Animated.timing(opacity, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start(() => onDone());
  }

  useEffect(() => {
    // On web: skip video, just show icon briefly then fade
    if (Platform.OS === "web") {
      const t = setTimeout(finish, 1800);
      return () => clearTimeout(t);
    }
    // Native: max 6s fallback
    const timer = setTimeout(finish, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.root, { opacity }]} pointerEvents="none">
      {Platform.OS !== "web" ? (
        <Video
          source={require("@/assets/video/splash.mp4")}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping={false}
          isMuted
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded && status.didJustFinish) finish();
          }}
        />
      ) : (
        <View style={styles.webSplash}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      )}
      <View style={styles.overlay} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    backgroundColor: "#000",
  },
  video: {
    width: W,
    height: H,
  },
  webSplash: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  icon: {
    width: 180,
    height: 180,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
});
