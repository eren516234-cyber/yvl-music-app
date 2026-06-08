import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const KEY = "yvl.likes.v1";

type LikesCtx = {
  liked: Set<string>;
  isLiked: (id: string) => boolean;
  toggleLike: (id: string) => void;
};

const Ctx = createContext<LikesCtx>({
  liked: new Set(),
  isLiked: () => false,
  toggleLike: () => {},
});

export function LikesProvider({ children }: { children: React.ReactNode }) {
  const [liked, setLiked] = useState<Set<string>>(new Set());

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((raw) => {
      if (!raw) return;
      try {
        setLiked(new Set(JSON.parse(raw) as string[]));
      } catch {}
    });
  }, []);

  const toggleLike = useCallback((id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      AsyncStorage.setItem(KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const isLiked = useCallback((id: string) => liked.has(id), [liked]);

  return (
    <Ctx.Provider value={{ liked, isLiked, toggleLike }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLikes() {
  return useContext(Ctx);
}
