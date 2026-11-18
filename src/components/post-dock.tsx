import { useRef, useState } from "react";
import type { Kind, Voice } from "@/lib/journal";
import { blobToDataUrl, prepareFile } from "@/lib/media";

type Draft = { kind: Kind; media: string | null; label: string };

export function PostDock({
  myName,
  sisterName,
  allowGuestPosts,
  voice,
  onVoice,
  mode,
  busy,
  onClaim,
  onUnlock,
  onUpdateSettings,
  onCreate,
}: {
  myName: string;
  sisterName: string;
  allowGuestPosts: boolean;
  voice: Voice;
  onVoice: (voice: Voice) => void;
  mode: "setup" | "enter" | "open";
  busy: boolean;
  onClaim: (input: { familyKey: string; myName: string; sisterName: string; allowGuestPosts: boolean }) => Promise<void>;
  onUnlock: (familyKey: string) => Promise<void>;
  onUpdateSettings: (input: { myName: string; sisterName: string; allowGuestPosts: boolean }) => Promise<void>;
  onCreate: (input: {
    title: string;
    body: string;
    kind: Kind;
    media: string | null;
    shared: boolean;
  }) => Promise<boolean>;
}) {
  const [familyKey, setFamilyKey] = useState("");
  const [mine, setMine] = useState(myName);
  const [sis, setSis] = useState(sisterName);
  const [guestAllowed, setGuestAllowed] = useState(allowGuestPosts);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [shared, setShared] = useState(true);
  const [draft, setDraft] = useState<Draft | null>(null);
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
      <h2 className="font-display text-3xl">Add a dive</h2>
      {mode === "setup" && (
        <form
          className="mt-3 space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            setLocalError(null);
            void onClaim({ familyKey, myName: mine, sisterName: sis, allowGuestPosts: guestAllowed }).catch(
              (err: unknown) => {
                setLocalError(err instanceof Error ? err.message : "Couldn't save the key.");
              },
            );
          }}
        >
          <p className="text-sm text-ink/80">
            Pick a short secret you and your sister both know. Do this before you share the link. Visitors can watch
            and comment; only the key lets you post as family.
          </p>
          <label className="block text-sm font-semibold">
            Your name
            <input className="field mt-1" value={mine} onChange={(event) => setMine(event.target.value)} />
          </label>
          <label className="block text-sm font-semibold">
            Sister's name
            <input className="field mt-1" value={sis} onChange={(event) => setSis(event.target.value)} />
          </label>
          <label className="block text-sm font-semibold">
            Family key
            <input
              className="field mt-1"
              type="password"
              autoComplete="new-password"
              value={familyKey}
              onChange={(event) => setFamilyKey(event.target.value)}
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={guestAllowed}
              onChange={(event) => setGuestAllowed(event.target.checked)}
            />
            Also allow visitors to post on the post page
          </label>
          <button className="btn btn-fern" type="submit" disabled={busy}>
            Save our key
          </button>
        </form>
      )}
      {mode === "enter" && (
        <form
          className="mt-3 space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            setLocalError(null);
            void onUnlock(familyKey).catch((err: unknown) => {
              setLocalError(err instanceof Error ? err.message : "That key doesn't match.");
            });
          }}
        >
          <p className="text-sm text-ink/80">Type the family key to post from this device.</p>
          <input
            className="field"
            type="password"
            autoComplete="current-password"
            value={familyKey}
            onChange={(event) => setFamilyKey(event.target.value)}
            aria-label="Family key"
          />
          <button className="btn btn-fern" type="submit" disabled={busy}>
            Unlock posting
          </button>
        </form>
      )}
      {mode === "open" && (
        <form
          className="mt-3 space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            setLocalError(null);
            const kind = draft?.kind ?? "note";
            const fallback =
              kind === "photo" ? "A photo" : kind === "audio" ? "A sound" : kind === "video" ? "A clip" : "A note";
            const nextTitle = title.trim() || (draft ? fallback : "");
            if (!nextTitle) {
              setLocalError("Add a title, a note, or a file.");
              return;
            }
            void onCreate({
              title: nextTitle,
              body: body.trim(),
              kind,
              media: draft?.media ?? null,
              shared,
            }).then((ok) => {
              if (!ok) return;
              setTitle("");
              setBody("");
              setDraft(null);
            });
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className={voice === "me" ? "btn btn-fern" : "btn btn-quiet"}
              onClick={() => onVoice("me")}
            >
              {myName}
            </button>
            <button
              type="button"
              className={voice === "sis" ? "btn btn-sap" : "btn btn-quiet"}
              onClick={() => onVoice("sis")}
            >
              {sisterName}
            </button>
          </div>
          <input
            className="field"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-label="Title"
          />
          <textarea
            className="field min-h-24"
            placeholder="What happened?"
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
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={shared} onChange={(event) => setShared(event.target.checked)} />
            Visitors can watch and comment on this one
          </label>
          <p className="text-sm text-ink/70">Only post pictures you're okay with other people seeing.</p>
          <button className="btn btn-fern" type="submit" disabled={busy}>
            Post it
          </button>
          <details className="text-sm">
            <summary className="cursor-pointer font-semibold">Names &amp; visitor posting</summary>
            <div className="mt-2 space-y-2">
              <input className="field" value={mine} onChange={(event) => setMine(event.target.value)} aria-label="Your name" />
              <input
                className="field"
                value={sis}
                onChange={(event) => setSis(event.target.value)}
                aria-label="Sister's name"
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={guestAllowed}
                  onChange={(event) => setGuestAllowed(event.target.checked)}
                />
                Allow visitors to post on /post
              </label>
              <button
                type="button"
                className="btn btn-quiet"
                disabled={busy}
                onClick={() => {
                  setLocalError(null);
                  void onUpdateSettings({ myName: mine, sisterName: sis, allowGuestPosts: guestAllowed }).catch(
                    (err: unknown) => {
                      setLocalError(err instanceof Error ? err.message : "Couldn't save settings.");
                    },
                  );
                }}
              >
                Save settings
              </button>
            </div>
          </details>
        </form>
      )}
      {localError && <p className="mt-3 text-sm font-medium text-ink">{localError}</p>}
    </section>
  );
}
