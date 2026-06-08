import { Audio, type AVPlaybackStatus } from "expo-av";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Track } from "@/lib/saavn";
import { Saavn, toTrack } from "@/lib/saavn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QUALITY_KEY = "yvl.quality";

type PlayerState = {
  queue: Track[];
  index: number;
  current?: Track;
  isPlaying: boolean;
  position: number;
  duration: number;
  expanded: boolean;
  quality: string;
  play: (tracks: Track[], startIndex?: number) => Promise<void>;
  toggle: () => Promise<void>;
  next: () => Promise<void>;
  prev: () => Promise<void>;
  seek: (t: number) => Promise<void>;
  expand: (v: boolean) => void;
  setQuality: (q: string) => void;
};

const Ctx = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [quality, setQualityState] = useState("320kbps");
  const indexRef = useRef(0);
  const queueRef = useRef<Track[]>([]);
  const qualityRef = useRef("320kbps");

  useEffect(() => {
    AsyncStorage.getItem(QUALITY_KEY).then((q) => {
      if (q) { setQualityState(q); qualityRef.current = q; }
    });
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });
  }, []);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);

  function onPlaybackStatus(status: AVPlaybackStatus) {
    if (!status.isLoaded) return;
    setPosition((status.positionMillis ?? 0) / 1000);
    setDuration((status.durationMillis ?? 0) / 1000);
    setIsPlaying(status.isPlaying);
    if (status.didJustFinish) {
      void goToIndex(indexRef.current + 1, queueRef.current);
    }
  }

  async function unloadCurrent() {
    if (soundRef.current) {
      try { await soundRef.current.unloadAsync(); } catch {}
      soundRef.current = null;
    }
  }

  async function loadAt(i: number, q: Track[]) {
    const track = q[i];
    if (!track) return;

    let streamUrl = track.stream;
    if (!streamUrl) {
      try {
        const full = await Saavn.song(track.id);
        const t = toTrack(full, qualityRef.current);
        streamUrl = t.stream;
        track.stream = streamUrl;
        track.duration = track.duration || t.duration;
        track.cover = track.cover || t.cover;
      } catch {
        return;
      }
    }
    if (!streamUrl) return;

    await unloadCurrent();

    const { sound } = await Audio.Sound.createAsync(
      { uri: streamUrl },
      { shouldPlay: true, progressUpdateIntervalMillis: 500 },
      onPlaybackStatus,
    );
    soundRef.current = sound;
    setIsPlaying(true);
    setPosition(0);
  }

  async function goToIndex(i: number, q: Track[]) {
    if (i < 0 || i >= q.length) return;
    setIndex(i);
    indexRef.current = i;
    await loadAt(i, q);
  }

  const play = useCallback(async (tracks: Track[], startIndex = 0) => {
    const q = [...tracks];
    setQueue(q);
    queueRef.current = q;
    setIndex(startIndex);
    indexRef.current = startIndex;
    setExpanded(true);
    await loadAt(startIndex, q);
  }, []);

  const toggle = useCallback(async () => {
    if (!soundRef.current) return;
    const status = await soundRef.current.getStatusAsync();
    if (!status.isLoaded) return;
    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
  }, []);

  const next = useCallback(async () => {
    await goToIndex(indexRef.current + 1, queueRef.current);
  }, []);

  const prev = useCallback(async () => {
    if (position > 3) {
      await soundRef.current?.setPositionAsync(0);
    } else {
      await goToIndex(indexRef.current - 1, queueRef.current);
    }
  }, [position]);

  const seek = useCallback(async (t: number) => {
    await soundRef.current?.setPositionAsync(t * 1000);
    setPosition(t);
  }, []);

  const expand = useCallback((v: boolean) => setExpanded(v), []);

  const setQuality = useCallback((q: string) => {
    setQualityState(q);
    qualityRef.current = q;
    AsyncStorage.setItem(QUALITY_KEY, q);
  }, []);

  const current = queue[index];

  return (
    <Ctx.Provider
      value={{
        queue,
        index,
        current,
        isPlaying,
        position,
        duration,
        expanded,
        quality,
        play,
        toggle,
        next,
        prev,
        seek,
        expand,
        setQuality,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function usePlayer(): PlayerState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
