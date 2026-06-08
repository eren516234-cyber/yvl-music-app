import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export function Equalizer({ color = "#ffffff", size = 12 }: { color?: string; size?: number }) {
  const bars = [useRef(new Animated.Value(0.3)).current, useRef(new Animated.Value(0.7)).current, useRef(new Animated.Value(0.5)).current];

  useEffect(() => {
    const anims = bars.map((bar, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(bar, {
            toValue: 1,
            duration: 300 + i * 80,
            useNativeDriver: true,
          }),
          Animated.timing(bar, {
            toValue: 0.2,
            duration: 300 + i * 80,
            useNativeDriver: true,
          }),
        ]),
      ),
    );
    anims.forEach((a) => a.start());
    return () => anims.forEach((a) => a.stop());
  }, []);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {bars.map((bar, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            {
              backgroundColor: color,
              width: size / 4,
              transform: [{ scaleY: bar }],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
  },
  bar: {
    flex: 1,
    borderRadius: 2,
    transformOrigin: "bottom",
  },
});
