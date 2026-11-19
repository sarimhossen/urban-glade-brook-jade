import { o as __toESM } from "../_runtime.mjs";
import { a as UserButton, c as promptFor, i as StringBench, l as useCurrentUserState, n as PostDock, o as blobToDataUrl, r as SplatRun, s as prepareFile, t as PaintNook } from "./prompts-CIRgXR_R.mjs";
import { a as createAuthorizedPost, c as getJournal, d as listPosts, f as removeComment, i as claimJournal, m as updateJournalSettings, n as addComment, o as createDive, r as checkKey, s as deletePost, u as likePost } from "./router-DOmvwcbQ.mjs";
import { Ut as require_react, v as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/post-Bk7W0Mfh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewPostForm({ journal, familyKey, voice, onVoice, onUnlockKey, onPublished }) {
	const { user, isPending } = useCurrentUserState();
	const [title, setTitle] = (0, import_react.useState)("");
	const [content, setContent] = (0, import_react.useState)("");
	const [tags, setTags] = (0, import_react.useState)("");
	const [shared, setShared] = (0, import_react.useState)(true);
	const [keyInput, setKeyInput] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [success, setSuccess] = (0, import_react.useState)(null);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-56 animate-pulse rounded-card bg-ink/10",
		"aria-busy": "true"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-card border border-ink/10 bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-wide text-ink/60 uppercase",
				children: "Authorized authors only"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-3xl",
				children: "Sign in to write a post"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-ink/80",
				children: "Publishing new entries to this personal vlog is restricted to authorized accounts. Visitors can read and leave comments on the main page."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "btn btn-fern mt-4",
				children: "Sign in to post"
			})
		]
	});
	if (!journal.ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-card border border-ink/10 bg-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl",
			children: "Claim your vlog first"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-ink/80",
			children: "Set up your family key and names before publishing posts to the database."
		})]
	});
	if (!(journal.isOwner || Boolean(familyKey))) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-card border border-ink/10 bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-wide text-ink/60 uppercase",
				children: "Family verification"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-3xl",
				children: "Unlock new post form"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-ink/80",
				children: [
					"Signed in as ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-ink",
						children: user.primaryEmail ?? user.displayName ?? "member"
					}),
					". Enter your family key to confirm you are authorized to publish on ",
					journal.myName,
					" & ",
					journal.sisterName,
					"'s vlog."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 space-y-3",
				onSubmit: (event) => {
					event.preventDefault();
					const trimmed = keyInput.trim();
					if (!trimmed) {
						setError("Enter the family key.");
						return;
					}
					setBusy(true);
					setError(null);
					checkKey({ data: { familyKey: trimmed } }).then(() => {
						onUnlockKey(trimmed);
						setKeyInput("");
					}).catch((err) => {
						setError(err instanceof Error && err.message ? err.message : "That family key doesn't match.");
					}).finally(() => setBusy(false));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold",
						children: ["Family key", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1",
							type: "password",
							autoComplete: "current-password",
							placeholder: "Enter family key",
							value: keyInput,
							onChange: (event) => setKeyInput(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-fern",
						type: "submit",
						disabled: busy,
						children: busy ? "Checking…" : "Unlock post form"
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-ink",
						role: "alert",
						children: error
					})
				]
			})
		]
	});
	async function handleSubmit(event) {
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
			const created = await createAuthorizedPost({ data: {
				familyKey: familyKey ?? void 0,
				voice,
				title: cleanTitle,
				content: cleanContent,
				shared,
				tags
			} });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-card border border-ink/10 bg-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-wide text-ink/60 uppercase",
				children: "Personal vlog entry"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-3xl",
				children: "Write a new post"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-ink/70",
				children: ["Author: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-ink",
					children: user.primaryEmail ?? user.displayName ?? "Authorized"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-4 space-y-4",
			onSubmit: (event) => void handleSubmit(event),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-sm font-semibold",
					children: "Posting as"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1.5 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: voice === "me" ? "btn btn-fern" : "btn btn-quiet",
						onClick: () => onVoice("me"),
						children: journal.myName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: voice === "sis" ? "btn btn-sap" : "btn btn-quiet",
						onClick: () => onVoice("sis"),
						children: journal.sisterName
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-semibold",
					children: ["Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field mt-1",
						type: "text",
						placeholder: "Give today's post a title",
						maxLength: 120,
						required: true,
						value: title,
						onChange: (event) => setTitle(event.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-semibold",
					children: ["Content", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "field mt-1 min-h-36",
						placeholder: "Write what happened today…",
						maxLength: 2e3,
						required: true,
						value: content,
						onChange: (event) => setContent(event.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-semibold",
					children: ["Tags (comma-separated)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field mt-1",
						type: "text",
						placeholder: "e.g. painting, guitar, life",
						value: tags,
						onChange: (event) => setTags(event.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: shared,
						onChange: (event) => setShared(event.target.checked)
					}), "Allow visitors to read and comment on this post"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-fern",
						type: "submit",
						disabled: busy,
						children: busy ? "Saving…" : "Publish post"
					}), success && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-fern",
						role: "status",
						children: success
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl bg-sap px-3 py-2 text-sm font-medium text-ink",
					role: "alert",
					children: error
				})
			]
		})]
	});
}
var PAGE_SIZE = 5;
var COMMENTER_KEY = "daily-dive.commenterName";
function formatCreationDate(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return iso;
	return date.toLocaleString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function PostList({ refreshKey = 0, isOwner: isOwnerProp, onDeleted }) {
	const { user, isPending } = useCurrentUserState();
	const [posts, setPosts] = (0, import_react.useState)(null);
	const [resolvedIsOwner, setResolvedIsOwner] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [confirmId, setConfirmId] = (0, import_react.useState)(null);
	const [deletingId, setDeletingId] = (0, import_react.useState)(null);
	const [deleteError, setDeleteError] = (0, import_react.useState)(null);
	const [likingId, setLikingId] = (0, import_react.useState)(null);
	const [likedPosts, setLikedPosts] = (0, import_react.useState)({});
	const [openComments, setOpenComments] = (0, import_react.useState)({});
	const [commenterName, setCommenterName] = (0, import_react.useState)("");
	const [commentBodies, setCommentBodies] = (0, import_react.useState)({});
	const [commentBusy, setCommentBusy] = (0, import_react.useState)(null);
	const [commentError, setCommentError] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem(COMMENTER_KEY);
		if (saved) setCommenterName(saved);
	}, []);
	function updateCommenterName(value) {
		setCommenterName(value);
		localStorage.setItem(COMMENTER_KEY, value);
	}
	const filteredPosts = (0, import_react.useMemo)(() => {
		if (!posts) return null;
		const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
		if (terms.length === 0) return posts;
		return posts.filter((post) => {
			const haystack = `${post.title}\n${post.content}`.toLowerCase();
			return terms.every((term) => haystack.includes(term));
		});
	}, [posts, query]);
	const totalPages = filteredPosts ? Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE)) : 1;
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [query]);
	(0, import_react.useEffect)(() => {
		if (page > totalPages) setPage(totalPages);
	}, [page, totalPages]);
	const paginatedPosts = (0, import_react.useMemo)(() => {
		if (!filteredPosts) return null;
		const start = (page - 1) * PAGE_SIZE;
		return filteredPosts.slice(start, start + PAGE_SIZE);
	}, [filteredPosts, page]);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		try {
			if (isOwnerProp === void 0) {
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
	(0, import_react.useEffect)(() => {
		load();
	}, [
		load,
		refreshKey,
		user?.id
	]);
	const canDelete = Boolean(!isPending && user && (isOwnerProp ?? resolvedIsOwner));
	async function handleDelete(id) {
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
	async function handleLike(id) {
		if (likedPosts[id]) return;
		setLikingId(id);
		try {
			const res = await likePost({ data: { id } });
			setPosts((prev) => prev ? prev.map((post) => post.id === id ? {
				...post,
				likes: res.likes
			} : post) : null);
			setLikedPosts((prev) => ({
				...prev,
				[id]: true
			}));
		} catch {} finally {
			setLikingId(null);
		}
	}
	async function handleAddComment(diveId) {
		const body = (commentBodies[diveId] ?? "").trim();
		if (!body) {
			setCommentError((prev) => ({
				...prev,
				[diveId]: "Write a short comment first."
			}));
			return;
		}
		setCommentBusy(diveId);
		setCommentError((prev) => ({
			...prev,
			[diveId]: ""
		}));
		try {
			await addComment({ data: {
				diveId,
				authorName: commenterName.trim() || "Visitor",
				body
			} });
			setCommentBodies((prev) => ({
				...prev,
				[diveId]: ""
			}));
			const items = await listPosts();
			setPosts(items);
		} catch (err) {
			setCommentError((prev) => ({
				...prev,
				[diveId]: err instanceof Error && err.message ? err.message : "Couldn't post comment."
			}));
		} finally {
			setCommentBusy(null);
		}
	}
	async function handleRemoveComment(commentId) {
		try {
			const familyKey = window.prompt("Enter family key to delete comment:");
			if (!familyKey) return;
			await removeComment({ data: {
				id: commentId,
				familyKey
			} });
			const items = await listPosts();
			setPosts(items);
		} catch (err) {
			alert(err instanceof Error ? err.message : "Could not delete comment.");
		}
	}
	const hasQuery = query.trim().length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4",
		"aria-label": "Vlog posts",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: "Recent posts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink/70",
					children: posts && filteredPosts ? hasQuery ? `${filteredPosts.length} of ${posts.length} matching ${filteredPosts.length === 1 ? "entry" : "entries"}` : `${posts.length} ${posts.length === 1 ? "entry" : "entries"} from the vlog` : "Loading entries…"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-quiet min-h-10 px-4 text-sm",
					disabled: loading,
					onClick: () => void load(),
					children: loading ? "Refreshing…" : "Refresh"
				})]
			}),
			posts && posts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field min-w-0 flex-1 py-2.5 text-sm",
					type: "search",
					placeholder: "Search posts by title or content…",
					"aria-label": "Search posts by title or content",
					value: query,
					onChange: (event) => setQuery(event.target.value)
				}), hasQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-quiet min-h-10 px-4 text-sm",
					onClick: () => setQuery(""),
					children: "Clear"
				})]
			}),
			deleteError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-sap px-3 py-2 text-sm font-medium text-ink",
				role: "alert",
				children: deleteError
			}),
			loading && !posts ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				"aria-busy": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-28 animate-pulse rounded-card bg-ink/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-28 animate-pulse rounded-card bg-ink/10" })]
			}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-card border border-ink/10 bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-ink",
					role: "alert",
					children: error
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-quiet mt-3",
					onClick: () => void load(),
					children: "Try again"
				})]
			}) : !posts || posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-card border border-ink/10 bg-card px-4 py-6 text-ink/80",
				children: "No posts have been published yet."
			}) : !filteredPosts || filteredPosts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-card border border-ink/10 bg-card px-4 py-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-ink/80",
					children: [
						"No posts match “",
						query.trim(),
						"”."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-quiet mt-3 min-h-10 px-4 text-sm",
					onClick: () => setQuery(""),
					children: "Clear search"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-4",
				children: paginatedPosts?.map((post) => {
					const isLiked = Boolean(likedPosts[post.id]);
					const isCommentsOpen = Boolean(openComments[post.id]);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-card border border-ink/10 bg-card p-4 sm:p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl",
									children: post.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									className: "text-xs font-medium text-ink/60",
									dateTime: post.createdAt,
									suppressHydrationWarning: true,
									children: formatCreationDate(post.createdAt)
								})]
							}),
							post.content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 whitespace-pre-line text-ink/85",
								children: post.content
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-ink/60",
								children: [
									"(",
									post.kind,
									" entry)"
								]
							}),
							post.tags && post.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap items-center gap-1.5",
								children: post.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "rounded-full bg-bg px-2.5 py-0.5 text-xs font-semibold text-ink/80 transition hover:bg-fern hover:text-card",
									onClick: () => setQuery(tag),
									children: ["#", tag]
								}, tag))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-ink/10 pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: `inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${isLiked ? "bg-sap text-ink" : "bg-fern/10 text-fern hover:bg-fern/20"}`,
										disabled: likingId === post.id,
										onClick: () => void handleLike(post.id),
										"aria-label": `Like post: ${post.title}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-base",
												"aria-hidden": "true",
												children: isLiked ? "❤️" : "🤍"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.likes }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-medium opacity-80",
												children: post.likes === 1 ? "Like" : "Likes"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-card px-3.5 py-1.5 text-sm font-semibold text-ink hover:bg-ink/5",
										onClick: () => setOpenComments((prev) => ({
											...prev,
											[post.id]: !prev[post.id]
										})),
										children: [
											"💬 ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.comments.length }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-medium opacity-80",
												children: post.comments.length === 1 ? "Comment" : "Comments"
											})
										]
									})]
								}), canDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2",
									children: confirmId === post.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "btn btn-sap min-h-9 px-3 text-sm",
										disabled: deletingId === post.id,
										onClick: () => void handleDelete(post.id),
										children: deletingId === post.id ? "Deleting…" : "Confirm delete"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "btn btn-quiet min-h-9 px-3 text-sm",
										disabled: deletingId === post.id,
										onClick: () => setConfirmId(null),
										children: "Cancel"
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "text-sm font-semibold text-ink/70 hover:text-ink",
										onClick: () => {
											setDeleteError(null);
											setConfirmId(post.id);
										},
										children: "Delete"
									})
								})]
							}),
							(post.comments.length > 0 || isCommentsOpen) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-3 border-t border-ink/10 pt-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-semibold uppercase tracking-wide text-ink/70",
										children: "Feedback & Comments"
									}),
									post.comments.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "space-y-2",
										children: post.comments.map((comment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "rounded-xl bg-bg/70 px-3 py-2 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-semibold text-ink",
													children: [comment.authorName, comment.isFamily && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "ml-2 rounded-full bg-sap px-2 py-0.5 text-xs font-semibold text-ink",
														children: "Family"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
														className: "text-xs text-ink/60",
														dateTime: comment.createdAt,
														suppressHydrationWarning: true,
														children: formatCreationDate(comment.createdAt)
													}), canDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														className: "text-xs font-semibold text-ink/60 hover:text-ink",
														onClick: () => void handleRemoveComment(comment.id),
														children: "Delete"
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-ink/85",
												children: comment.body
											})]
										}, comment.id))
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-ink/60",
										children: "No comments yet. Be the first to leave feedback!"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										className: "space-y-2 pt-2",
										onSubmit: (event) => {
											event.preventDefault();
											handleAddComment(post.id);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "field py-2 text-sm",
												placeholder: "Your name",
												value: commenterName,
												onChange: (event) => updateCommenterName(event.target.value),
												"aria-label": "Your name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "field py-2 text-sm",
												placeholder: "Leave feedback or comment…",
												value: commentBodies[post.id] ?? "",
												onChange: (event) => setCommentBodies((prev) => ({
													...prev,
													[post.id]: event.target.value
												})),
												"aria-label": "Comment"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-2",
											children: [commentError[post.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-medium text-ink",
												role: "alert",
												children: commentError[post.id]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-ink/60",
												children: "Visitors can leave comments without signing in."
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "btn btn-fern min-h-10 px-4 text-sm",
												disabled: commentBusy === post.id,
												onClick: () => void handleAddComment(post.id),
												children: commentBusy === post.id ? "Posting…" : "Post comment"
											})]
										})]
									})
								]
							})
						]
					}, post.id);
				})
			}), totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-wrap items-center justify-between gap-3 pt-2",
				"aria-label": "Pagination",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-ink/70",
					children: [
						"Page ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-ink",
							children: page
						}),
						" of",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-ink",
							children: totalPages
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-quiet min-h-10 px-4 text-sm",
						disabled: page <= 1,
						onClick: () => setPage((p) => Math.max(1, p - 1)),
						children: "Previous"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-quiet min-h-10 px-4 text-sm",
						disabled: page >= totalPages,
						onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
						children: "Next"
					})]
				})]
			})] })
		]
	});
}
var KEY = "daily-dive.familyKey";
var VOICE_KEY = "daily-dive.voice";
function textOf(err) {
	return err instanceof Error && err.message ? err.message : "Something went wrong. Try again.";
}
function PostPage() {
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const [tab, setTab] = (0, import_react.useState)("quick");
	const [journal, setJournal] = (0, import_react.useState)(null);
	const [familyKey, setFamilyKey] = (0, import_react.useState)(null);
	const [voice, setVoice] = (0, import_react.useState)("me");
	const [prompt, setPrompt] = (0, import_react.useState)("What did today feel like?");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [notice, setNotice] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setPrompt(promptFor(/* @__PURE__ */ new Date()));
		const storedVoice = localStorage.getItem(VOICE_KEY);
		if (storedVoice === "me" || storedVoice === "sis") setVoice(storedVoice);
		getJournal().then((next) => setJournal(next)).catch(() => setError("Couldn't open the studio right now."));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!journal?.ready) return;
		const saved = localStorage.getItem(KEY);
		if (!saved) return;
		let cancel = false;
		checkKey({ data: { familyKey: saved } }).then(() => {
			if (!cancel) setFamilyKey(saved);
		}).catch(() => {
			localStorage.removeItem(KEY);
			if (!cancel) setFamilyKey(null);
		});
		return () => {
			cancel = true;
		};
	}, [journal?.ready]);
	function rememberKey(next) {
		localStorage.setItem(KEY, next);
		setFamilyKey(next);
	}
	function pickVoice(next) {
		if (next === "me" || next === "sis") {
			setVoice(next);
			localStorage.setItem(VOICE_KEY, next);
		}
	}
	async function submitFamilyDive(input) {
		if (!familyKey) {
			setError("Unlock posting with the family key first.");
			return false;
		}
		setBusy(true);
		setError(null);
		setNotice(null);
		try {
			await createDive({ data: {
				familyKey,
				voice,
				title: input.title,
				body: input.body,
				kind: input.kind,
				media: input.media,
				extra: input.extra,
				shared: input.shared
			} });
			setNotice("Posted to the vlog!");
			navigate({ to: "/" });
			return true;
		} catch (err) {
			setError(textOf(err));
			return false;
		} finally {
			setBusy(false);
		}
	}
	const canFamilyPost = Boolean(journal?.ready && (familyKey || user && journal.isOwner));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-3xl px-4 py-5 sm:py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm font-semibold text-fern",
					children: "← Back to the vlog"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-4xl leading-none",
					children: "Post a dive"
				})] }), isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-28 animate-pulse rounded-full bg-ink/10" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "btn btn-quiet",
					children: "Sign in"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-ink/80",
				children: journal?.ready ? `A dedicated spot for ${journal.myName} & ${journal.sisterName} to share moments on the personal vlog.` : "Set up your personal vlog once, then share moments from any phone."
			}),
			(error || notice) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 rounded-xl bg-sap px-4 py-3 text-sm font-medium text-ink",
				role: "status",
				children: error ?? notice
			}),
			!journal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 h-48 animate-pulse rounded-card bg-ink/10" }) : !journal.ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostDock, {
					myName: journal.myName,
					sisterName: journal.sisterName,
					allowGuestPosts: journal.allowGuestPosts,
					voice,
					onVoice: pickVoice,
					mode: "setup",
					busy,
					onClaim: async (input) => {
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
					},
					onUnlock: async () => {},
					onUpdateSettings: async () => {},
					onCreate: async () => false
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-card border border-ink/10 bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl",
							children: "Claim your vlog first"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-ink/80",
							children: "Sign in once with email and password so you can set your family key and name your two voices."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "btn btn-fern mt-4",
							children: "Sign in to set up"
						})
					]
				})
			}) : canFamilyPost ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							["quick", "New post"],
							["write", "Note & media"],
							["paint", "Paint nook"],
							["strings", "String bench"],
							["play", "Splat run"]
						].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: tab === key ? "btn btn-fern" : "btn btn-quiet",
							onClick: () => setTab(key),
							children: label
						}, key))
					}),
					tab === "quick" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewPostForm, {
						journal,
						familyKey,
						voice,
						onVoice: pickVoice,
						onUnlockKey: rememberKey,
						onPublished: () => {
							setNotice("Published to the vlog!");
							navigate({ to: "/" });
						}
					}),
					tab === "write" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostDock, {
						myName: journal.myName,
						sisterName: journal.sisterName,
						allowGuestPosts: journal.allowGuestPosts,
						voice,
						onVoice: pickVoice,
						mode: familyKey ? "open" : "enter",
						busy,
						onClaim: async () => {},
						onUnlock: async (key) => {
							setBusy(true);
							setError(null);
							try {
								await checkKey({ data: { familyKey: key } });
								rememberKey(key.trim());
								setNotice("Family posting is unlocked on this device.");
							} finally {
								setBusy(false);
							}
						},
						onUpdateSettings: async (settings) => {
							if (!familyKey) return;
							setBusy(true);
							try {
								const next = await updateJournalSettings({ data: {
									familyKey,
									...settings
								} });
								setJournal(next);
								setNotice("Settings saved.");
							} finally {
								setBusy(false);
							}
						},
						onCreate: (input) => submitFamilyDive({
							...input,
							extra: null
						})
					}),
					tab === "paint" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-card border border-ink/10 bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl",
								children: "Paint nook"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 mb-3 text-sm text-ink/70",
								children: prompt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaintNook, {
								canSave: Boolean(familyKey),
								busy,
								onSave: (media) => void submitFamilyDive({
									title: "A painting",
									body: prompt,
									kind: "painting",
									media,
									extra: null,
									shared: true
								})
							})
						]
					}),
					tab === "strings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-card border border-ink/10 bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl",
								children: "String bench"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 mb-3 text-sm text-ink/70",
								children: "Open strings, like a guitar you don't have to tune."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StringBench, {
								canSave: Boolean(familyKey),
								busy,
								onSave: (hits) => void submitFamilyDive({
									title: "A little riff",
									body: prompt,
									kind: "riff",
									media: null,
									extra: JSON.stringify(hits),
									shared: true
								})
							})
						]
					}),
					tab === "play" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-card border border-ink/10 bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl",
								children: "Splat run"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 mb-3 text-sm text-ink/70",
								children: "Drag the pick, or use the buttons."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplatRun, {
								canSave: Boolean(familyKey),
								busy,
								onSave: (score) => void submitFamilyDive({
									title: `Splat run · ${score}`,
									body: "Caught this many drips.",
									kind: "note",
									media: null,
									extra: null,
									shared: true
								})
							})
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewPostForm, {
					journal,
					familyKey,
					voice,
					onVoice: pickVoice,
					onUnlockKey: rememberKey,
					onPublished: () => {
						setNotice("Published to the vlog!");
						navigate({ to: "/" });
					}
				}), journal.allowGuestPosts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuestPostForm, {
					busy,
					onPost: async (input) => {
						setBusy(true);
						setError(null);
						try {
							await createDive({ data: {
								voice: "guest",
								authorLabel: input.authorName,
								title: input.title,
								body: input.body,
								kind: input.kind,
								media: input.media,
								extra: null,
								shared: true
							} });
							setNotice("Your guest post is live!");
							navigate({ to: "/" });
							return true;
						} catch (err) {
							setError(textOf(err));
							return false;
						} finally {
							setBusy(false);
						}
					}
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-card border border-ink/10 bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl",
							children: "Visiting?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-ink/80",
							children: [
								"This is ",
								journal.myName,
								" & ",
								journal.sisterName,
								"'s personal vlog. Only family can post new entries right now, but anyone can comment on posts back in the vlog!"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "btn btn-quiet mt-4",
							children: "Back to the vlog"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostList, { isOwner: journal?.isOwner })
			})
		]
	});
}
function GuestPostForm({ busy, onPost }) {
	const [authorName, setAuthorName] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [localError, setLocalError] = (0, import_react.useState)(null);
	const [recording, setRecording] = (0, import_react.useState)(false);
	const recRef = (0, import_react.useRef)(null);
	const chunks = (0, import_react.useRef)([]);
	async function takeFile(file) {
		if (!file) return;
		setLocalError(null);
		try {
			const prepared = await prepareFile(file);
			setDraft({
				kind: prepared.kind,
				media: prepared.media,
				label: file.name
			});
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
				if (blob.size > 1e6) {
					setLocalError("That was too long. Try under about 20 seconds.");
					return;
				}
				blobToDataUrl(blob).then((media) => {
					setDraft({
						kind: "audio",
						media,
						label: "Voice note"
					});
				});
			};
			recRef.current = rec;
			rec.start();
			setRecording(true);
			window.setTimeout(() => {
				if (rec.state === "recording") rec.stop();
			}, 2e4);
		} catch {
			setLocalError("Microphone permission was blocked.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-card border border-ink/10 bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl",
				children: "Post as a visitor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-ink/80",
				children: "Leave a note, photo, or short clip on the vlog."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 space-y-3",
				onSubmit: (event) => {
					event.preventDefault();
					setLocalError(null);
					const kind = draft?.kind ?? "note";
					const nextTitle = title.trim() || (draft ? "Visitor share" : "");
					if (!nextTitle) {
						setLocalError("Add a title or a file.");
						return;
					}
					onPost({
						authorName: authorName.trim() || "Visitor",
						title: nextTitle,
						body: body.trim(),
						kind,
						media: draft?.media ?? null
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						placeholder: "Your name",
						value: authorName,
						onChange: (event) => setAuthorName(event.target.value),
						"aria-label": "Your name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						placeholder: "Title",
						value: title,
						onChange: (event) => setTitle(event.target.value),
						"aria-label": "Title"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "field min-h-24",
						placeholder: "Say hello or share something…",
						value: body,
						onChange: (event) => setBody(event.target.value),
						"aria-label": "Note"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "btn btn-quiet",
							children: ["Photo, audio, or video", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "sr-only",
								type: "file",
								accept: "image/*,audio/*,video/*",
								onChange: (event) => {
									takeFile(event.target.files?.[0]);
									event.target.value = "";
								}
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: recording ? "btn btn-sap" : "btn btn-quiet",
							onClick: () => void toggleMic(),
							children: recording ? "Stop" : "Record"
						})]
					}),
					draft && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-ink/70",
						children: [
							"Ready: ",
							draft.label,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "font-semibold",
								onClick: () => setDraft(null),
								children: "Clear"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-sap w-full",
						type: "submit",
						disabled: busy,
						children: "Post to the vlog"
					}),
					localError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-ink",
						children: localError
					})
				]
			})
		]
	});
}
export { PostPage as component };
