import { o as __toESM } from "../_runtime.mjs";
import { _ as updateJournalSettings, a as UserButton, c as checkKey, d as getJournal, i as StringBench, l as claimJournal, m as promptFor, n as PostDock, p as prepareFile, r as SplatRun, s as blobToDataUrl, t as PaintNook, u as createDive, v as useCurrentUserState } from "./prompts-JHiHJe9k.mjs";
import { Ut as require_react, v as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/post-0PgbaLFN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "daily-dive.familyKey";
var VOICE_KEY = "daily-dive.voice";
function textOf(err) {
	return err instanceof Error && err.message ? err.message : "Something went wrong. Try again.";
}
function PostPage() {
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const [tab, setTab] = (0, import_react.useState)("write");
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
		setVoice(next);
		if (next === "me" || next === "sis") localStorage.setItem(VOICE_KEY, next);
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
	const canFamilyPost = Boolean(journal?.ready && familyKey);
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
					tab === "write" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostDock, {
						myName: journal.myName,
						sisterName: journal.sisterName,
						allowGuestPosts: journal.allowGuestPosts,
						voice,
						onVoice: pickVoice,
						mode: "open",
						busy,
						onClaim: async () => {},
						onUnlock: async () => {},
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
								canSave: canFamilyPost,
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
								canSave: canFamilyPost,
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
								canSave: canFamilyPost,
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostDock, {
					myName: journal.myName,
					sisterName: journal.sisterName,
					allowGuestPosts: journal.allowGuestPosts,
					voice,
					onVoice: pickVoice,
					mode: "enter",
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
					onUpdateSettings: async () => {},
					onCreate: async () => false
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
