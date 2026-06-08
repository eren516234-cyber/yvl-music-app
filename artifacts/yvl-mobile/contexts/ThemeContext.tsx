import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

export const ACCENT_COLORS = [
  '#BF5AF2',
  '#0A84FF',
  '#30D158',
  '#FF9F0A',
  '#FF375F',
  '#FF3B30',
];

interface ThemeContextType {
  rainbowEnabled: boolean;
  setRainbowEnabled: (v: boolean) => void;
  selectedColor: string;
  setSelectedColor: (c: string) => void;
  accentColor: string;
  rainbowAnim: Animated.Value;
  perScreenColor: boolean;
  setPerScreenColor: (v: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  rainbowEnabled: false,
  setRainbowEnabled: () => {},
  selectedColor: '#BF5AF2',
  setSelectedColor: () => {},
  accentColor: '#BF5AF2',
  rainbowAnim: new Animated.Value(0),
  perScreenColor: false,
  setPerScreenColor: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [rainbowEnabled, setRainbowEnabledState] = useState(false);
  const [selectedColor, setSelectedColorState] = useState('#BF5AF2');
  const [perScreenColor, setPerScreenColorState] = useState(false);
  const [colorIdx, setColorIdx] = useState(0);
  const rainbowAnim = useRef(new Animated.Value(0)).current;
  const loopRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const accentColor = rainbowEnabled ? ACCENT_COLORS[colorIdx] : selectedColor;

  useEffect(() => {
    AsyncStorage.multiGet(['rainbow', 'selectedColor', 'perScreen']).then((vals) => {
      if (vals[0][1] === 'true') setRainbowEnabledState(true);
      if (vals[1][1]) setSelectedColorState(vals[1][1]);
      if (vals[2][1] === 'true') setPerScreenColorState(true);
    });
  }, []);

  useEffect(() => {
    if (!rainbowEnabled) {
      if (loopRef.current) clearInterval(loopRef.current);
      rainbowAnim.stopAnimation();
      rainbowAnim.setValue(0);
      return;
    }
    let idx = 0;
    const advance = () => {
      idx = (idx + 1) % ACCENT_COLORS.length;
      setColorIdx(idx);
      Animated.timing(rainbowAnim, {
        toValue: idx,
        duration: 1200,
        useNativeDriver: false,
      }).start();
    };
    loopRef.current = setInterval(advance, 2500);
    return () => {
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, [rainbowEnabled]);

  const setRainbowEnabled = (v: boolean) => {
    setRainbowEnabledState(v);
    AsyncStorage.setItem('rainbow', String(v));
  };
  const setSelectedColor = (c: string) => {
    setSelectedColorState(c);
    AsyncStorage.setItem('selectedColor', c);
  };
  const setPerScreenColor = (v: boolean) => {
    setPerScreenColorState(v);
    AsyncStorage.setItem('perScreen', String(v));
  };

  return (
    <ThemeContext.Provider value={{
      rainbowEnabled, setRainbowEnabled,
      selectedColor, setSelectedColor,
      accentColor, rainbowAnim,
      perScreenColor, setPerScreenColor,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
