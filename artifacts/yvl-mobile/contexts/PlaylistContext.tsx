import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const KEY = "yvl.playlists.v1";

export type PlaylistTrack = {
  id: string;
  title: string;
  artist: string;
  cover?: string;
};

export type Playlist = {
  id: string;
  name: string;
  createdAt: number;
  tracks: PlaylistTrack[];
};

type PlaylistCtx = {
  playlists: Playlist[];
  createPlaylist: (name: string) => Playlist;
  deletePlaylist: (id: string) => void;
  renamePlaylist: (id: string, name: string) => void;
  addToPlaylist: (playlistId: string, track: PlaylistTrack) => void;
  removeFromPlaylist: (playlistId: string, trackId: string) => void;
};

const Ctx = createContext<PlaylistCtx>({
  playlists: [],
  createPlaylist: () => ({ id: "", name: "", createdAt: 0, tracks: [] }),
  deletePlaylist: () => {},
  renamePlaylist: () => {},
  addToPlaylist: () => {},
  removeFromPlaylist: () => {},
});

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((raw) => {
      if (!raw) return;
      try {
        setPlaylists(JSON.parse(raw) as Playlist[]);
      } catch {}
    });
  }, []);

  function save(pls: Playlist[]) {
    setPlaylists(pls);
    AsyncStorage.setItem(KEY, JSON.stringify(pls));
  }

  const createPlaylist = useCallback((name: string): Playlist => {
    const pl: Playlist = {
      id: `pl_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: name.trim() || "Untitled playlist",
      createdAt: Date.now(),
      tracks: [],
    };
    setPlaylists((prev) => {
      const next = [pl, ...prev];
      AsyncStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
    return pl;
  }, []);

  const deletePlaylist = useCallback((id: string) => {
    setPlaylists((prev) => {
      const next = prev.filter((p) => p.id !== id);
      AsyncStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const renamePlaylist = useCallback((id: string, name: string) => {
    setPlaylists((prev) => {
      const next = prev.map((p) =>
        p.id === id ? { ...p, name: name.trim() || p.name } : p,
      );
      AsyncStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const addToPlaylist = useCallback(
    (playlistId: string, track: PlaylistTrack) => {
      setPlaylists((prev) => {
        const next = prev.map((p) => {
          if (p.id !== playlistId) return p;
          if (p.tracks.some((t) => t.id === track.id)) return p;
          return { ...p, tracks: [...p.tracks, track] };
        });
        AsyncStorage.setItem(KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const removeFromPlaylist = useCallback(
    (playlistId: string, trackId: string) => {
      setPlaylists((prev) => {
        const next = prev.map((p) =>
          p.id === playlistId
            ? { ...p, tracks: p.tracks.filter((t) => t.id !== trackId) }
            : p,
        );
        AsyncStorage.setItem(KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  return (
    <Ctx.Provider
      value={{
        playlists,
        createPlaylist,
        deletePlaylist,
        renamePlaylist,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function usePlaylists() {
  return useContext(Ctx);
}
