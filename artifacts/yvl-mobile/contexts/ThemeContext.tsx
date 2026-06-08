import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type RouteKey =
  | "home"
  | "search"
  | "library"
  | "settings"
  | "album"
  | "artist"
  | "player";

const PER_SCREEN_MAP: Record<RouteKey, string> = {
  home: "#ffd23f",
  search: "#22d3ee",
  library: "#4ade80",
  settings: "#ec4899",
  album: "#f97316",
  artist: "#3b82f6",
  player: "#ff6f61",
};

const RAINBOW_COLORS = [
  "#ff4d4d", "#ff8800", "#ffe500", "#44dd88",
  "#44aaff", "#aa44ff", "#ff44cc", "#ff4d4d",
];

const PRESET_ACCENTS = [
  "#ffffff", "#ffd23f", "#22d3ee", "#4ade80",
  "#ec4899", "#f97316", "#3b82f6", "#ff6f61",
  "#a855f7", "#ef4444",
];

export type Colors = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentFg: string;
  border: string;
  input: string;
  tabBar: string;
};

const DARK_COLORS: Omit<Colors, "accent" | "accentFg"> = {
  background: "#000000",
  foreground: "#ffffff",
  card: "#0c0c0c",
  cardForeground: "#ffffff",
  muted: "#141414",
  mutedForeground: "#8a8a8a",
  border: "rgba(255,255,255,0.08)",
  input: "rgba(255,255,255,0.10)",
  tabBar: "rgba(0,0,0,0.92)",
};

function buildColors(accent: string, painted: boolean): Colors {
  if (painted) {
    return {
      background: accent,
      foreground: "#0a0a0a",
      card: "rgba(0,0,0,0.10)",
      cardForeground: "#0a0a0a",
      muted: "rgba(0,0,0,0.07)",
      mutedForeground: "rgba(0,0,0,0.60)",
      accent: "#0a0a0a",
      accentFg: accent,
      border: "rgba(0,0,0,0.12)",
      input: "rgba(0,0,0,0.10)",
      tabBar: `${accent}ee`,
    };
  }
  return {
    ...DARK_COLORS,
    accent,
    accentFg: "#000000",
  };
}

const LS_KEY = "yvl.theme.v2";

type ThemeState = {
  accent: string;
  colors: Colors;
  paint: boolean;
  rainbow: boolean;
  perScreen: boolean;
  baseAccent: string;
  presetAccents: string[];
  setPaint: (v: boolean) => void;
  setRainbow: (v: boolean) => void;
  setPerScreen: (v: boolean) => void;
  setBaseAccent: (hex: string) => void;
  setRoute: (key: RouteKey) => void;
  currentRoute: RouteKey;
};

const Ctx = createContext<ThemeState>({
  accent: "#ffd23f",
  colors: buildColors("#ffd23f", false),
  paint: false,
  rainbow: false,
  perScreen: true,
  baseAccent: "#ffffff",
  presetAccents: PRESET_ACCENTS,
  setPaint: () => {},
  setRainbow: () => {},
  setPerScreen: () => {},
  setBaseAccent: () => {},
  setRoute: () => {},
  currentRoute: "home",
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [paint, setPaintState] = useState(false);
  const [rainbow, setRainbowState] = useState(false);
  const [perScreen, setPerScreenState] = useState(true);
  const [baseAccent, setBaseAccentState] = useState("#ffffff");
  const [route, setRouteState] = useState<RouteKey>("home");
  const [rainbowColor, setRainbowColor] = useState(RAINBOW_COLORS[0]);
  const rainbowIdxRef = useRef(0);

  useEffect(() => {
    AsyncStorage.getItem(LS_KEY).then((raw) => {
      if (!raw) return;
      try {
        const s = JSON.parse(raw);
        if (typeof s.paint === "boolean") setPaintState(s.paint);
        if (typeof s.rainbow === "boolean") setRainbowState(s.rainbow);
        if (typeof s.perScreen === "boolean") setPerScreenState(s.perScreen);
        if (typeof s.baseAccent === "string") setBaseAccentState(s.baseAccent);
      } catch {}
    });
  }, []);

  const persist = useCallback((updates: Partial<{paint: boolean; rainbow: boolean; perScreen: boolean; baseAccent: string}>) => {
    AsyncStorage.getItem(LS_KEY).then((raw) => {
      const prev = raw ? JSON.parse(raw) : {};
      AsyncStorage.setItem(LS_KEY, JSON.stringify({ ...prev, ...updates }));
    });
  }, []);

  useEffect(() => {
    if (!rainbow) return;
    const id = setInterval(() => {
      rainbowIdxRef.current = (rainbowIdxRef.current + 1) % (RAINBOW_COLORS.length - 1);
      setRainbowColor(RAINBOW_COLORS[rainbowIdxRef.current]);
    }, 900);
    return () => clearInterval(id);
  }, [rainbow]);

  const accent = rainbow
    ? rainbowColor
    : perScreen
    ? PER_SCREEN_MAP[route]
    : baseAccent;

  const painted = paint || rainbow;
  const colors = buildColors(accent, painted);

  const setPaint = useCallback((v: boolean) => {
    setPaintState(v);
    persist({ paint: v });
  }, [persist]);

  const setRainbow = useCallback((v: boolean) => {
    setRainbowState(v);
    persist({ rainbow: v });
  }, [persist]);

  const setPerScreen = useCallback((v: boolean) => {
    setPerScreenState(v);
    persist({ perScreen: v });
  }, [persist]);

  const setBaseAccent = useCallback((hex: string) => {
    setBaseAccentState(hex);
    persist({ baseAccent: hex });
  }, [persist]);

  const setRoute = useCallback((key: RouteKey) => {
    setRouteState(key);
  }, []);

  return (
    <Ctx.Provider
      value={{
        accent,
        colors,
        paint,
        rainbow,
        perScreen,
        baseAccent,
        presetAccents: PRESET_ACCENTS,
        setPaint,
        setRainbow,
        setPerScreen,
        setBaseAccent,
        setRoute,
        currentRoute: route,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useTheme() {
  return useContext(Ctx);
}

export { PRESET_ACCENTS, PER_SCREEN_MAP };
