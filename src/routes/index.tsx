import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clearing } from "@/components/clearing";
import { DiveBook } from "@/components/dive-book";
import { PaintNook } from "@/components/paint-nook";
import { PostDock } from "@/components/post-dock";
import { SplatRun } from "@/components/splat-run";
import { StringBench } from "@/components/string-bench";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  addComment,
  checkKey,
  claimJournal,
  createDive,
  getVlogFeed,
  removeComment,
  removeDive,
  updateJournalSettings,
  type Dive,
  type JournalInfo,
  type Kind,
  type Voice,
} from "@/lib/journal";
import { promptFor } from "@/lib/prompts";

export const Route = createFileRoute("/")({ component: Home });

const KEY = "daily-dive.familyKey";
const VOICE_KEY = "daily-dive.voice";

type Mode = "clearing" | "paint" | "strings" | "play";

function textOf(err: unknown) {
  return err instanceof Error && err.message ? err.message : "Something went wrong. Try again.";
}

function Home() {
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<Mode>("clearing");
  const [journal, setJournal] = useState<JournalInfo | null>(null);
  const [dives, setDives] = useState<Dive[] | null>(null);
  const [familyKey, setFamilyKey] = useState<string | null>(null);
  const [voice, setVoice] = useState<Voice>("me");
  const [prompt, setPrompt] = useState("What did today feel like?");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pendingRemove, setPendingRemove] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  async function refresh() {
    const feed = await getVlogFeed();
    setJournal(feed.journal);
    setDives(feed.dives);
    setLoadError(null);
  }

  useEffect(() => {
    setPrompt(promptFor(new Date()));
    const storedVoice = localStorage.getItem(VOICE_KEY);
    if (storedVoice === "me" || storedVoice === "sis") setVoice(storedVoice);
    void refresh().catch(() => setLoadError("The book couldn't open. Try again in a moment."));
  }, []);

  useEffect(() => {
    if (!journal?.ready) return;
    const saved = localStorage.getItem(KEY);
    if (!saved) return;
    let cancel = false;
    void checkKey({ data: { familyKey: saved } })
      .then(() => {
        if (!cancel) setFamilyKey(saved);
      })
      .catch(() => {
        localStorage.removeItem(KEY);
        if (!cancel) setFamilyKey(null);
      });
    return () => {
      cancel = true;
    };
  }, [journal?.ready]);

  function rememberKey(next: string) {
    localStorage.setItem(KEY, next);
    setFamilyKey(next);
  }

  function pickVoice(next: Voice) {
    setVoice(next);
    if (next === "me" || next === "sis") {
      localStorage.setItem(VOICE_KEY, next);
    }
  }

  async function submit(input: {
    title: string;
    body: string;
    kind: Kind;
    media: string | null;
    extra: string | null;
    shared: boolean;
  }) {
    if (!familyKey) {
      setMode("clearing");
      setError("Unlock posting with the family key first.");
      return false;
    }
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await createDive({
        data: {
          familyKey,
          voice,
          title: input.title,
          body: input.body,
          kind: input.kind,
          media: input.media,
          extra: input.extra,
          shared: input.shared,
        },
      });
      setNotice("Saved. It's in the vlog.");
      setMode("clearing");
      await refresh();
      return true;
    } catch (err) {
      setError(textOf(err));
      return false;
    } finally {
      setBusy(false);
    }
  }

  const dockMode = !journal?.ready ? "setup" : familyKey ? "open" : "enter";
  const canSave = Boolean(familyKey);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-5 sm:py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-ink/60 uppercase">Personal vlog for two</p>
          <h1 className="font-display text-4xl leading-none">Daily Dive</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/post" className="btn btn-sap">
            Post a dive
          </Link>
          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-full bg-ink/10" />
          ) : user ? (
            <UserButton />
          ) : (
            <Link to="/login" className="btn btn-fern">
              Sign in
            </Link>
          )}
        </div>
      </header>
      <p className="mt-3 max-w-2xl text-ink/80">
        {journal?.ready
          ? `${journal.myName} & ${journal.sisterName}'s personal vlog — paintings, guitar, and daily moments. Visitors can watch, play, and leave a comment.`
          : "My personal vlog with my sister — paintings, guitar, and whatever today was. Visitors can watch, play, and comment on any post."}
      </p>

      {mode !== "clearing" && (
        <button type="button" className="btn btn-quiet mt-4" onClick={() => setMode("clearing")}>
          Back to the clearing
        </button>
      )}

      <div className="mt-4">
        {mode === "clearing" && <Clearing prompt={prompt} onPick={setMode} />}
        {mode === "paint" && (
          <section className="rounded-card border border-ink/10 bg-card p-4">
            <h2 className="font-display text-3xl">Paint nook</h2>
            <p className="mt-1 mb-3 text-sm text-ink/70">{prompt}</p>
            <PaintNook
              canSave={canSave}
              busy={busy}
              onSave={(media) =>
                void submit({
                  title: "A painting",
                  body: prompt,
                  kind: "painting",
                  media,
                  extra: null,
                  shared: true,
                })
              }
            />
          </section>
        )}
        {mode === "strings" && (
          <section className="rounded-card border border-ink/10 bg-card p-4">
            <h2 className="font-display text-3xl">String bench</h2>
            <p className="mt-1 mb-3 text-sm text-ink/70">Open strings, like a guitar you don't have to tune.</p>
            <StringBench
              canSave={canSave}
              busy={busy}
              onSave={(hits) =>
                void submit({
                  title: "A little riff",
                  body: prompt,
                  kind: "riff",
                  media: null,
                  extra: JSON.stringify(hits),
                  shared: true,
                })
              }
            />
          </section>
        )}
        {mode === "play" && (
          <section className="rounded-card border border-ink/10 bg-card p-4">
            <h2 className="font-display text-3xl">Splat run</h2>
            <p className="mt-1 mb-3 text-sm text-ink/70">Drag the pick, or use the buttons.</p>
            <SplatRun
              canSave={canSave}
              busy={busy}
              onSave={(score) =>
                void submit({
                  title: `Splat run · ${score}`,
                  body: "Caught this many drips.",
                  kind: "note",
                  media: null,
                  extra: null,
                  shared: true,
                })
              }
            />
          </section>
        )}
      </div>

      {(error || notice) && (
        <p className="mt-4 rounded-xl bg-sap px-4 py-3 text-sm font-medium text-ink" role="status">
          {error ?? notice}
        </p>
      )}

      <div className="mt-6 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {isPending || !journal ? (
          <div className="h-40 animate-pulse rounded-card bg-ink/10" />
        ) : user || familyKey ? (
          <PostDock
            myName={journal.myName}
            sisterName={journal.sisterName}
            allowGuestPosts={journal.allowGuestPosts}
            voice={voice}
            onVoice={pickVoice}
            mode={dockMode}
            busy={busy}
            onClaim={async (input) => {
              setBusy(true);
              setError(null);
              try {
                const next = await claimJournal({ data: input });
                rememberKey(input.familyKey.trim());
                setJournal(next);
                setNotice("Key saved on this device. You can post.");
              } catch (err) {
                setBusy(false);
                throw err;
              } finally {
                setBusy(false);
              }
            }}
            onUnlock={async (key) => {
              setBusy(true);
              setError(null);
              try {
                await checkKey({ data: { familyKey: key } });
                rememberKey(key.trim());
                setNotice("Posting is unlocked on this device.");
              } catch (err) {
                setBusy(false);
                throw err;
              } finally {
                setBusy(false);
              }
            }}
            onUpdateSettings={async (settings) => {
              if (!familyKey) return;
              setBusy(true);
              try {
                const next = await updateJournalSettings({
                  data: { familyKey, ...settings },
                });
                setJournal(next);
                setNotice("Settings saved.");
              } finally {
                setBusy(false);
              }
            }}
            onCreate={(input) => submit({ ...input, extra: null })}
          />
        ) : (
          <section className="rounded-card border border-ink/10 bg-card p-4">
            <h2 className="font-display text-3xl">Visiting our vlog</h2>
            <p className="mt-2 text-ink/80">
              You can play the paint nook, the strings, and splat run, and leave comments on any post in the vlog book.
              {journal.allowGuestPosts
                ? " Visitor posts are also open right now on the post page!"
                : " Only family can post new dives."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/post" className="btn btn-fern">
                {journal.allowGuestPosts ? "Post on the vlog" : "Family post page"}
              </Link>
              <Link to="/login" className="btn btn-quiet">
                Sign in
              </Link>
            </div>
          </section>
        )}
        {loadError ? (
          <div className="rounded-card border border-ink/10 bg-card p-4">
            <p>{loadError}</p>
            <button type="button" className="btn btn-quiet mt-3" onClick={() => void refresh()}>
              Try again
            </button>
          </div>
        ) : dives && journal ? (
          <DiveBook
            dives={dives}
            journal={journal}
            canModerate={Boolean(familyKey)}
            pendingRemove={pendingRemove}
            onRemove={(id) => {
              if (!familyKey) {
                setError("Unlock posting before removing a dive.");
                return;
              }
              setPendingRemove(id);
              void removeDive({ data: { id, familyKey } })
                .then(() => refresh())
                .catch((err: unknown) => setError(textOf(err)))
                .finally(() => setPendingRemove(null));
            }}
            onComment={async ({ diveId, authorName, body }) => {
              await addComment({
                data: {
                  diveId,
                  authorName,
                  body,
                  familyKey: familyKey ?? undefined,
                },
              });
              await refresh();
            }}
            onRemoveComment={async (commentId) => {
              if (!familyKey) return;
              await removeComment({ data: { id: commentId, familyKey } });
              await refresh();
            }}
          />
        ) : (
          <div className="h-40 animate-pulse rounded-card bg-ink/10" />
        )}
      </div>
    </main>
  );
}
