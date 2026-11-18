import { useState } from "react";
import type { Dive, JournalInfo } from "@/lib/journal";

const FREQS = [82.41, 110, 146.83, 196, 246.94, 329.63];

function playRiff(extra: string) {
  let hits: { i: number; t: number }[] = [];
  try {
    const parsed = JSON.parse(extra) as { i: number; t: number }[];
    if (!Array.isArray(parsed)) return;
    hits = parsed;
  } catch {
    return;
  }
  const ctx = new AudioContext();
  for (const hit of hits) {
    const freq = FREQS[hit.i];
    if (!freq) continue;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    const when = ctx.currentTime + hit.t / 1000;
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(0.16, when + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.9);
    osc.connect(gain).connect(ctx.destination);
    osc.start(when);
    osc.stop(when + 1);
  }
}

export function DiveBook({
  dives,
  journal,
  pendingRemove,
  onRemove,
}: {
  dives: Dive[];
  journal: JournalInfo;
  pendingRemove: string | null;
  onRemove: (id: string) => void;
}) {
  const [armed, setArmed] = useState<string | null>(null);

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <h2 className="font-display text-3xl">The book</h2>
        <p className="text-sm text-ink/70">{dives.length === 0 ? "Nothing yet" : `${dives.length} dives`}</p>
      </div>
      {dives.length === 0 ? (
        <p className="rounded-card border border-ink/10 bg-card px-4 py-6 text-ink/80">
          The book is still blank. Paint something, pluck a string, or drop in a photo from today.
        </p>
      ) : (
        <ol className="space-y-4 border-l-2 border-fern/30 pl-4">
          {dives.map((dive) => {
            const who = dive.voice === "me" ? journal.myName : journal.sisterName;
            return (
              <li key={dive.id} className="rounded-card border border-ink/10 bg-card p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      dive.voice === "me" ? "bg-fern text-card" : "bg-sap text-ink"
                    }`}
                  >
                    {who}
                  </span>
                  <span className="text-xs font-semibold tracking-wide text-ink/60 uppercase">{dive.kind}</span>
                  {!dive.shared && <span className="text-xs font-semibold text-ink/60">Only you</span>}
                </div>
                <h3 className="mt-2 font-display text-2xl">{dive.title}</h3>
                {dive.body && <p className="mt-1 text-ink/80">{dive.body}</p>}
                {dive.media && dive.kind === "video" && (
                  <video className="mt-3 w-full rounded-xl" controls playsInline src={dive.media} />
                )}
                {dive.media && (dive.kind === "photo" || dive.kind === "painting") && (
                  <img className="mt-3 w-full rounded-xl" alt={dive.title} src={dive.media} />
                )}
                {dive.media && dive.kind === "audio" && (
                  <audio className="mt-3 w-full" controls src={dive.media} />
                )}
                {dive.kind === "riff" && dive.extra && (
                  <button type="button" className="btn btn-sap mt-3" onClick={() => playRiff(dive.extra ?? "")}>
                    Play riff
                  </button>
                )}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <time className="text-sm text-ink/60" dateTime={dive.createdAt} suppressHydrationWarning>
                    {new Date(dive.createdAt).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </time>
                  {dive.mine &&
                    (armed === dive.id ? (
                      <span className="flex gap-2">
                        <button
                          type="button"
                          className="btn btn-quiet"
                          disabled={pendingRemove === dive.id}
                          onClick={() => onRemove(dive.id)}
                        >
                          Remove
                        </button>
                        <button type="button" className="btn btn-quiet" onClick={() => setArmed(null)}>
                          Keep
                        </button>
                      </span>
                    ) : (
                      <button type="button" className="text-sm font-semibold text-ink/70" onClick={() => setArmed(dive.id)}>
                        Remove
                      </button>
                    ))}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
