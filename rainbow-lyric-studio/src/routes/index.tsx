import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Saavn, bestImage, primaryArtist, toTrack } from "@/lib/saavn";
import { SongRow } from "@/components/SongRow";
import { useRouteAccent } from "@/lib/theme";
import { usePlayer, formatTime } from "@/lib/player";
import { Play } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YVL — For you" },
      { name: "description", content: "Quick picks, new songs and curated mixes — streamed from JioSaavn with synced lyrics." },
    ],
  }),
  component: Home,
});

const TABS = [
  { key: "for-you",  label: "For you", query: "top hits 2026" },
  { key: "rock",     label: "Rock",    query: "rock hits" },
  { key: "hip-hop",  label: "Hip-hop", query: "hip hop hits" },
  { key: "k-pop",    label: "K-Pop",   query: "k-pop hits" },
  { key: "pop",      label: "Pop",     query: "pop hits" },
  { key: "bolly",    label: "Bolly",   query: "bollywood hits 2026" },
] as const;

function Home() {
  useRouteAccent("home");
  const [tab, setTab] = useState<typeof TABS[number]["key"]>("for-you");
  const active = TABS.find((t) => t.key === tab)!;

  const songsQ = useQuery({
    queryKey: ["home", "songs", active.query],
    queryFn: () => Saavn.searchSongs(active.query, 30).then((r) => r.results),
    staleTime: 5 * 60_000,
  });
  const albumsQ = useQuery({
    queryKey: ["home", "albums", active.query],
    queryFn: () => Saavn.searchAlbums(active.query, 12).then((r) => r.results),
    staleTime: 5 * 60_000,
  });

  const quick = (songsQ.data ?? []).slice(0, 5);
  const more = (songsQ.data ?? []).slice(5, 15);

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <div className="flex items-end justify-between">
          <h1 className="font-display text-5xl">YVL</h1>
          <div className="grid size-9 place-items-center rounded-full bg-accent font-display text-sm text-accent-foreground">
            E
          </div>
        </div>

        <div className="-mx-5 flex gap-2 overflow-x-auto scrollbar-none px-5">
          {TABS.map((t) => {
            const sel = t.key === tab;
            const count = t.key === tab ? songsQ.data?.length : undefined;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  sel ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
                {sel && count ? <span className="ml-1 text-xs opacity-60">{count}</span> : null}
              </button>
            );
          })}
        </div>
      </header>

      <section>
        <SectionHeader title="Quick picks" />
        {songsQ.isLoading && <SkeletonRows />}
        {songsQ.isError && <ErrorNote msg="Couldn’t load songs from JioSaavn." />}
        <div className="mt-3 space-y-1">
          {quick.map((s) => (
            <FeaturedRow key={s.id} song={s} queue={songsQ.data ?? []} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="New songs" />
        <div className="mt-3 -mx-5 flex gap-3 overflow-x-auto scrollbar-none px-5">
          {(albumsQ.data ?? []).map((a) => (
            <Link
              key={a.id}
              to="/album/$id"
              params={{ id: a.id }}
              className="w-44 shrink-0"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
                {bestImage(a.image) && <img src={bestImage(a.image)} alt="" className="size-full object-cover" />}
              </div>
              <div className="mt-2 truncate text-sm font-semibold">{a.name}</div>
              <div className="truncate text-xs text-muted-foreground">{primaryArtist(a)}</div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="More to play" />
        <div className="mt-3 space-y-1">
          {more.map((s) => (
            <SongRow key={s.id} song={s} queue={songsQ.data ?? []} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-end justify-between">
      <h2 className="font-display text-2xl">{title}</h2>
      <span className="text-sm text-muted-foreground">See all</span>
    </div>
  );
}

function FeaturedRow({ song, queue }: { song: import("@/lib/saavn").SaavnSong; queue: import("@/lib/saavn").SaavnSong[] }) {
  const { play, current, quality } = usePlayer();
  const isCurrent = current?.id === song.id;
  return (
    <button
      onClick={() => {
        const tracks = queue.map((s) => toTrack(s, quality));
        const idx = queue.findIndex((s) => s.id === song.id);
        void play(tracks, idx);
      }}
      className={`flex w-full items-center gap-3 rounded-2xl p-2 text-left transition-colors ${
        isCurrent ? "bg-card" : "hover:bg-secondary"
      }`}
    >
      <div className="size-14 shrink-0 overflow-hidden rounded-xl bg-secondary">
        {bestImage(song.image) && <img src={bestImage(song.image)} alt="" className="size-full object-cover" />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-base font-semibold">{song.name}</div>
        <div className="truncate text-xs text-muted-foreground">{primaryArtist(song)}</div>
      </div>
      <div className="text-xs text-muted-foreground">{formatTime(song.duration ?? 0)}</div>
      <div className="grid size-8 place-items-center rounded-full bg-accent text-accent-foreground">
        <Play className="size-3.5 translate-x-[1px]" />
      </div>
    </button>
  );
}

function SkeletonRows() {
  return (
    <div className="mt-3 space-y-2">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-3 rounded-2xl p-2">
          <div className="size-12 animate-pulse rounded-xl bg-secondary" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/2 animate-pulse rounded bg-secondary" />
            <div className="h-2 w-1/3 animate-pulse rounded bg-secondary" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ErrorNote({ msg }: { msg: string }) {
  return <p className="mt-3 rounded-2xl border border-border bg-card p-3 text-sm text-muted-foreground">{msg}</p>;
}
