import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PaintNook } from "@/components/paint-nook";
import { PostDock } from "@/components/post-dock";
import { SplatRun } from "@/components/splat-run";
import { StringBench } from "@/components/string-bench";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  checkKey,
  claimJournal,
  createDive,
  getJournal,
  updateJournalSettings,
  type JournalInfo,
  type Kind,
  type Voice,
} from "@/lib/journal";
import { blobToDataUrl, prepareFile } from "@/lib/media";
import { promptFor } from "@/lib/prompts";

export const Route = createFileRoute("/post")({ component: PostPage });

const KEY = "daily-dive.familyKey";
const VOICE_KEY = "daily-dive.voice";

type StudioTab = "write" | "paint" | "strings" | "play";

function textOf(err: unknown) {
  return err instanceof Error && err.message ? err.message : "Something went wrong. Try again.";
}

function PostPage() {
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const [tab, setTab] = useState<StudioTab>("write");
  const [journal, setJournal] = useState<JournalInfo | null>(null);
  const [familyKey, setFamilyKey] = useState<string | null>(null);
  const [voice, setVoice] = useState<Voice>("me");
  const [prompt, setPrompt] = useState("What did today feel like?");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    setPrompt(promptFor(new Date()));
    const storedVoice = localStorage.getItem(VOICE_KEY);
    if (storedVoice === "me" || storedVoice === "sis") setVoice(storedVoice);
    void getJournal()
      .then((next) => setJournal(next))
      .catch(() => setError("Couldn't open the studio right now."));
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

  async function submitFamilyDive(input: {
    title: string;
    body: string;
    kind: Kind;
    media: string | null;
    extra: string | null;
    shared: boolean;
  }) {
    if (!familyKey) {
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
      setNotice("Posted to the vlog!");
      void navigate({ to: "/" });
      return true;
    } catch (err) {
      setError(textOf(err));
      return false;
    } finally {
      setBusy(false);
    }
  }

  const canFamilyPost = Boolean(journal?.ready && familyKey);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-5 sm:py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/" className="text-sm font-semibold text-fern">
            ← Back to the vlog
          </Link>
          <h1 className="mt-1 font-display text-4xl leading-none">Post a dive</h1>
        </div>
        {isPending ? (
          <div className="h-10 w-28 animate-pulse rounded-full bg-ink/10" />
        ) : user ? (
          <UserButton />
        ) : (
          <Link to="/login" className="btn btn-quiet">
            Sign in
          </Link>
        )}
      </header>

      <p className="mt-3 text-ink/80">
        {journal?.ready
          ? `A dedicated spot for ${journal.myName} & ${journal.sisterName} to share moments on the personal vlog.`
          : "Set up your personal vlog once, then share moments from any phone."}
      </p>

      {(error || notice) && (
        <p className="mt-4 rounded-xl bg-sap px-4 py-3 text-sm font-medium text-ink" role="status">
          {error ?? notice}
        </p>
      )}

      {!journal ? (
        <div className="mt-6 h-48 animate-pulse rounded-card bg-ink/10" />
      ) : !journal.ready ? (
        <div className="mt-6">
          {user ? (
            <PostDock
              myName={journal.myName}
              sisterName={journal.sisterName}
              allowGuestPosts={journal.allowGuestPosts}
              voice={voice}
              onVoice={pickVoice}
              mode="setup"
              busy={busy}
              onClaim={async (input) => {
                setBusy(true);
                setError(null);
                try {
                  const next = await claimJournal({ data: input });
                  rememberKey(input.familyKey.trim());
                  setJournal(next);
                  setNotice("Key saved on this device. You can post now!");
                } finally {
                  setBusy(false);
                }
              }}
              onUnlock={async () => {}}
              onUpdateSettings={async () => {}}
              onCreate={async () => false}
            />
          ) : (
            <section className="rounded-card border border-ink/10 bg-card p-5">
              <h2 className="font-display text-3xl">Claim your vlog first</h2>
              <p className="mt-2 text-ink/80">
                Sign in once with email and password so you can set your family key and name your two voices.
              </p>
              <Link to="/login" className="btn btn-fern mt-4">
                Sign in to set up
              </Link>
            </section>
          )}
        </div>
      ) : canFamilyPost ? (
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["write", "Note & media"],
                ["paint", "Paint nook"],
                ["strings", "String bench"],
                ["play", "Splat run"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={tab === key ? "btn btn-fern" : "btn btn-quiet"}
                onClick={() => setTab(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === "write" && (
            <PostDock
              myName={journal.myName}
              sisterName={journal.sisterName}
              allowGuestPosts={journal.allowGuestPosts}
              voice={voice}
              onVoice={pickVoice}
              mode="open"
              busy={busy}
              onClaim={async () => {}}
              onUnlock={async () => {}}
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
              onCreate={(input) => submitFamilyDive({ ...input, extra: null })}
            />
          )}

          {tab === "paint" && (
            <section className="rounded-card border border-ink/10 bg-card p-4">
              <h2 className="font-display text-3xl">Paint nook</h2>
              <p className="mt-1 mb-3 text-sm text-ink/70">{prompt}</p>
              <PaintNook
                canSave={canFamilyPost}
                busy={busy}
                onSave={(media) =>
                  void submitFamilyDive({
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

          {tab === "strings" && (
            <section className="rounded-card border border-ink/10 bg-card p-4">
              <h2 className="font-display text-3xl">String bench</h2>
              <p className="mt-1 mb-3 text-sm text-ink/70">Open strings, like a guitar you don't have to tune.</p>
              <StringBench
                canSave={canFamilyPost}
                busy={busy}
                onSave={(hits) =>
                  void submitFamilyDive({
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

          {tab === "play" && (
            <section className="rounded-card border border-ink/10 bg-card p-4">
              <h2 className="font-display text-3xl">Splat run</h2>
              <p className="mt-1 mb-3 text-sm text-ink/70">Drag the pick, or use the buttons.</p>
              <SplatRun
                canSave={canFamilyPost}
                busy={busy}
                onSave={(score) =>
                  void submitFamilyDive({
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
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <PostDock
            myName={journal.myName}
            sisterName={journal.sisterName}
            allowGuestPosts={journal.allowGuestPosts}
            voice={voice}
            onVoice={pickVoice}
            mode="enter"
            busy={busy}
            onClaim={async () => {}}
            onUnlock={async (key) => {
              setBusy(true);
              setError(null);
              try {
                await checkKey({ data: { familyKey: key } });
                rememberKey(key.trim());
                setNotice("Family posting is unlocked on this device.");
              } finally {
                setBusy(false);
              }
            }}
            onUpdateSettings={async () => {}}
            onCreate={async () => false}
          />

          {journal.allowGuestPosts ? (
            <GuestPostForm
              busy={busy}
              onPost={async (input) => {
                setBusy(true);
                setError(null);
                try {
                  await createDive({
                    data: {
                      voice: "guest",
                      authorLabel: input.authorName,
                      title: input.title,
                      body: input.body,
                      kind: input.kind,
                      media: input.media,
                      extra: null,
                      shared: true,
                    },
                  });
                  setNotice("Your guest post is live!");
                  void navigate({ to: "/" });
                  return true;
                } catch (err) {
                  setError(textOf(err));
                  return false;
                } finally {
                  setBusy(false);
                }
              }}
            />
          ) : (
            <section className="rounded-card border border-ink/10 bg-card p-4">
              <h2 className="font-display text-3xl">Visiting?</h2>
              <p className="mt-2 text-ink/80">
                This is {journal.myName} &amp; {journal.sisterName}&apos;s personal vlog. Only family can post new
                entries right now, but anyone can comment on posts back in the vlog!
              </p>
              <Link to="/" className="btn btn-quiet mt-4">
                Back to the vlog
              </Link>
            </section>
          )}
        </div>
      )}
    </main>
  );
}

function GuestPostForm({
  busy,
  onPost,
}: {
  busy: boolean;
  onPost: (input: {
    authorName: string;
    title: string;
    body: string;
    kind: Kind;
    media: string | null;
  }) => Promise<boolean>;
}) {
  const [authorName, setAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [draft, setDraft] = useState<{ kind: Kind; media: string; label: string } | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  async function takeFile(file: File | undefined) {
    if (!file) return;
    setLocalError(null);
    try {
      const prepared = await prepareFile(file);
      setDraft({ kind: prepared.kind, media: prepared.media, label: file.name });
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Couldn't use that file.");
    }
  }

  async function toggleMic() {
    setLocalError(null);
    if (recording && recRef.current) {
      recRef.current.stop();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setLocalError("This browser can't record. You can still upload a file.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunks.current = [];
      rec.ondataavailable = (event) => {
        if (event.data.size) chunks.current.push(event.data);
      };
      rec.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        setRecording(false);
        const blob = new Blob(chunks.current, { type: rec.mimeType || "audio/webm" });
        if (blob.size > 1_000_000) {
          setLocalError("That was too long. Try under about 20 seconds.");
          return;
        }
        void blobToDataUrl(blob).then((media) => {
          setDraft({ kind: "audio", media, label: "Voice note" });
        });
      };
      recRef.current = rec;
      rec.start();
      setRecording(true);
      window.setTimeout(() => {
        if (rec.state === "recording") rec.stop();
      }, 20_000);
    } catch {
      setLocalError("Microphone permission was blocked.");
    }
  }

  return (
    <section className="rounded-card border border-ink/10 bg-card p-4">
      <h2 className="font-display text-3xl">Post as a visitor</h2>
      <p className="mt-1 text-sm text-ink/80">Leave a note, photo, or short clip on the vlog.</p>
      <form
        className="mt-3 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          setLocalError(null);
          const kind = draft?.kind ?? "note";
          const nextTitle = title.trim() || (draft ? "Visitor share" : "");
          if (!nextTitle) {
            setLocalError("Add a title or a file.");
            return;
          }
          void onPost({
            authorName: authorName.trim() || "Visitor",
            title: nextTitle,
            body: body.trim(),
            kind,
            media: draft?.media ?? null,
          });
        }}
      >
        <input
          className="field"
          placeholder="Your name"
          value={authorName}
          onChange={(event) => setAuthorName(event.target.value)}
          aria-label="Your name"
        />
        <input
          className="field"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          aria-label="Title"
        />
        <textarea
          className="field min-h-24"
          placeholder="Say hello or share something…"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          aria-label="Note"
        />
        <div className="flex flex-wrap gap-2">
          <label className="btn btn-quiet">
            Photo, audio, or video
            <input
              className="sr-only"
              type="file"
              accept="image/*,audio/*,video/*"
              onChange={(event) => {
                void takeFile(event.target.files?.[0]);
                event.target.value = "";
              }}
            />
          </label>
          <button type="button" className={recording ? "btn btn-sap" : "btn btn-quiet"} onClick={() => void toggleMic()}>
            {recording ? "Stop" : "Record"}
          </button>
        </div>
        {draft && (
          <p className="text-sm text-ink/70">
            Ready: {draft.label}{" "}
            <button type="button" className="font-semibold" onClick={() => setDraft(null)}>
              Clear
            </button>
          </p>
        )}
        <button className="btn btn-sap w-full" type="submit" disabled={busy}>
          Post to the vlog
        </button>
        {localError && <p className="text-sm font-medium text-ink">{localError}</p>}
      </form>
    </section>
  );
}
