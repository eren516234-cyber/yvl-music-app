import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  color: string;
  color2: string;
}

export const SONGS: Song[] = [
  { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', color: '#FF3B30', color2: '#8B0000' },
  { id: '2', title: 'As It Was', artist: 'Harry Styles', album: "Harry's House", duration: '2:37', color: '#0A84FF', color2: '#003A7A' },
  { id: '3', title: 'Flowers', artist: 'Miley Cyrus', album: 'Endless Summer Vacation', duration: '3:21', color: '#30D158', color2: '#005A20' },
  { id: '4', title: 'Anti-Hero', artist: 'Taylor Swift', album: 'Midnights', duration: '3:21', color: '#BF5AF2', color2: '#5A0080' },
  { id: '5', title: 'Unholy', artist: 'Sam Smith', album: 'Gloria', duration: '2:36', color: '#FF9F0A', color2: '#7A4000' },
  { id: '6', title: 'Calm Down', artist: 'Rema & Selena', album: 'Rave & Roses', duration: '3:59', color: '#FF375F', color2: '#7A0020' },
  { id: '7', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23', color: '#64D2FF', color2: '#003A5A' },
  { id: '8', title: 'Stay', artist: 'Kid LAROI & Bieber', album: 'F*CK LOVE 3', duration: '2:21', color: '#FF6B35', color2: '#7A2000' },
];

export const PLAYLISTS = [
  { id: 'p1', name: 'Chill Vibes', count: 24, color: '#BF5AF2' },
  { id: 'p2', name: 'Workout Hits', count: 18, color: '#30D158' },
  { id: 'p3', name: 'Late Night', count: 32, color: '#0A84FF' },
  { id: 'p4', name: 'Morning Rise', count: 15, color: '#FF9F0A' },
];

interface MusicContextType {
  currentSong: Song | null;
  setCurrentSong: (s: Song) => void;
  isPlaying: boolean;
  togglePlay: () => void;
  likedSongs: string[];
  toggleLike: (id: string) => void;
  downloadedSongs: string[];
  downloadProgress: Record<string, number>;
  downloadSong: (song: Song) => void;
  downloadPlaylist: (playlistId: string) => void;
  downloadingPlaylist: string | null;
}

const MusicContext = createContext<MusicContextType>({
  currentSong: null,
  setCurrentSong: () => {},
  isPlaying: false,
  togglePlay: () => {},
  likedSongs: [],
  toggleLike: () => {},
  downloadedSongs: [],
  downloadProgress: {},
  downloadSong: () => {},
  downloadPlaylist: () => {},
  downloadingPlaylist: null,
});

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSongState] = useState<Song | null>(SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const [downloadedSongs, setDownloadedSongs] = useState<string[]>([]);
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});
  const [downloadingPlaylist, setDownloadingPlaylist] = useState<string | null>(null);
  const timersRef = useRef<Record<string, ReturnType<typeof setInterval>>>({});

  useEffect(() => {
    AsyncStorage.multiGet(['liked', 'downloaded']).then((vals) => {
      try {
        if (vals[0][1]) setLikedSongs(JSON.parse(vals[0][1]));
        if (vals[1][1]) setDownloadedSongs(JSON.parse(vals[1][1]));
      } catch {}
    });
    return () => { Object.values(timersRef.current).forEach(clearInterval); };
  }, []);

  const setCurrentSong = (s: Song) => {
    setCurrentSongState(s);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying((p) => !p);

  const toggleLike = (id: string) => {
    setLikedSongs((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      AsyncStorage.setItem('liked', JSON.stringify(next));
      return next;
    });
  };

  const downloadSong = (song: Song) => {
    if (downloadedSongs.includes(song.id) || downloadProgress[song.id] !== undefined) return;
    setDownloadProgress((p) => ({ ...p, [song.id]: 0 }));
    let progress = 0;
    timersRef.current[song.id] = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timersRef.current[song.id]);
        setDownloadProgress((p) => {
          const next = { ...p };
          delete next[song.id];
          return next;
        });
        setDownloadedSongs((prev) => {
          const next = [...prev, song.id];
          AsyncStorage.setItem('downloaded', JSON.stringify(next));
          return next;
        });
      } else {
        setDownloadProgress((p) => ({ ...p, [song.id]: Math.min(progress, 99) }));
      }
    }, 200);
  };

  const downloadPlaylist = (playlistId: string) => {
    setDownloadingPlaylist(playlistId);
    const subset = SONGS.slice(0, 4);
    subset.forEach((s) => downloadSong(s));
    setTimeout(() => setDownloadingPlaylist(null), 5000);
  };

  return (
    <MusicContext.Provider value={{
      currentSong, setCurrentSong,
      isPlaying, togglePlay,
      likedSongs, toggleLike,
      downloadedSongs, downloadProgress,
      downloadSong, downloadPlaylist, downloadingPlaylist,
    }}>
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
