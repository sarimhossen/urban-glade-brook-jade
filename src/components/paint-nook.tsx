import { useEffect, useRef, useState } from "react";

const PIGMENTS = ["#14281c", "#1f7a45", "#7dba6a", "#d7e56c", "#f7fbf4", "#c46b4a", "#3d6f8c", "#e7b3c4"];

export function PaintNook({
  canSave,
  busy,
  onSave,
}: {
  canSave: boolean;
  busy: boolean;
  onSave: (dataUrl: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const undoRef = useRef<ImageData[]>([]);
  const drawing = useRef(false);
  const [color, setColor] = useState(PIGMENTS[1]);
  const [size, setSize] = useState(10);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#f7fbf4";
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, []);

  function ctxOf() {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    return { canvas, ctx };
  }

  function snapshot() {
    const pair = ctxOf();
    if (!pair) return;
    const data = pair.ctx.getImageData(0, 0, pair.canvas.width, pair.canvas.height);
    undoRef.current.push(data);
    if (undoRef.current.length > 8) undoRef.current.shift();
  }

  function point(event: React.PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function down(event: React.PointerEvent<HTMLCanvasElement>) {
    const pair = ctxOf();
    if (!pair) return;
    snapshot();
    event.currentTarget.setPointerCapture(event.pointerId);
    drawing.current = true;
    const p = point(event);
    pair.ctx.strokeStyle = color;
    pair.ctx.fillStyle = color;
    pair.ctx.lineWidth = size;
    pair.ctx.lineCap = "round";
    pair.ctx.lineJoin = "round";
    pair.ctx.beginPath();
    pair.ctx.arc(p.x, p.y, size / 2, 0, Math.PI * 2);
    pair.ctx.fill();
    pair.ctx.beginPath();
    pair.ctx.moveTo(p.x, p.y);
  }

  function move(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const pair = ctxOf();
    if (!pair) return;
    const p = point(event);
    pair.ctx.strokeStyle = color;
    pair.ctx.lineWidth = size;
    pair.ctx.lineCap = "round";
    pair.ctx.lineTo(p.x, p.y);
    pair.ctx.stroke();
    pair.ctx.beginPath();
    pair.ctx.moveTo(p.x, p.y);
  }

  function up() {
    drawing.current = false;
  }

  function undo() {
    const pair = ctxOf();
    const data = undoRef.current.pop();
    if (!pair || !data) return;
    pair.ctx.setTransform(1, 0, 0, 1, 0, 0);
    pair.ctx.putImageData(data, 0, 0);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    pair.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function clear() {
    const pair = ctxOf();
    if (!pair) return;
    snapshot();
    const rect = pair.canvas.getBoundingClientRect();
    pair.ctx.fillStyle = "#f7fbf4";
    pair.ctx.fillRect(0, 0, rect.width, rect.height);
  }

  function save() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onSave(canvas.toDataURL("image/jpeg", 0.85));
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {PIGMENTS.map((pigment) => (
          <button
            key={pigment}
            type="button"
            aria-label={`Paint color ${pigment}`}
            onClick={() => setColor(pigment)}
            className={`h-11 w-11 rounded-full border-2 ${color === pigment ? "border-ink" : "border-ink/15"}`}
            style={{ backgroundColor: pigment }}
          />
        ))}
        <label className="ml-auto flex items-center gap-2 text-sm text-ink/70">
          Brush
          <input
            type="range"
            min={4}
            max={36}
            value={size}
            onChange={(event) => setSize(Number(event.target.value))}
            className="w-24"
          />
        </label>
      </div>
      <canvas
        ref={canvasRef}
        className="h-80 w-full touch-none rounded-card border border-ink/10 bg-card"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      />
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-quiet" onClick={undo}>
          Undo
        </button>
        <button type="button" className="btn btn-quiet" onClick={clear}>
          Clear
        </button>
        <button type="button" className="btn btn-fern" disabled={busy} onClick={save}>
          {canSave ? "Save painting" : "Sign in to keep it"}
        </button>
      </div>
    </div>
  );
}
