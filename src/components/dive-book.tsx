import { useEffect, useState } from "react";
import type { Dive, JournalInfo } from "@/lib/journal";

const FREQS = [82.41, 110, 146.83, 196, 246.94, 329.63];
const COMMENTER_KEY = "daily-dive.commenterName";

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
  canModerate,
  pendingRemove,
  onRemove,
  onComment,
  onRemoveComment,
}: {
  dives: Dive[];
  journal: JournalInfo;
  canModerate: boolean;
  pendingRemove: string | null;
  onRemove: (id: string) => void;
  onComment: (input: { diveId: string; authorName: string; body: string }) => Promise<void>;
  onRemoveComment: (commentId: string) => Promise<void>;
}) {
  const [armed, setArmed] = useState<string | null>(null);
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [commenterName, setCommenterName] = useState("");
  const [commentBodies, setCommentBodies] = useState<Record<string, string>>({});
  const [commentBusy, setCommentBusy] = useState<string | null>(null);
  const [commentError, setCommentError] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem(COMMENTER_KEY);
    if (saved) setCommenterName(saved);
  }, []);

  function updateName(value: string) {
    setCommenterName(value);
    localStorage.setItem(COMMENTER_KEY, value);
  }

  async function submitComment(diveId: string) {
    const body = (commentBodies[diveId] ?? "").trim();
    if (!body) {
      setCommentError((prev) => ({ ...prev, [diveId]: "Write a short comment first." }));
      return;
    }
    setCommentBusy(diveId);
    setCommentError((prev) => ({ ...prev, [diveId]: "" }));
    try {
      await onComment({
        diveId,
        authorName: commenterName.trim() || "Visitor",
        body,
      });
      setCommentBodies((prev) => ({ ...prev, [diveId]: "" }));
    } catch (err) {
      setCommentError((prev) => ({
        ...prev,
        [diveId]: err instanceof Error && err.message ? err.message : "Couldn't post comment.",
      }));
    } finally {
      setCommentBusy(null);
    }
  }

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <h2 className="font-display text-3xl">The vlog book</h2>
        <p className="text-sm text-ink/70">{dives.length === 0 ? "Nothing yet" : `${dives.length} posts`}</p>
      </div>
      {dives.length === 0 ? (
        <p className="rounded-card border border-ink/10 bg-card px-4 py-6 text-ink/80">
          The book is still blank. Paint something, pluck a string, or post a moment from today.
        </p>
      ) : (
        <ol className="space-y-4 border-l-2 border-fern/30 pl-4">
          {dives.map((dive) => {
            const who =
              dive.voice === "me"
                ? journal.myName
                : dive.voice === "sis"
                  ? journal.sisterName
                  : dive.authorLabel || "Visitor";
            const badgeClass =
              dive.voice === "me"
                ? "bg-fern text-card"
                : dive.voice === "sis"
                  ? "bg-sap text-ink"
                  : "border border-ink/15 bg-bg text-ink";
            const isFormOpen = Boolean(openComments[dive.id]);
            const canDeleteThis = dive.mine || canModerate;

            return (
              <li key={dive.id} className="rounded-card border border-ink/10 bg-card p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${badgeClass}`}>{who}</span>
                  <span className="text-xs font-semibold tracking-wide text-ink/60 uppercase">{dive.kind}</span>
                  {dive.voice === "guest" && (
                    <span className="text-xs font-semibold text-ink/60">Visitor post</span>
                  )}
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
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="text-sm font-semibold text-fern"
                      onClick={() => setOpenComments((prev) => ({ ...prev, [dive.id]: !prev[dive.id] }))}
                    >
                      {isFormOpen ? "Hide comment box" : "Leave a comment"}
                    </button>
                    {canDeleteThis &&
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
                        <button
                          type="button"
                          className="text-sm font-semibold text-ink/70"
                          onClick={() => setArmed(dive.id)}
                        >
                          Remove
                        </button>
                      ))}
                  </div>
                </div>

                {(dive.comments.length > 0 || isFormOpen) && (
                  <div className="mt-3 space-y-2 border-t border-ink/10 pt-3">
                    {dive.comments.length > 0 && (
                      <ul className="space-y-2">
                        {dive.comments.map((comment) => (
                          <li key={comment.id} className="rounded-xl bg-bg/70 px-3 py-2 text-sm">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="font-semibold text-ink">
                                {comment.authorName}
                                {comment.isFamily && (
                                  <span className="ml-2 rounded-full bg-sap px-2 py-0.5 text-xs font-semibold text-ink">
                                    Family
                                  </span>
                                )}
                              </span>
                              <div className="flex items-center gap-2">
                                <time className="text-xs text-ink/60" dateTime={comment.createdAt} suppressHydrationWarning>
                                  {new Date(comment.createdAt).toLocaleString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                  })}
                                </time>
                                {canModerate && (
                                  <button
                                    type="button"
                                    className="text-xs font-semibold text-ink/60 hover:text-ink"
                                    onClick={() => void onRemoveComment(comment.id)}
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            </div>
                            <p className="mt-1 text-ink/85">{comment.body}</p>
                          </li>
                        ))}
                      </ul>
                    )}

                    {isFormOpen && (
                      <form
                        className="space-y-2 pt-1"
                        onSubmit={(event) => {
                          event.preventDefault();
                          void submitComment(dive.id);
                        }}
                      >
                        <div className="grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)]">
                          <input
                            className="field py-2 text-sm"
                            placeholder="Your name"
                            value={commenterName}
                            onChange={(event) => updateName(event.target.value)}
                            aria-label="Your name"
                          />
                          <input
                            className="field py-2 text-sm"
                            placeholder="Write a comment…"
                            value={commentBodies[dive.id] ?? ""}
                            onChange={(event) =>
                              setCommentBodies((prev) => ({ ...prev, [dive.id]: event.target.value }))
                            }
                            aria-label="Comment"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          {commentError[dive.id] ? (
                            <p className="text-xs font-medium text-ink">{commentError[dive.id]}</p>
                          ) : (
                            <span className="text-xs text-ink/60">Visitors can comment without signing in.</span>
                          )}
                          <button
                            type="submit"
                            className="btn btn-fern min-h-10 px-4 text-sm"
                            disabled={commentBusy === dive.id}
                          >
                            {commentBusy === dive.id ? "Posting…" : "Post comment"}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
