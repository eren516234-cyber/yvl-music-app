import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { usePlayer } from "@/lib/player";
import { toTrack, type SaavnSong } from "@/lib/saavn";
import { formatTime } from "@/lib/player";

export function SongRow({ song, queue }: { song: SaavnSong; queue: SaavnSong[] }) {
  const { play, current, isPlaying, quality } = usePlayer();
  const tr = toTrack(song, quality);
  const playing = current?.id === song.id && isPlaying;

  return (
    <div className="group flex items-center gap-3 rounded-2xl p-2 hover:bg-secondary">
      <button
        onClick={() => {
          const tracks = queue.map((s) => toTrack(s, quality));
          const idx = queue.findIndex((s) => s.id === song.id);
          void play(tracks, idx);
        }}
        className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-secondary"
        aria-label="Play"
      >
        {tr.cover ? <img src={tr.cover} alt="" className="size-full object-cover" /> : null}
        <div className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          {playing ? <Equalizer /> : <Play className="size-5 text-white" />}
        </div>
      </button>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{song.name}</div>
        <div className="truncate text-xs text-muted-foreground">
          {song.artists?.primary?.map((a, i) => (
            <span key={a.id}>
              {i > 0 ? ", " : ""}
              {song.artists?.primary?.[i].id ? (
                <Link to="/artist/$id" params={{ id: a.id }} className="hover:underline">
                  {a.name}
                </Link>
              ) : a.name}
            </span>
          ))}
        </div>
      </div>
      <div className="text-xs text-muted-foreground">{formatTime(song.duration ?? 0)}</div>
    </div>
  );
}

function Equalizer() {
  return (
    <div className="flex items-end gap-[3px] h-4">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-[3px] origin-bottom bg-accent"
          style={{ height: "100%", animation: `equalizer 0.9s ${i * 0.15}s ease-in-out infinite` }}
        />
      ))}
    </div>
  );
}
