import { useCallback, useEffect, useMemo, useState } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  addComment,
  deletePost,
  getJournal,
  likePost,
  listPosts,
  removeComment,
  type PostSummary,
} from "@/lib/journal";

const PAGE_SIZE = 5;
const COMMENTER_KEY = "daily-dive.commenterName";

function formatCreationDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function PostList({
  refreshKey = 0,
  isOwner: isOwnerProp,
  onDeleted,
}: {
  refreshKey?: number;
  isOwner?: boolean;
  onDeleted?: (id: string) => void;
}) {
  const { user, isPending } = useCurrentUserState();
  const [posts, setPosts] = useState<PostSummary[] | null>(null);
  const [resolvedIsOwner, setResolvedIsOwner] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [likingId, setLikingId] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  // Comments state
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [commenterName, setCommenterName] = useState("");
  const [commentBodies, setCommentBodies] = useState<Record<string, string>>({});
  const [commentBusy, setCommentBusy] = useState<string | null>(null);
  const [commentError, setCommentError] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem(COMMENTER_KEY);
    if (saved) setCommenterName(saved);
  }, []);

  function updateCommenterName(value: string) {
    setCommenterName(value);
    localStorage.setItem(COMMENTER_KEY, value);
  }

  const filteredPosts = useMemo(() => {
    if (!posts) return null;
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return posts;
    return posts.filter((post) => {
      const haystack = `${post.title}\n${post.content}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [posts, query]);

  const totalPages = filteredPosts ? Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE)) : 1;

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedPosts = useMemo(() => {
    if (!filteredPosts) return null;
    const start = (page - 1) * PAGE_SIZE;
    return filteredPosts.slice(start, start + PAGE_SIZE);
  }, [filteredPosts, page]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (isOwnerProp === undefined) {
        const [items, journal] = await Promise.all([listPosts(), getJournal()]);
        setPosts(items);
        setResolvedIsOwner(journal.isOwner);
      } else {
        const items = await listPosts();
        setPosts(items);
      }
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Could not load posts.");
    } finally {
      setLoading(false);
    }
  }, [isOwnerProp]);

  useEffect(() => {
    void load();
  }, [load, refreshKey, user?.id]);

  const canDelete = Boolean(!isPending && user && (isOwnerProp ?? resolvedIsOwner));

  async function handleDelete(id: string) {
    setDeletingId(id);
    setDeleteError(null);
    try {
      await deletePost({ data: { id } });
      setPosts((prev) => prev?.filter((item) => item.id !== id) ?? null);
      setConfirmId(null);
      onDeleted?.(id);
    } catch (err) {
      setDeleteError(err instanceof Error && err.message ? err.message : "Could not delete post.");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleLike(id: string) {
    if (likedPosts[id]) return;
    setLikingId(id);
    try {
      const res = await likePost({ data: { id } });
      setPosts((prev) =>
        prev
          ? prev.map((post) => (post.id === id ? { ...post, likes: res.likes } : post))
          : null,
      );
      setLikedPosts((prev) => ({ ...prev, [id]: true }));
    } catch {
      // ignore transient like failure
    } finally {
      setLikingId(null);
    }
  }

  async function handleAddComment(diveId: string) {
    const body = (commentBodies[diveId] ?? "").trim();
    if (!body) {
      setCommentError((prev) => ({ ...prev, [diveId]: "Write a short comment first." }));
      return;
    }
    setCommentBusy(diveId);
    setCommentError((prev) => ({ ...prev, [diveId]: "" }));
    try {
      await addComment({
        data: {
          diveId,
          authorName: commenterName.trim() || "Visitor",
          body,
        },
      });
      setCommentBodies((prev) => ({ ...prev, [diveId]: "" }));
      const items = await listPosts();
      setPosts(items);
    } catch (err) {
      setCommentError((prev) => ({
        ...prev,
        [diveId]: err instanceof Error && err.message ? err.message : "Couldn't post comment.",
      }));
    } finally {
      setCommentBusy(null);
    }
  }

  async function handleRemoveComment(commentId: string) {
    try {
      const familyKey = window.prompt("Enter family key to delete comment:");
      if (!familyKey) return;
      await removeComment({ data: { id: commentId, familyKey } });
      const items = await listPosts();
      setPosts(items);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not delete comment.");
    }
  }

  const hasQuery = query.trim().length > 0;

  return (
    <section className="space-y-4" aria-label="Vlog posts">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl">Recent posts</h2>
          <p className="text-sm text-ink/70">
            {posts && filteredPosts
              ? hasQuery
                ? `${filteredPosts.length} of ${posts.length} matching ${filteredPosts.length === 1 ? "entry" : "entries"}`
                : `${posts.length} ${posts.length === 1 ? "entry" : "entries"} from the vlog`
              : "Loading entries…"}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-quiet min-h-10 px-4 text-sm"
          disabled={loading}
          onClick={() => void load()}
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {posts && posts.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <input
            className="field min-w-0 flex-1 py-2.5 text-sm"
            type="search"
            placeholder="Search posts by title or content…"
            aria-label="Search posts by title or content"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {hasQuery && (
            <button
              type="button"
              className="btn btn-quiet min-h-10 px-4 text-sm"
              onClick={() => setQuery("")}
            >
              Clear
            </button>
          )}
        </div>
      )}

      {deleteError && (
        <p className="rounded-xl bg-sap px-3 py-2 text-sm font-medium text-ink" role="alert">
          {deleteError}
        </p>
      )}

      {loading && !posts ? (
        <div className="space-y-3" aria-busy="true">
          <div className="h-28 animate-pulse rounded-card bg-ink/10" />
          <div className="h-28 animate-pulse rounded-card bg-ink/10" />
        </div>
      ) : error ? (
        <div className="rounded-card border border-ink/10 bg-card p-4">
          <p className="text-sm font-medium text-ink" role="alert">
            {error}
          </p>
          <button type="button" className="btn btn-quiet mt-3" onClick={() => void load()}>
            Try again
          </button>
        </div>
      ) : !posts || posts.length === 0 ? (
        <p className="rounded-card border border-ink/10 bg-card px-4 py-6 text-ink/80">
          No posts have been published yet.
        </p>
      ) : !filteredPosts || filteredPosts.length === 0 ? (
        <div className="rounded-card border border-ink/10 bg-card px-4 py-6">
          <p className="text-ink/80">No posts match &ldquo;{query.trim()}&rdquo;.</p>
          <button
            type="button"
            className="btn btn-quiet mt-3 min-h-10 px-4 text-sm"
            onClick={() => setQuery("")}
          >
            Clear search
          </button>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {paginatedPosts?.map((post) => {
              const isLiked = Boolean(likedPosts[post.id]);
              const isCommentsOpen = Boolean(openComments[post.id]);
              return (
                <li key={post.id} className="rounded-card border border-ink/10 bg-card p-4 sm:p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl">{post.title}</h3>
                    <time
                      className="text-xs font-medium text-ink/60"
                      dateTime={post.createdAt}
                      suppressHydrationWarning
                    >
                      {formatCreationDate(post.createdAt)}
                    </time>
                  </div>
                  {post.content ? (
                    <p className="mt-2 whitespace-pre-line text-ink/85">{post.content}</p>
                  ) : (
                    <p className="mt-2 text-sm text-ink/60">({post.kind} entry)</p>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      {post.tags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          className="rounded-full bg-bg px-2.5 py-0.5 text-xs font-semibold text-ink/80 transition hover:bg-fern hover:text-card"
                          onClick={() => setQuery(tag)}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-ink/10 pt-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                          isLiked ? "bg-sap text-ink" : "bg-fern/10 text-fern hover:bg-fern/20"
                        }`}
                        disabled={likingId === post.id}
                        onClick={() => void handleLike(post.id)}
                        aria-label={`Like post: ${post.title}`}
                      >
                        <span className="text-base" aria-hidden="true">
                          {isLiked ? "❤️" : "🤍"}
                        </span>
                        <span>{post.likes}</span>
                        <span className="text-xs font-medium opacity-80">{post.likes === 1 ? "Like" : "Likes"}</span>
                      </button>

                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-card px-3.5 py-1.5 text-sm font-semibold text-ink hover:bg-ink/5"
                        onClick={() => setOpenComments((prev) => ({ ...prev, [post.id]: !prev[post.id] }))}
                      >
                        💬 <span>{post.comments.length}</span>
                        <span className="text-xs font-medium opacity-80">
                          {post.comments.length === 1 ? "Comment" : "Comments"}
                        </span>
                      </button>
                    </div>

                    {canDelete && (
                      <div className="flex items-center gap-2">
                        {confirmId === post.id ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-sap min-h-9 px-3 text-sm"
                              disabled={deletingId === post.id}
                              onClick={() => void handleDelete(post.id)}
                            >
                              {deletingId === post.id ? "Deleting…" : "Confirm delete"}
                            </button>
                            <button
                              type="button"
                              className="btn btn-quiet min-h-9 px-3 text-sm"
                              disabled={deletingId === post.id}
                              onClick={() => setConfirmId(null)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            className="text-sm font-semibold text-ink/70 hover:text-ink"
                            onClick={() => {
                              setDeleteError(null);
                              setConfirmId(post.id);
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {(post.comments.length > 0 || isCommentsOpen) && (
                    <div className="mt-4 space-y-3 border-t border-ink/10 pt-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-ink/70">Feedback &amp; Comments</h4>
                      {post.comments.length > 0 ? (
                        <ul className="space-y-2">
                          {post.comments.map((comment) => (
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
                                    {formatCreationDate(comment.createdAt)}
                                  </time>
                                  {canDelete && (
                                    <button
                                      type="button"
                                      className="text-xs font-semibold text-ink/60 hover:text-ink"
                                      onClick={() => void handleRemoveComment(comment.id)}
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
                      ) : (
                        <p className="text-xs text-ink/60">No comments yet. Be the first to leave feedback!</p>
                      )}

                      <form
                        className="space-y-2 pt-2"
                        onSubmit={(event) => {
                          event.preventDefault();
                          void handleAddComment(post.id);
                        }}
                      >
                        <div className="grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)]">
                          <input
                            className="field py-2 text-sm"
                            placeholder="Your name"
                            value={commenterName}
                            onChange={(event) => updateCommenterName(event.target.value)}
                            aria-label="Your name"
                          />
                          <input
                            className="field py-2 text-sm"
                            placeholder="Leave feedback or comment…"
                            value={commentBodies[post.id] ?? ""}
                            onChange={(event) =>
                              setCommentBodies((prev) => ({ ...prev, [post.id]: event.target.value }))
                            }
                            aria-label="Comment"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          {commentError[post.id] ? (
                            <p className="text-xs font-medium text-ink" role="alert">
                              {commentError[post.id]}
                            </p>
                          ) : (
                            <span className="text-xs text-ink/60">Visitors can leave comments without signing in.</span>
                          )}
                          <button
                            type="button"
                            className="btn btn-fern min-h-10 px-4 text-sm"
                            disabled={commentBusy === post.id}
                            onClick={() => void handleAddComment(post.id)}
                          >
                            {commentBusy === post.id ? "Posting…" : "Post comment"}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <nav className="flex flex-wrap items-center justify-between gap-3 pt-2" aria-label="Pagination">
              <p className="text-sm text-ink/70">
                Page <span className="font-semibold text-ink">{page}</span> of{" "}
                <span className="font-semibold text-ink">{totalPages}</span>
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="btn btn-quiet min-h-10 px-4 text-sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="btn btn-quiet min-h-10 px-4 text-sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </div>
            </nav>
          )}
        </>
      )}
    </section>
  );
}
