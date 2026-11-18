import { o as __toESM } from "../_runtime.mjs";
import { _ as updateJournalSettings, a as UserButton, c as checkKey, d as getJournal, f as listDives, g as removeDive, h as removeComment, i as StringBench, l as claimJournal, m as promptFor, n as PostDock, o as addComment, r as SplatRun, t as PaintNook, u as createDive, v as useCurrentUserState } from "./prompts-YrqPArCC.mjs";
import { Ut as require_react, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/routes-Be3BHIgy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Clearing({ prompt, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "overflow-hidden rounded-card border border-ink/10 bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 640 280",
				className: "block h-auto w-full",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "640",
						height: "280",
						className: "fill-bg"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "530",
						cy: "64",
						r: "36",
						className: "fill-sap"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: "180",
						cy: "250",
						rx: "240",
						ry: "80",
						className: "fill-fern/25"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: "460",
						cy: "268",
						rx: "280",
						ry: "96",
						className: "fill-fern"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M250 280 C 280 230, 300 210, 340 168",
						fill: "none",
						className: "stroke-card",
						strokeWidth: "16",
						strokeLinecap: "round"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						transform: "translate(108 108)",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M48 62 L 18 128",
								className: "stroke-ink",
								strokeWidth: "4",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M48 62 L 86 128",
								className: "stroke-ink",
								strokeWidth: "4",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "12",
								y: "8",
								width: "74",
								height: "56",
								rx: "4",
								className: "fill-card stroke-ink",
								strokeWidth: "3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M22 46 C 36 22, 52 36, 74 18",
								fill: "none",
								className: "stroke-fern",
								strokeWidth: "3",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "30",
								cy: "22",
								r: "4",
								className: "fill-sap"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						transform: "translate(430 96)",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "46",
								y: "0",
								width: "8",
								height: "78",
								rx: "3",
								className: "fill-ink"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
								cx: "50",
								cy: "104",
								rx: "40",
								ry: "30",
								className: "fill-ink"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "50",
								cy: "104",
								r: "10",
								className: "fill-card"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M48 8 V 78",
								className: "stroke-sap",
								strokeWidth: "1.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M52 8 V 78",
								className: "stroke-sap",
								strokeWidth: "1.5"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "300",
						cy: "78",
						r: "8",
						className: "fill-sap"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "322",
						cy: "64",
						r: "5",
						className: "fill-card"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "286",
						cy: "58",
						r: "4",
						className: "fill-fern"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "absolute top-4 left-4 max-w-56 rounded-full bg-card/90 px-3 py-1 text-sm font-medium text-ink",
				children: ["Today: ", prompt]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 p-4 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Door, {
					kicker: "Paint",
					title: "Paint nook",
					detail: "A canvas for your sister.",
					tone: "sap",
					onClick: () => onPick("paint")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Door, {
					kicker: "Guitar",
					title: "String bench",
					detail: "Six strings you can actually play.",
					tone: "fern",
					onClick: () => onPick("strings")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Door, {
					kicker: "Game",
					title: "Splat run",
					detail: "Catch drips with a guitar pick.",
					tone: "quiet",
					onClick: () => onPick("play")
				})
			]
		})]
	});
}
function Door({ kicker, title, detail, tone, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: `min-h-24 rounded-2xl px-4 py-3 text-left ${tone === "sap" ? "bg-sap text-ink" : tone === "fern" ? "bg-fern text-card" : "bg-bg text-ink"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-xs font-semibold tracking-wide uppercase opacity-80",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block font-display text-2xl leading-none",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-2 block text-sm opacity-80",
				children: detail
			})
		]
	});
}
var FREQS = [
	82.41,
	110,
	146.83,
	196,
	246.94,
	329.63
];
var COMMENTER_KEY = "daily-dive.commenterName";
function playRiff(extra) {
	let hits = [];
	try {
		const parsed = JSON.parse(extra);
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
		const when = ctx.currentTime + hit.t / 1e3;
		gain.gain.setValueAtTime(1e-4, when);
		gain.gain.exponentialRampToValueAtTime(.16, when + .02);
		gain.gain.exponentialRampToValueAtTime(1e-4, when + .9);
		osc.connect(gain).connect(ctx.destination);
		osc.start(when);
		osc.stop(when + 1);
	}
}
function DiveBook({ dives, journal, canModerate, pendingRemove, onRemove, onComment, onRemoveComment }) {
	const [armed, setArmed] = (0, import_react.useState)(null);
	const [openComments, setOpenComments] = (0, import_react.useState)({});
	const [commenterName, setCommenterName] = (0, import_react.useState)("");
	const [commentBodies, setCommentBodies] = (0, import_react.useState)({});
	const [commentBusy, setCommentBusy] = (0, import_react.useState)(null);
	const [commentError, setCommentError] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem(COMMENTER_KEY);
		if (saved) setCommenterName(saved);
	}, []);
	function updateName(value) {
		setCommenterName(value);
		localStorage.setItem(COMMENTER_KEY, value);
	}
	async function submitComment(diveId) {
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
			await onComment({
				diveId,
				authorName: commenterName.trim() || "Visitor",
				body
			});
			setCommentBodies((prev) => ({
				...prev,
				[diveId]: ""
			}));
		} catch (err) {
			setCommentError((prev) => ({
				...prev,
				[diveId]: err instanceof Error && err.message ? err.message : "Couldn't post comment."
			}));
		} finally {
			setCommentBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl",
				children: "The vlog book"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ink/70",
				children: dives.length === 0 ? "Nothing yet" : `${dives.length} posts`
			})]
		}), dives.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-card border border-ink/10 bg-card px-4 py-6 text-ink/80",
			children: "The book is still blank. Paint something, pluck a string, or post a moment from today."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-4 border-l-2 border-fern/30 pl-4",
			children: dives.map((dive) => {
				const who = dive.voice === "me" ? journal.myName : dive.voice === "sis" ? journal.sisterName : dive.authorLabel || "Visitor";
				const badgeClass = dive.voice === "me" ? "bg-fern text-card" : dive.voice === "sis" ? "bg-sap text-ink" : "border border-ink/15 bg-bg text-ink";
				const isFormOpen = Boolean(openComments[dive.id]);
				const canDeleteThis = dive.mine || canModerate;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-card border border-ink/10 bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full px-3 py-1 text-sm font-semibold ${badgeClass}`,
									children: who
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold tracking-wide text-ink/60 uppercase",
									children: dive.kind
								}),
								dive.voice === "guest" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-ink/60",
									children: "Visitor post"
								}),
								!dive.shared && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-ink/60",
									children: "Only you"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-display text-2xl",
							children: dive.title
						}),
						dive.body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-ink/80",
							children: dive.body
						}),
						dive.media && dive.kind === "video" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							className: "mt-3 w-full rounded-xl",
							controls: true,
							playsInline: true,
							src: dive.media
						}),
						dive.media && (dive.kind === "photo" || dive.kind === "painting") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "mt-3 w-full rounded-xl",
							alt: dive.title,
							src: dive.media
						}),
						dive.media && dive.kind === "audio" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
							className: "mt-3 w-full",
							controls: true,
							src: dive.media
						}),
						dive.kind === "riff" && dive.extra && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-sap mt-3",
							onClick: () => playRiff(dive.extra ?? ""),
							children: "Play riff"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
								className: "text-sm text-ink/60",
								dateTime: dive.createdAt,
								suppressHydrationWarning: true,
								children: new Date(dive.createdAt).toLocaleString(void 0, {
									month: "short",
									day: "numeric",
									hour: "numeric",
									minute: "2-digit"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-sm font-semibold text-fern",
									onClick: () => setOpenComments((prev) => ({
										...prev,
										[dive.id]: !prev[dive.id]
									})),
									children: isFormOpen ? "Hide comment box" : "Leave a comment"
								}), canDeleteThis && (armed === dive.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "btn btn-quiet",
										disabled: pendingRemove === dive.id,
										onClick: () => onRemove(dive.id),
										children: "Remove"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "btn btn-quiet",
										onClick: () => setArmed(null),
										children: "Keep"
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-sm font-semibold text-ink/70",
									onClick: () => setArmed(dive.id),
									children: "Remove"
								}))]
							})]
						}),
						(dive.comments.length > 0 || isFormOpen) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-2 border-t border-ink/10 pt-3",
							children: [dive.comments.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2",
								children: dive.comments.map((comment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
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
												children: new Date(comment.createdAt).toLocaleString(void 0, {
													month: "short",
													day: "numeric",
													hour: "numeric",
													minute: "2-digit"
												})
											}), canModerate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "text-xs font-semibold text-ink/60 hover:text-ink",
												onClick: () => void onRemoveComment(comment.id),
												children: "Delete"
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-ink/85",
										children: comment.body
									})]
								}, comment.id))
							}), isFormOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "space-y-2 pt-1",
								onSubmit: (event) => {
									event.preventDefault();
									submitComment(dive.id);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field py-2 text-sm",
										placeholder: "Your name",
										value: commenterName,
										onChange: (event) => updateName(event.target.value),
										"aria-label": "Your name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field py-2 text-sm",
										placeholder: "Write a comment…",
										value: commentBodies[dive.id] ?? "",
										onChange: (event) => setCommentBodies((prev) => ({
											...prev,
											[dive.id]: event.target.value
										})),
										"aria-label": "Comment"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [commentError[dive.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium text-ink",
										children: commentError[dive.id]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-ink/60",
										children: "Visitors can comment without signing in."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "btn btn-fern min-h-10 px-4 text-sm",
										disabled: commentBusy === dive.id,
										children: commentBusy === dive.id ? "Posting…" : "Post comment"
									})]
								})]
							})]
						})
					]
				}, dive.id);
			})
		})]
	});
}
var KEY = "daily-dive.familyKey";
var VOICE_KEY = "daily-dive.voice";
function textOf(err) {
	return err instanceof Error && err.message ? err.message : "Something went wrong. Try again.";
}
function Home() {
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("clearing");
	const [journal, setJournal] = (0, import_react.useState)(null);
	const [dives, setDives] = (0, import_react.useState)(null);
	const [familyKey, setFamilyKey] = (0, import_react.useState)(null);
	const [voice, setVoice] = (0, import_react.useState)("me");
	const [prompt, setPrompt] = (0, import_react.useState)("What did today feel like?");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [notice, setNotice] = (0, import_react.useState)(null);
	const [pendingRemove, setPendingRemove] = (0, import_react.useState)(null);
	const [loadError, setLoadError] = (0, import_react.useState)(null);
	async function refresh() {
		const [nextJournal, nextDives] = await Promise.all([getJournal(), listDives()]);
		setJournal(nextJournal);
		setDives(nextDives);
		setLoadError(null);
	}
	(0, import_react.useEffect)(() => {
		setPrompt(promptFor(/* @__PURE__ */ new Date()));
		const storedVoice = localStorage.getItem(VOICE_KEY);
		if (storedVoice === "me" || storedVoice === "sis") setVoice(storedVoice);
		refresh().catch(() => setLoadError("The book couldn't open. Try again in a moment."));
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
		setVoice(next);
		if (next === "me" || next === "sis") localStorage.setItem(VOICE_KEY, next);
	}
	async function submit(input) {
		if (!familyKey) {
			setMode("clearing");
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-5xl px-4 py-5 sm:py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-wide text-ink/60 uppercase",
					children: "Personal vlog for two"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl leading-none",
					children: "Daily Dive"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/post",
						className: "btn btn-sap",
						children: "Post a dive"
					}), isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-28 animate-pulse rounded-full bg-ink/10" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "btn btn-fern",
						children: "Sign in"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-ink/80",
				children: journal?.ready ? `${journal.myName} & ${journal.sisterName}'s personal vlog — paintings, guitar, and daily moments. Visitors can watch, play, and leave a comment.` : "My personal vlog with my sister — paintings, guitar, and whatever today was. Visitors can watch, play, and comment on any post."
			}),
			mode !== "clearing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-quiet mt-4",
				onClick: () => setMode("clearing"),
				children: "Back to the clearing"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [
					mode === "clearing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clearing, {
						prompt,
						onPick: setMode
					}),
					mode === "paint" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
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
								canSave,
								busy,
								onSave: (media) => void submit({
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
					mode === "strings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
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
								canSave,
								busy,
								onSave: (hits) => void submit({
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
					mode === "play" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
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
								canSave,
								busy,
								onSave: (score) => void submit({
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
			}),
			(error || notice) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 rounded-xl bg-sap px-4 py-3 text-sm font-medium text-ink",
				role: "status",
				children: error ?? notice
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
				children: [isPending || !journal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-card bg-ink/10" }) : user || familyKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostDock, {
					myName: journal.myName,
					sisterName: journal.sisterName,
					allowGuestPosts: journal.allowGuestPosts,
					voice,
					onVoice: pickVoice,
					mode: dockMode,
					busy,
					onClaim: async (input) => {
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
					},
					onUnlock: async (key) => {
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
					onCreate: (input) => submit({
						...input,
						extra: null
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-card border border-ink/10 bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl",
							children: "Visiting our vlog"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-ink/80",
							children: ["You can play the paint nook, the strings, and splat run, and leave comments on any post in the vlog book.", journal.allowGuestPosts ? " Visitor posts are also open right now on the post page!" : " Only family can post new dives."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/post",
								className: "btn btn-fern",
								children: journal.allowGuestPosts ? "Post on the vlog" : "Family post page"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "btn btn-quiet",
								children: "Sign in"
							})]
						})
					]
				}), loadError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-card border border-ink/10 bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: loadError }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-quiet mt-3",
						onClick: () => void refresh(),
						children: "Try again"
					})]
				}) : dives && journal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiveBook, {
					dives,
					journal,
					canModerate: Boolean(familyKey),
					pendingRemove,
					onRemove: (id) => {
						if (!familyKey) {
							setError("Unlock posting before removing a dive.");
							return;
						}
						setPendingRemove(id);
						removeDive({ data: {
							id,
							familyKey
						} }).then(() => refresh()).catch((err) => setError(textOf(err))).finally(() => setPendingRemove(null));
					},
					onComment: async ({ diveId, authorName, body }) => {
						await addComment({ data: {
							diveId,
							authorName,
							body,
							familyKey: familyKey ?? void 0
						} });
						await refresh();
					},
					onRemoveComment: async (commentId) => {
						if (!familyKey) return;
						await removeComment({ data: {
							id: commentId,
							familyKey
						} });
						await refresh();
					}
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-card bg-ink/10" })]
			})
		]
	});
}
export { Home as component };
