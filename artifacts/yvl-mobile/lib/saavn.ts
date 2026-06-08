const BASES = ["https://saavn.dev/api", "https://meloapi.vercel.app/api"];

export function decodeHtml(s: string): string {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'");
}

export type SaavnImage = { quality: string; url: string };
export type SaavnDownloadUrl = { quality: string; url: string };
export type SaavnArtistMini = { id: string; name: string; image?: SaavnImage[] };
export type SaavnSong = {
  id: string;
  name: string;
  duration?: number;
  explicitContent?: boolean;
  playCount?: number;
  album?: { id?: string; name?: string };
  artists?: {
    primary?: SaavnArtistMini[];
    featured?: SaavnArtistMini[];
    all?: SaavnArtistMini[];
  };
  image?: SaavnImage[];
  downloadUrl?: SaavnDownloadUrl[];
};
export type SaavnAlbum = {
  id: string;
  name: string;
  year?: string;
  songCount?: number;
  image?: SaavnImage[];
  artists?: { primary?: SaavnArtistMini[]; all?: SaavnArtistMini[] };
  songs?: SaavnSong[];
};
export type SaavnArtist = {
  id: string;
  name: string;
  image?: SaavnImage[];
  followerCount?: number;
  topSongs?: SaavnSong[];
  topAlbums?: SaavnAlbum[];
};

export type Track = {
  id: string;
  title: string;
  artist: string;
  cover?: string;
  stream?: string;
  duration?: number;
};

export function bestImage(images?: SaavnImage[]): string | undefined {
  if (!images?.length) return undefined;
  const order = ["500x500", "high", "large", "medium", "150x150", "low"];
  for (const q of order) {
    const hit = images.find((i) => i.quality === q || i.quality.includes(q));
    if (hit) return hit.url?.replace("http://", "https://");
  }
  return images[images.length - 1]?.url?.replace("http://", "https://");
}

export function bestStream(
  urls?: SaavnDownloadUrl[],
  preferred = "320kbps",
): string | undefined {
  if (!urls?.length) return undefined;
  const pick =
    urls.find((u) => u.quality?.toLowerCase() === preferred.toLowerCase())?.url ??
    urls.find((u) => u.quality?.toLowerCase() === "320kbps")?.url ??
    urls.find((u) => u.quality?.toLowerCase() === "160kbps")?.url ??
    urls[urls.length - 1]?.url;
  return pick?.replace("http://", "https://");
}

export function primaryArtist(song?: SaavnSong | SaavnAlbum): string {
  return (
    (song as SaavnSong)?.artists?.primary?.[0]?.name ??
    song?.artists?.all?.[0]?.name ??
    "Unknown"
  );
}

export function toTrack(song: SaavnSong, quality = "320kbps"): Track {
  return {
    id: song.id,
    title: decodeHtml(song.name),
    artist: decodeHtml(primaryArtist(song)),
    cover: bestImage(song.image),
    stream: bestStream(song.downloadUrl, quality),
    duration: song.duration,
  };
}

async function get<T>(
  path: string,
  params: Record<string, string | number> = {},
): Promise<T> {
  let lastErr: unknown;
  for (const base of BASES) {
    try {
      const url = new URL(`${base}${path}`);
      for (const [k, v] of Object.entries(params))
        url.searchParams.set(k, String(v));
      const res = await fetch(url.toString(), {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const body = (await res.json()) as { success?: boolean; data: T };
      if (body.success === false) throw new Error("success=false");
      return body.data;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("All API bases failed");
}

export const Saavn = {
  searchSongs: (q: string, limit = 20) =>
    get<{ results: SaavnSong[]; total: number }>("/search/songs", {
      query: q,
      limit,
    }),
  searchAlbums: (q: string, limit = 20) =>
    get<{ results: SaavnAlbum[]; total: number }>("/search/albums", {
      query: q,
      limit,
    }),
  searchArtists: (q: string, limit = 10) =>
    get<{ results: SaavnArtist[]; total: number }>("/search/artists", {
      query: q,
      limit,
    }),
  song: (id: string) => get<SaavnSong>("/songs", { ids: id }).then((d) => (Array.isArray(d) ? d[0] : d)),
  album: (id: string) => get<SaavnAlbum>("/albums", { albumId: id }),
  artist: (id: string) =>
    get<SaavnArtist>("/artists", { artistId: id, songCount: 20, albumCount: 10 }),
};
