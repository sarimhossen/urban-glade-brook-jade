import { useEffect, useRef, useState } from "react";

type Drop = { x: number; y: number; r: number; vy: number; color: string };

const COLORS = ["#1f7a45", "#d7e56c", "#c46b4a", "#3d6f8c", "#e7b3c4"];
const BEST_KEY = "daily-dive.best";

export function SplatRun({
  canSave,
  busy,
  onSave,
}: {
  canSave: boolean;
  busy: boolean;
  onSave: (score: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const state = useRef({
    running: false,
    over: false,
    score: 0,
    lives: 3,
    pick: 0.5,
    drops: [] as Drop[],
    last: 0,
    spawn: 0,
  });
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [running, setRunning] = useState(false);
  const [over, setOver] = useState(false);
  const [best, setBest] = useState(0);

  useEffect(() => {
    const saved = Number(localStorage.getItem(BEST_KEY) || 0);
    if (Number.isFinite(saved)) setBest(saved);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let frame = 0;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
    }
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function loop(now: number) {
      frame = requestAnimationFrame(loop);
      if (!canvas || !ctx) return;
      const game = state.current;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#e7f2e1";
      ctx.fillRect(0, 0, w, h);

      if (game.running) {
        const dt = Math.min(32, now - (game.last || now));
        game.last = now;
        game.spawn += dt;
        const every = reduced ? 900 : 620;
        if (game.spawn > every && game.drops.length < 10) {
          game.spawn = 0;
          game.drops.push({
            x: 24 + Math.random() * (w - 48),
            y: -10,
            r: 10 + Math.random() * 10,
            vy: (reduced ? 0.08 : 0.16) + Math.random() * 0.12,
            color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? COLORS[0],
          });
        }
        const next: Drop[] = [];
        for (const drop of game.drops) {
          drop.y += drop.vy * dt;
          const pickX = game.pick * w;
          const caught = drop.y > h - 46 && Math.abs(drop.x - pickX) < 26 + drop.r;
          if (caught) {
            game.score += 1;
            setScore(game.score);
            continue;
          }
          if (drop.y > h + 8) {
            game.lives -= 1;
            setLives(game.lives);
            if (game.lives <= 0) {
              game.running = false;
              game.over = true;
              setRunning(false);
              setOver(true);
              setBest((prev) => {
                const nextBest = Math.max(prev, game.score);
                localStorage.setItem(BEST_KEY, String(nextBest));
                return nextBest;
              });
            }
            continue;
          }
          next.push(drop);
        }
        game.drops = next;
      }

      for (const drop of game.drops) {
        ctx.beginPath();
        ctx.fillStyle = drop.color;
        ctx.arc(drop.x, drop.y, drop.r, 0, Math.PI * 2);
        ctx.fill();
      }
      const pickX = game.pick * w;
      ctx.fillStyle = "#14281c";
      ctx.beginPath();
      ctx.moveTo(pickX, h - 18);
      ctx.lineTo(pickX - 18, h - 46);
      ctx.lineTo(pickX + 18, h - 46);
      ctx.closePath();
      ctx.fill();
    }
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  function moveTo(clientX: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    state.current.pick = Math.min(0.92, Math.max(0.08, ratio));
  }

  function nudge(dir: number) {
    state.current.pick = Math.min(0.92, Math.max(0.08, state.current.pick + dir * 0.08));
  }

  function start() {
    state.current = {
      running: true,
      over: false,
      score: 0,
      lives: 3,
      pick: 0.5,
      drops: [],
      last: 0,
      spawn: 0,
    };
    setScore(0);
    setLives(3);
    setOver(false);
    setRunning(true);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm font-semibold">
        <span className="tabular-nums">Score {score}</span>
        <span className="tabular-nums">Best {best}</span>
        <span aria-label={`${lives} lives left`}>{"●".repeat(Math.max(0, lives))}</span>
      </div>
      <div ref={wrapRef} className="relative">
        <canvas
          ref={canvasRef}
          className="h-80 w-full touch-none rounded-card border border-ink/10"
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            moveTo(event.clientX);
          }}
          onPointerMove={(event) => {
            if (event.buttons || event.currentTarget.hasPointerCapture(event.pointerId)) {
              moveTo(event.clientX);
            }
          }}
        />
        {!running && (
          <div className="absolute inset-0 grid place-items-center p-4">
            <div className="max-w-xs rounded-card bg-card px-4 py-4 text-center">
              <p className="font-display text-2xl">{over ? "Nice run" : "Splat run"}</p>
              <p className="mt-1 text-sm text-ink/70">
                {over ? `You caught ${score}.` : "Drag the pick. Catch the drips before they hit the grass."}
              </p>
              <button type="button" className="btn btn-fern mt-3 w-full" onClick={start}>
                {over ? "Play again" : "Play"}
              </button>
              {over && canSave && score > 0 && (
                <button
                  type="button"
                  className="btn btn-quiet mt-2 w-full"
                  disabled={busy}
                  onClick={() => onSave(score)}
                >
                  Pin this score
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" className="btn btn-quiet" onClick={() => nudge(-1)}>
          Left
        </button>
        <button type="button" className="btn btn-quiet" onClick={() => nudge(1)}>
          Right
        </button>
      </div>
    </div>
  );
}
