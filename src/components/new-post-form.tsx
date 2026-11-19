import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { checkKey, createAuthorizedPost, type JournalInfo } from "@/lib/journal";

export function NewPostForm({
  journal,
  familyKey,
  voice,
  onVoice,
  onUnlockKey,
  onPublished,
}: {
  journal: JournalInfo;
  familyKey: string | null;
  voice: "me" | "sis";
  onVoice: (next: "me" | "sis") => void;
  onUnlockKey: (key: string) => void;
  onPublished?: (result: { id: string; title: string; body: string }) => void;
}) {
  const { user, isPending } = useCurrentUserState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [shared, setShared] = useState(true);
  const [keyInput, setKeyInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (isPending) {
    return <div className="h-56 animate-pulse rounded-card bg-ink/10" aria-busy="true" />;
  }

  if (!user) {
    return (
      <section className="rounded-card border border-ink/10 bg-card p-5">
        <p className="text-xs font-semibold tracking-wide text-ink/60 uppercase">Authorized authors only</p>
        <h2 className="mt-1 font-display text-3xl">Sign in to write a post</h2>
        <p className="mt-2 text-ink/80">
          Publishing new entries to this personal vlog is restricted to authorized accounts. Visitors can read and
          leave comments on the main page.
        </p>
        <Link to="/login" className="btn btn-fern mt-4">
          Sign in to post
        </Link>
      </section>
    );
  }

  if (!journal.ready) {
    return (
      <section className="rounded-card border border-ink/10 bg-card p-5">
        <h2 className="font-display text-3xl">Claim your vlog first</h2>
        <p className="mt-2 text-ink/80">
          Set up your family key and names before publishing posts to the database.
        </p>
      </section>
    );
  }

  const isAuthorized = journal.isOwner || Boolean(familyKey);

  if (!isAuthorized) {
    return (
      <section className="rounded-card border border-ink/10 bg-card p-5">
        <p className="text-xs font-semibold tracking-wide text-ink/60 uppercase">Family verification</p>
        <h2 className="mt-1 font-display text-3xl">Unlock new post form</h2>
        <p className="mt-2 text-sm text-ink/80">
          Signed in as <span className="font-semibold text-ink">{user.primaryEmail ?? user.displayName ?? "member"}</span>. Enter your
          family key to confirm you are authorized to publish on {journal.myName} &amp; {journal.sisterName}&apos;s vlog.
        </p>
        <form
          className="mt-4 space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            const trimmed = keyInput.trim();
            if (!trimmed) {
              setError("Enter the family key.");
              return;
            }
            setBusy(true);
            setError(null);
            void checkKey({ data: { familyKey: trimmed } })
              .then(() => {
                onUnlockKey(trimmed);
                setKeyInput("");
              })
              .catch((err: unknown) => {
                setError(err instanceof Error && err.message ? err.message : "That family key doesn't match.");
              })
              .finally(() => setBusy(false));
          }}
        >
          <label className="block text-sm font-semibold">
            Family key
            <input
              className="field mt-1"
              type="password"
              autoComplete="current-password"
              placeholder="Enter family key"
              value={keyInput}
              onChange={(event) => setKeyInput(event.target.value)}
            />
          </label>
          <button className="btn btn-fern" type="submit" disabled={busy}>
            {busy ? "Checking…" : "Unlock post form"}
          </button>
          {error && (
            <p className="text-sm font-medium text-ink" role="alert">
              {error}
            </p>
          )}
        </form>
      </section>
    );
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const cleanTitle = title.trim();
    const cleanContent = content.trim();
    setError(null);
    setSuccess(null);

    if (cleanTitle.length < 2) {
      setError("Please add a title (at least 2 characters).");
      return;
    }
    if (!cleanContent) {
      setError("Please write some content for your post.");
      return;
    }

    setBusy(true);
    try {
      const created = await createAuthorizedPost({
        data: {
          familyKey: familyKey ?? undefined,
          voice,
          title: cleanTitle,
          content: cleanContent,
          shared,
          tags,
        },
      });
      setTitle("");
      setContent("");
      setTags("");
      setSuccess("Post saved to the vlog.");
      onPublished?.(created);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Could not save your post.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-card border border-ink/10 bg-card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-xs font-semibold tracking-wide text-ink/60 uppercase">Personal vlog entry</p>
          <h2 className="mt-1 font-display text-3xl">Write a new post</h2>
        </div>
        <p className="text-xs text-ink/70">
          Author: <span className="font-semibold text-ink">{user.primaryEmail ?? user.displayName ?? "Authorized"}</span>
        </p>
      </div>

      <form className="mt-4 space-y-4" onSubmit={(event) => void handleSubmit(event)}>
        <div>
          <span className="block text-sm font-semibold">Posting as</span>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            <button
              type="button"
              className={voice === "me" ? "btn btn-fern" : "btn btn-quiet"}
              onClick={() => onVoice("me")}
            >
              {journal.myName}
            </button>
            <button
              type="button"
              className={voice === "sis" ? "btn btn-sap" : "btn btn-quiet"}
              onClick={() => onVoice("sis")}
            >
              {journal.sisterName}
            </button>
          </div>
        </div>

        <label className="block text-sm font-semibold">
          Title
          <input
            className="field mt-1"
            type="text"
            placeholder="Give today's post a title"
            maxLength={120}
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label className="block text-sm font-semibold">
          Content
          <textarea
            className="field mt-1 min-h-36"
            placeholder="Write what happened today…"
            maxLength={2000}
            required
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </label>

        <label className="block text-sm font-semibold">
          Tags (comma-separated)
          <input
            className="field mt-1"
            type="text"
            placeholder="e.g. painting, guitar, life"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={shared} onChange={(event) => setShared(event.target.checked)} />
          Allow visitors to read and comment on this post
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button className="btn btn-fern" type="submit" disabled={busy}>
            {busy ? "Saving…" : "Publish post"}
          </button>
          {success && (
            <p className="text-sm font-semibold text-fern" role="status">
              {success}
            </p>
          )}
        </div>

        {error && (
          <p className="rounded-xl bg-sap px-3 py-2 text-sm font-medium text-ink" role="alert">
            {error}
          </p>
        )}
      </form>
    </section>
  );
}
