type Mode = "paint" | "strings" | "play";

export function Clearing({
  prompt,
  onPick,
}: {
  prompt: string;
  onPick: (mode: Mode) => void;
}) {
  return (
    <section className="overflow-hidden rounded-card border border-ink/10 bg-card">
      <div className="relative">
        <svg viewBox="0 0 640 280" className="block h-auto w-full" aria-hidden="true">
          <rect width="640" height="280" className="fill-bg" />
          <circle cx="530" cy="64" r="36" className="fill-sap" />
          <ellipse cx="180" cy="250" rx="240" ry="80" className="fill-fern/25" />
          <ellipse cx="460" cy="268" rx="280" ry="96" className="fill-fern" />
          <path
            d="M250 280 C 280 230, 300 210, 340 168"
            fill="none"
            className="stroke-card"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <g transform="translate(108 108)">
            <path d="M48 62 L 18 128" className="stroke-ink" strokeWidth="4" strokeLinecap="round" />
            <path d="M48 62 L 86 128" className="stroke-ink" strokeWidth="4" strokeLinecap="round" />
            <rect x="12" y="8" width="74" height="56" rx="4" className="fill-card stroke-ink" strokeWidth="3" />
            <path
              d="M22 46 C 36 22, 52 36, 74 18"
              fill="none"
              className="stroke-fern"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="30" cy="22" r="4" className="fill-sap" />
          </g>
          <g transform="translate(430 96)">
            <rect x="46" y="0" width="8" height="78" rx="3" className="fill-ink" />
            <ellipse cx="50" cy="104" rx="40" ry="30" className="fill-ink" />
            <circle cx="50" cy="104" r="10" className="fill-card" />
            <path d="M48 8 V 78" className="stroke-sap" strokeWidth="1.5" />
            <path d="M52 8 V 78" className="stroke-sap" strokeWidth="1.5" />
          </g>
          <circle cx="300" cy="78" r="8" className="fill-sap" />
          <circle cx="322" cy="64" r="5" className="fill-card" />
          <circle cx="286" cy="58" r="4" className="fill-fern" />
        </svg>
        <p className="absolute top-4 left-4 max-w-56 rounded-full bg-card/90 px-3 py-1 text-sm font-medium text-ink">
          Today: {prompt}
        </p>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-3">
        <Door
          kicker="Paint"
          title="Paint nook"
          detail="A canvas for your sister."
          tone="sap"
          onClick={() => onPick("paint")}
        />
        <Door
          kicker="Guitar"
          title="String bench"
          detail="Six strings you can actually play."
          tone="fern"
          onClick={() => onPick("strings")}
        />
        <Door
          kicker="Game"
          title="Splat run"
          detail="Catch drips with a guitar pick."
          tone="quiet"
          onClick={() => onPick("play")}
        />
      </div>
    </section>
  );
}

function Door({
  kicker,
  title,
  detail,
  tone,
  onClick,
}: {
  kicker: string;
  title: string;
  detail: string;
  tone: "sap" | "fern" | "quiet";
  onClick: () => void;
}) {
  const toneClass =
    tone === "sap" ? "bg-sap text-ink" : tone === "fern" ? "bg-fern text-card" : "bg-bg text-ink";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-24 rounded-2xl px-4 py-3 text-left ${toneClass}`}
    >
      <span className="block text-xs font-semibold tracking-wide uppercase opacity-80">{kicker}</span>
      <span className="mt-1 block font-display text-2xl leading-none">{title}</span>
      <span className="mt-2 block text-sm opacity-80">{detail}</span>
    </button>
  );
}
