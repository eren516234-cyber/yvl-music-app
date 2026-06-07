import { ChevronDown, Pause, Play, SkipBack, SkipForward, Mic2, ListMusic } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePlayer, formatTime } from "@/lib/player";
import { fetchLyrics, type Lyrics } from "@/lib/lrclib";

export function FullPlayer() {
  const { current, expanded, expand, isPlaying, toggle, next, prev, position, duration, seek } = usePlayer();
  const [showLyrics, setShowLyrics] = useState(false);
  const [lyrics, setLyrics] = useState<Lyrics>(null);
  const [loadingL, setLoadingL] = useState(false);

  useEffect(() => {
    if (!current) return;
    setLyrics(null);
    setLoadingL(true);
    fetchLyrics(current.title, current.artist, current.duration)
      .then(setLyrics)
      .catch(() => setLyrics(null))
      .finally(() => setLoadingL(false));
  }, [current?.id]);

  const activeLine = useMemo(() => {
    if (!lyrics?.synced?.length) return -1;
    let lo = -1;
    for (let i = 0; i < lyrics.synced.length; i++) {
      if (lyrics.synced[i].time <= position) lo = i; else break;
    }
    return lo;
  }, [lyrics, position]);

  const scrollerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showLyrics || activeLine < 0) return;
    const el = scrollerRef.current?.querySelector<HTMLElement>(`[data-line="${activeLine}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeLine, showLyrics]);

  if (!current || !expanded) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "var(--background)" }}
    >
      <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col px-6 pb-8 pt-6">
        <header className="flex items-center justify-between">
          <button
            onClick={() => expand(false)}
            className="grid size-10 place-items-center rounded-full bg-secondary"
            aria-label="Collapse"
          >
            <ChevronDown className="size-5" />
          </button>
          <div className="text-center">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Playing from</div>
            <div className="text-xs font-semibold">YVL</div>
          </div>
          <button
            onClick={() => setShowLyrics((v) => !v)}
            className={`grid size-10 place-items-center rounded-full ${showLyrics ? "bg-accent text-accent-foreground" : "bg-secondary"}`}
            aria-label="Toggle lyrics"
          >
            {showLyrics ? <ListMusic className="size-5" /> : <Mic2 className="size-5" />}
          </button>
        </header>

        {!showLyrics ? (
          <div className="mt-10 flex flex-1 flex-col">
            <div className="relative mx-auto aspect-square w-full max-w-[340px] overflow-hidden rounded-3xl bg-secondary shadow-glow">
              {current.cover && <img src={current.cover} alt="" className="size-full object-cover" />}
            </div>
            <div className="mt-8 space-y-1">
              <h2 className="font-display text-3xl leading-tight">{current.title}</h2>
              <p className="text-base text-muted-foreground">{current.artist}</p>
            </div>
          </div>
        ) : (
          <div ref={scrollerRef} className="mt-8 flex-1 overflow-y-auto scrollbar-none">
            {loadingL && <p className="text-center text-muted-foreground">Loading lyrics…</p>}
            {!loadingL && lyrics?.synced?.length ? (
              <div className="space-y-5 py-[40vh]">
                {lyrics.synced.map((l, i) => (
                  <p
                    key={i}
                    data-line={i}
                    onClick={() => seek(l.time)}
                    className={`cursor-pointer font-display text-2xl leading-snug transition-all ${
                      i === activeLine ? "text-accent scale-105" : "text-foreground/30"
                    }`}
                  >
                    {l.text || "♪"}
                  </p>
                ))}
              </div>
            ) : !loadingL && lyrics?.plain ? (
              <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed text-foreground/80">{lyrics.plain}</pre>
            ) : !loadingL ? (
              <p className="text-center text-muted-foreground">No lyrics found on LrcLib.</p>
            ) : null}
          </div>
        )}

        {/* Progress + controls */}
        <div className="mt-6 space-y-3">
          <input
            type="range"
            min={0}
            max={Math.max(duration, 1)}
            step={0.1}
            value={Math.min(position, duration || 0)}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className="w-full accent-[var(--accent-hex)]"
            aria-label="Seek"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(position)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="flex items-center justify-center gap-8 pt-2">
            <button onClick={() => void prev()} aria-label="Previous"><SkipBack className="size-7" /></button>
            <button
              onClick={toggle}
              className="grid size-16 place-items-center rounded-full bg-accent text-accent-foreground shadow-glow"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="size-7" /> : <Play className="size-7 translate-x-[2px]" />}
            </button>
            <button onClick={() => void next()} aria-label="Next"><SkipForward className="size-7" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
