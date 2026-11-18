import { useEffect, useRef, useState } from "react";

const STRINGS = [
  { name: "Low E", freq: 82.41 },
  { name: "A", freq: 110 },
  { name: "D", freq: 146.83 },
  { name: "G", freq: 196 },
  { name: "B", freq: 246.94 },
  { name: "High E", freq: 329.63 },
];

const PATTERNS: { name: string; notes: number[] }[] = [
  { name: "Walk", notes: [0, 1, 2, 3, 4, 5] },
  { name: "Bright", notes: [5, 3, 4, 2, 4, 5] },
  { name: "Moss", notes: [0, 2, 4, 2, 1, 0] },
];

type Hit = { i: number; t: number };

export function StringBench({
  canSave,
  busy,
  onSave,
}: {
  canSave: boolean;
  busy: boolean;
  onSave: (hits: Hit[]) => void;
}) {
  const ctxRef = useRef<AudioContext | null>(null);
  const [pulse, setPulse] = useState<number[]>(() => STRINGS.map(() => 0));
  const [recording, setRecording] = useState(false);
  const [hits, setHits] = useState<Hit[]>([]);
  const started = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      void ctxRef.current?.close();
    };
  }, []);

  function audio() {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }

  function pluck(index: number, fromPlayback = false) {
    const string = STRINGS[index];
    if (!string) return;
    const ctx = audio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = string.freq;
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.05);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.1);
    setPulse((prev) => prev.map((n, i) => (i === index ? n + 1 : n)));
    if (recording && !fromPlayback) {
      const t = Math.round(performance.now() - started.current);
      setHits((prev) => (prev.length >= 48 ? prev : [...prev, { i: index, t }]));
    }
  }

  function playHits(next: Hit[]) {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = next.map((hit) => window.setTimeout(() => pluck(hit.i, true), hit.t));
  }

  function playPattern(notes: number[]) {
    const sequence = notes.map((i, step) => ({ i, t: step * 180 }));
    playHits(sequence);
    if (recording) {
      const base = Math.round(performance.now() - started.current);
      setHits((prev) => {
        const added = sequence.map((hit) => ({ i: hit.i, t: base + hit.t }));
        return [...prev, ...added].slice(0, 48);
      });
    }
  }

  function toggleRecord() {
    if (recording) {
      setRecording(false);
      return;
    }
    setHits([]);
    started.current = performance.now();
    setRecording(true);
    window.setTimeout(() => setRecording(false), 12_000);
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {STRINGS.map((string, index) => (
          <button
            key={string.name}
            type="button"
            onClick={() => pluck(index)}
            className="flex min-h-12 w-full items-center gap-3 rounded-full border border-ink/10 bg-card px-4 text-left"
          >
            <span className="w-16 text-sm font-semibold">{string.name}</span>
            <span
              key={pulse[index]}
              className="h-1 flex-1 origin-center rounded-full bg-fern motion-safe:animate-[pluck_280ms_ease-out]"
            />
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {PATTERNS.map((pattern) => (
          <button
            key={pattern.name}
            type="button"
            className="btn btn-quiet"
            onClick={() => playPattern(pattern.notes)}
          >
            {pattern.name}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={recording ? "btn btn-sap" : "btn btn-quiet"} onClick={toggleRecord}>
          {recording ? "Stop riff" : "Record a riff"}
        </button>
        <button type="button" className="btn btn-quiet" disabled={hits.length === 0} onClick={() => playHits(hits)}>
          Play it back
        </button>
        <button
          type="button"
          className="btn btn-fern"
          disabled={busy || hits.length === 0}
          onClick={() => onSave(hits)}
        >
          {canSave ? "Save riff" : "Sign in to keep it"}
        </button>
      </div>
      <p className="text-sm text-ink/70">
        {recording
          ? "Recording… pluck away. It stops itself after 12 seconds."
          : hits.length
            ? `${hits.length} notes ready.`
            : "Tap a string. Low E is the thick one."}
      </p>
      <style>{`@keyframes pluck { 0% { transform: scaleY(1); } 35% { transform: scaleY(4); } 100% { transform: scaleY(1); } }`}</style>
    </div>
  );
}
