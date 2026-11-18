import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, n as createMiddleware, r as createServerFn } from "./ssr.mjs";
import { i as signOut, t as authClient } from "./client-1vAx-gM_.mjs";
import { t as authMiddleware } from "./middleware-BTnXpzi8.mjs";
import { a as hasGateSessionMarker } from "./server-CWQvg8M4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CTg38IQf.js
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
function DiveBook({ dives, journal, pendingRemove, onRemove }) {
	const [armed, setArmed] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl",
				children: "The book"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ink/70",
				children: dives.length === 0 ? "Nothing yet" : `${dives.length} dives`
			})]
		}), dives.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-card border border-ink/10 bg-card px-4 py-6 text-ink/80",
			children: "The book is still blank. Paint something, pluck a string, or drop in a photo from today."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-4 border-l-2 border-fern/30 pl-4",
			children: dives.map((dive) => {
				const who = dive.voice === "me" ? journal.myName : journal.sisterName;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-card border border-ink/10 bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full px-3 py-1 text-sm font-semibold ${dive.voice === "me" ? "bg-fern text-card" : "bg-sap text-ink"}`,
									children: who
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold tracking-wide text-ink/60 uppercase",
									children: dive.kind
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
							}), dive.mine && (armed === dive.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
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
						})
					]
				}, dive.id);
			})
		})]
	});
}
var PIGMENTS = [
	"#14281c",
	"#1f7a45",
	"#7dba6a",
	"#d7e56c",
	"#f7fbf4",
	"#c46b4a",
	"#3d6f8c",
	"#e7b3c4"
];
function PaintNook({ canSave, busy, onSave }) {
	const canvasRef = (0, import_react.useRef)(null);
	const undoRef = (0, import_react.useRef)([]);
	const drawing = (0, import_react.useRef)(false);
	const [color, setColor] = (0, import_react.useState)(PIGMENTS[1]);
	const [size, setSize] = (0, import_react.useState)(10);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		canvas.width = Math.max(1, Math.round(rect.width * dpr));
		canvas.height = Math.max(1, Math.round(rect.height * dpr));
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.fillStyle = "#f7fbf4";
		ctx.fillRect(0, 0, rect.width, rect.height);
	}, []);
	function ctxOf() {
		const canvas = canvasRef.current;
		if (!canvas) return null;
		const ctx = canvas.getContext("2d");
		if (!ctx) return null;
		return {
			canvas,
			ctx
		};
	}
	function snapshot() {
		const pair = ctxOf();
		if (!pair) return;
		const data = pair.ctx.getImageData(0, 0, pair.canvas.width, pair.canvas.height);
		undoRef.current.push(data);
		if (undoRef.current.length > 8) undoRef.current.shift();
	}
	function point(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
	}
	function down(event) {
		const pair = ctxOf();
		if (!pair) return;
		snapshot();
		event.currentTarget.setPointerCapture(event.pointerId);
		drawing.current = true;
		const p = point(event);
		pair.ctx.strokeStyle = color;
		pair.ctx.fillStyle = color;
		pair.ctx.lineWidth = size;
		pair.ctx.lineCap = "round";
		pair.ctx.lineJoin = "round";
		pair.ctx.beginPath();
		pair.ctx.arc(p.x, p.y, size / 2, 0, Math.PI * 2);
		pair.ctx.fill();
		pair.ctx.beginPath();
		pair.ctx.moveTo(p.x, p.y);
	}
	function move(event) {
		if (!drawing.current) return;
		const pair = ctxOf();
		if (!pair) return;
		const p = point(event);
		pair.ctx.strokeStyle = color;
		pair.ctx.lineWidth = size;
		pair.ctx.lineCap = "round";
		pair.ctx.lineTo(p.x, p.y);
		pair.ctx.stroke();
		pair.ctx.beginPath();
		pair.ctx.moveTo(p.x, p.y);
	}
	function up() {
		drawing.current = false;
	}
	function undo() {
		const pair = ctxOf();
		const data = undoRef.current.pop();
		if (!pair || !data) return;
		pair.ctx.setTransform(1, 0, 0, 1, 0, 0);
		pair.ctx.putImageData(data, 0, 0);
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		pair.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	}
	function clear() {
		const pair = ctxOf();
		if (!pair) return;
		snapshot();
		const rect = pair.canvas.getBoundingClientRect();
		pair.ctx.fillStyle = "#f7fbf4";
		pair.ctx.fillRect(0, 0, rect.width, rect.height);
	}
	function save() {
		const canvas = canvasRef.current;
		if (!canvas) return;
		onSave(canvas.toDataURL("image/jpeg", .85));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [PIGMENTS.map((pigment) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `Paint color ${pigment}`,
					onClick: () => setColor(pigment),
					className: `h-11 w-11 rounded-full border-2 ${color === pigment ? "border-ink" : "border-ink/15"}`,
					style: { backgroundColor: pigment }
				}, pigment)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ml-auto flex items-center gap-2 text-sm text-ink/70",
					children: ["Brush", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 4,
						max: 36,
						value: size,
						onChange: (event) => setSize(Number(event.target.value)),
						className: "w-24"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "h-80 w-full touch-none rounded-card border border-ink/10 bg-card",
				onPointerDown: down,
				onPointerMove: move,
				onPointerUp: up,
				onPointerCancel: up
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-quiet",
						onClick: undo,
						children: "Undo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-quiet",
						onClick: clear,
						children: "Clear"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-fern",
						disabled: busy,
						onClick: save,
						children: canSave ? "Save painting" : "Sign in to keep it"
					})
				]
			})
		]
	});
}
async function compressImage(file) {
	const url = URL.createObjectURL(file);
	try {
		const img = await loadImage(url);
		const scale = Math.min(1, 1280 / Math.max(img.width, img.height));
		const w = Math.max(1, Math.round(img.width * scale));
		const h = Math.max(1, Math.round(img.height * scale));
		const canvas = document.createElement("canvas");
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Couldn't prepare that photo.");
		ctx.fillStyle = "#f7fbf4";
		ctx.fillRect(0, 0, w, h);
		ctx.drawImage(img, 0, 0, w, h);
		return canvas.toDataURL("image/jpeg", .72);
	} finally {
		URL.revokeObjectURL(url);
	}
}
function loadImage(url) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject(/* @__PURE__ */ new Error("Couldn't read that photo."));
		img.src = url;
	});
}
function blobToDataUrl(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Couldn't read that file."));
		reader.readAsDataURL(blob);
	});
}
async function prepareFile(file) {
	if (file.type.startsWith("image/")) return {
		kind: "photo",
		media: await compressImage(file)
	};
	if (file.type.startsWith("audio/")) {
		if (file.size > 1e6) throw new Error("That audio is too long. Try under about 20 seconds.");
		return {
			kind: "audio",
			media: await blobToDataUrl(file)
		};
	}
	if (file.type.startsWith("video/")) {
		if (file.size > 12e5) throw new Error("That video is too big. Try a photo, or a clip under about 1 MB.");
		return {
			kind: "video",
			media: await blobToDataUrl(file)
		};
	}
	throw new Error("Use a photo, an audio file, or a short video.");
}
function PostDock({ myName, sisterName, voice, onVoice, mode, busy, onClaim, onUnlock, onRename, onCreate }) {
	const [familyKey, setFamilyKey] = (0, import_react.useState)("");
	const [mine, setMine] = (0, import_react.useState)(myName);
	const [sis, setSis] = (0, import_react.useState)(sisterName);
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [shared, setShared] = (0, import_react.useState)(true);
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
				children: "Add a dive"
			}),
			mode === "setup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 space-y-3",
				onSubmit: (event) => {
					event.preventDefault();
					setLocalError(null);
					onClaim({
						familyKey,
						myName: mine,
						sisterName: sis
					}).catch((err) => {
						setLocalError(err instanceof Error ? err.message : "Couldn't save the key.");
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink/80",
						children: "Pick a short secret you and your sister both know. Do this before you share the link. Visitors can watch. Only the key can post."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold",
						children: ["Your name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1",
							value: mine,
							onChange: (event) => setMine(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold",
						children: ["Sister's name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1",
							value: sis,
							onChange: (event) => setSis(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold",
						children: ["Family key", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1",
							type: "password",
							autoComplete: "new-password",
							value: familyKey,
							onChange: (event) => setFamilyKey(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-fern",
						type: "submit",
						disabled: busy,
						children: "Save our key"
					})
				]
			}),
			mode === "enter" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 space-y-3",
				onSubmit: (event) => {
					event.preventDefault();
					setLocalError(null);
					onUnlock(familyKey).catch((err) => {
						setLocalError(err instanceof Error ? err.message : "That key doesn't match.");
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink/80",
						children: "Type the family key to post from this device."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						type: "password",
						autoComplete: "current-password",
						value: familyKey,
						onChange: (event) => setFamilyKey(event.target.value),
						"aria-label": "Family key"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-fern",
						type: "submit",
						disabled: busy,
						children: "Unlock posting"
					})
				]
			}),
			mode === "open" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 space-y-3",
				onSubmit: (event) => {
					event.preventDefault();
					setLocalError(null);
					const kind = draft?.kind ?? "note";
					const fallback = kind === "photo" ? "A photo" : kind === "audio" ? "A sound" : kind === "video" ? "A clip" : "A note";
					const nextTitle = title.trim() || (draft ? fallback : "");
					if (!nextTitle) {
						setLocalError("Add a title, a note, or a file.");
						return;
					}
					onCreate({
						title: nextTitle,
						body: body.trim(),
						kind,
						media: draft?.media ?? null,
						shared
					}).then((ok) => {
						if (!ok) return;
						setTitle("");
						setBody("");
						setDraft(null);
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: voice === "me" ? "btn btn-fern" : "btn btn-quiet",
							onClick: () => onVoice("me"),
							children: myName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: voice === "sis" ? "btn btn-sap" : "btn btn-quiet",
							onClick: () => onVoice("sis"),
							children: sisterName
						})]
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
						placeholder: "What happened?",
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: shared,
							onChange: (event) => setShared(event.target.checked)
						}), "Visitors can watch this one"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink/70",
						children: "Only post pictures you're okay with other people seeing."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-fern",
						type: "submit",
						disabled: busy,
						children: "Post it"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
							className: "cursor-pointer font-semibold",
							children: "Our names"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field",
									value: mine,
									onChange: (event) => setMine(event.target.value),
									"aria-label": "Your name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field",
									value: sis,
									onChange: (event) => setSis(event.target.value),
									"aria-label": "Sister's name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn btn-quiet",
									disabled: busy,
									onClick: () => {
										setLocalError(null);
										onRename({
											myName: mine,
											sisterName: sis
										}).catch((err) => {
											setLocalError(err instanceof Error ? err.message : "Couldn't rename.");
										});
									},
									children: "Save names"
								})
							]
						})]
					})
				]
			}),
			localError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm font-medium text-ink",
				children: localError
			})
		]
	});
}
var COLORS = [
	"#1f7a45",
	"#d7e56c",
	"#c46b4a",
	"#3d6f8c",
	"#e7b3c4"
];
var BEST_KEY = "daily-dive.best";
function SplatRun({ canSave, busy, onSave }) {
	const canvasRef = (0, import_react.useRef)(null);
	const wrapRef = (0, import_react.useRef)(null);
	const state = (0, import_react.useRef)({
		running: false,
		over: false,
		score: 0,
		lives: 3,
		pick: .5,
		drops: [],
		last: 0,
		spawn: 0
	});
	const [score, setScore] = (0, import_react.useState)(0);
	const [lives, setLives] = (0, import_react.useState)(3);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [over, setOver] = (0, import_react.useState)(false);
	const [best, setBest] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const saved = Number(localStorage.getItem(BEST_KEY) || 0);
		if (Number.isFinite(saved)) setBest(saved);
	}, []);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		let frame = 0;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		function resize() {
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.max(1, Math.round(rect.width * dpr));
			canvas.height = Math.max(1, Math.round(rect.height * dpr));
		}
		resize();
		const observer = new ResizeObserver(resize);
		observer.observe(canvas);
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		function loop(now) {
			frame = requestAnimationFrame(loop);
			if (!canvas || !ctx) return;
			const game = state.current;
			const w = canvas.width;
			const h = canvas.height;
			ctx.clearRect(0, 0, w, h);
			ctx.fillStyle = "#e7f2e1";
			ctx.fillRect(0, 0, w, h);
			if (game.running) {
				const dt = Math.min(32, now - (game.last || now));
				game.last = now;
				game.spawn += dt;
				const every = reduced ? 900 : 620;
				if (game.spawn > every && game.drops.length < 10) {
					game.spawn = 0;
					game.drops.push({
						x: 24 + Math.random() * (w - 48),
						y: -10,
						r: 10 + Math.random() * 10,
						vy: (reduced ? .08 : .16) + Math.random() * .12,
						color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? COLORS[0]
					});
				}
				const next = [];
				for (const drop of game.drops) {
					drop.y += drop.vy * dt;
					const pickX = game.pick * w;
					if (drop.y > h - 46 && Math.abs(drop.x - pickX) < 26 + drop.r) {
						game.score += 1;
						setScore(game.score);
						continue;
					}
					if (drop.y > h + 8) {
						game.lives -= 1;
						setLives(game.lives);
						if (game.lives <= 0) {
							game.running = false;
							game.over = true;
							setRunning(false);
							setOver(true);
							setBest((prev) => {
								const nextBest = Math.max(prev, game.score);
								localStorage.setItem(BEST_KEY, String(nextBest));
								return nextBest;
							});
						}
						continue;
					}
					next.push(drop);
				}
				game.drops = next;
			}
			for (const drop of game.drops) {
				ctx.beginPath();
				ctx.fillStyle = drop.color;
				ctx.arc(drop.x, drop.y, drop.r, 0, Math.PI * 2);
				ctx.fill();
			}
			const pickX = game.pick * w;
			ctx.fillStyle = "#14281c";
			ctx.beginPath();
			ctx.moveTo(pickX, h - 18);
			ctx.lineTo(pickX - 18, h - 46);
			ctx.lineTo(pickX + 18, h - 46);
			ctx.closePath();
			ctx.fill();
		}
		frame = requestAnimationFrame(loop);
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
		};
	}, []);
	function moveTo(clientX) {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const ratio = (clientX - rect.left) / rect.width;
		state.current.pick = Math.min(.92, Math.max(.08, ratio));
	}
	function nudge(dir) {
		state.current.pick = Math.min(.92, Math.max(.08, state.current.pick + dir * .08));
	}
	function start() {
		state.current = {
			running: true,
			over: false,
			score: 0,
			lives: 3,
			pick: .5,
			drops: [],
			last: 0,
			spawn: 0
		};
		setScore(0);
		setLives(3);
		setOver(false);
		setRunning(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-sm font-semibold",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: ["Score ", score]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: ["Best ", best]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-label": `${lives} lives left`,
						children: "●".repeat(Math.max(0, lives))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: wrapRef,
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
					ref: canvasRef,
					className: "h-80 w-full touch-none rounded-card border border-ink/10",
					onPointerDown: (event) => {
						event.currentTarget.setPointerCapture(event.pointerId);
						moveTo(event.clientX);
					},
					onPointerMove: (event) => {
						if (event.buttons || event.currentTarget.hasPointerCapture(event.pointerId)) moveTo(event.clientX);
					}
				}), !running && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 grid place-items-center p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xs rounded-card bg-card px-4 py-4 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl",
								children: over ? "Nice run" : "Splat run"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-ink/70",
								children: over ? `You caught ${score}.` : "Drag the pick. Catch the drips before they hit the grass."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-fern mt-3 w-full",
								onClick: start,
								children: over ? "Play again" : "Play"
							}),
							over && canSave && score > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-quiet mt-2 w-full",
								disabled: busy,
								onClick: () => onSave(score),
								children: "Pin this score"
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-quiet",
					onClick: () => nudge(-1),
					children: "Left"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-quiet",
					onClick: () => nudge(1),
					children: "Right"
				})]
			})
		]
	});
}
var STRINGS = [
	{
		name: "Low E",
		freq: 82.41
	},
	{
		name: "A",
		freq: 110
	},
	{
		name: "D",
		freq: 146.83
	},
	{
		name: "G",
		freq: 196
	},
	{
		name: "B",
		freq: 246.94
	},
	{
		name: "High E",
		freq: 329.63
	}
];
var PATTERNS = [
	{
		name: "Walk",
		notes: [
			0,
			1,
			2,
			3,
			4,
			5
		]
	},
	{
		name: "Bright",
		notes: [
			5,
			3,
			4,
			2,
			4,
			5
		]
	},
	{
		name: "Moss",
		notes: [
			0,
			2,
			4,
			2,
			1,
			0
		]
	}
];
function StringBench({ canSave, busy, onSave }) {
	const ctxRef = (0, import_react.useRef)(null);
	const [pulse, setPulse] = (0, import_react.useState)(() => STRINGS.map(() => 0));
	const [recording, setRecording] = (0, import_react.useState)(false);
	const [hits, setHits] = (0, import_react.useState)([]);
	const started = (0, import_react.useRef)(0);
	const timers = (0, import_react.useRef)([]);
	(0, import_react.useEffect)(() => {
		return () => {
			timers.current.forEach((id) => window.clearTimeout(id));
			ctxRef.current?.close();
		};
	}, []);
	function audio() {
		if (!ctxRef.current) ctxRef.current = new AudioContext();
		if (ctxRef.current.state === "suspended") ctxRef.current.resume();
		return ctxRef.current;
	}
	function pluck(index, fromPlayback = false) {
		const string = STRINGS[index];
		if (!string) return;
		const ctx = audio();
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = "triangle";
		osc.frequency.value = string.freq;
		const now = ctx.currentTime;
		gain.gain.setValueAtTime(1e-4, now);
		gain.gain.exponentialRampToValueAtTime(.18, now + .02);
		gain.gain.exponentialRampToValueAtTime(1e-4, now + 1.05);
		osc.connect(gain).connect(ctx.destination);
		osc.start(now);
		osc.stop(now + 1.1);
		setPulse((prev) => prev.map((n, i) => i === index ? n + 1 : n));
		if (recording && !fromPlayback) {
			const t = Math.round(performance.now() - started.current);
			setHits((prev) => prev.length >= 48 ? prev : [...prev, {
				i: index,
				t
			}]);
		}
	}
	function playHits(next) {
		timers.current.forEach((id) => window.clearTimeout(id));
		timers.current = next.map((hit) => window.setTimeout(() => pluck(hit.i, true), hit.t));
	}
	function playPattern(notes) {
		const sequence = notes.map((i, step) => ({
			i,
			t: step * 180
		}));
		playHits(sequence);
		if (recording) {
			const base = Math.round(performance.now() - started.current);
			setHits((prev) => {
				const added = sequence.map((hit) => ({
					i: hit.i,
					t: base + hit.t
				}));
				return [...prev, ...added].slice(0, 48);
			});
		}
	}
	function toggleRecord() {
		if (recording) {
			setRecording(false);
			return;
		}
		setHits([]);
		started.current = performance.now();
		setRecording(true);
		window.setTimeout(() => setRecording(false), 12e3);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: STRINGS.map((string, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => pluck(index),
					className: "flex min-h-12 w-full items-center gap-3 rounded-full border border-ink/10 bg-card px-4 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-16 text-sm font-semibold",
						children: string.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 flex-1 origin-center rounded-full bg-fern motion-safe:animate-[pluck_280ms_ease-out]" }, pulse[index])]
				}, string.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: PATTERNS.map((pattern) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-quiet",
					onClick: () => playPattern(pattern.notes),
					children: pattern.name
				}, pattern.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: recording ? "btn btn-sap" : "btn btn-quiet",
						onClick: toggleRecord,
						children: recording ? "Stop riff" : "Record a riff"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-quiet",
						disabled: hits.length === 0,
						onClick: () => playHits(hits),
						children: "Play it back"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-fern",
						disabled: busy || hits.length === 0,
						onClick: () => onSave(hits),
						children: canSave ? "Save riff" : "Sign in to keep it"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ink/70",
				children: recording ? "Recording… pluck away. It stops itself after 12 seconds." : hits.length ? `${hits.length} notes ready.` : "Tap a string. Low E is the thick one."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `@keyframes pluck { 0% { transform: scaleY(1); } 35% { transform: scaleY(4); } 100% { transform: scaleY(1); } }` })
		]
	});
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	return useSessionUserState();
}
function useSessionUserState() {
	const { data, isPending } = authClient.useSession();
	const id = data?.user.id;
	const displayName = data?.user.name ?? null;
	const primaryEmail = data?.user.email ?? null;
	const profileImageUrl = data?.user.image ?? null;
	const user = (0, import_react.useMemo)(() => id ? {
		id,
		displayName,
		primaryEmail,
		profileImageUrl,
		isDevFallback: false
	} : null, [
		id,
		displayName,
		primaryEmail,
		profileImageUrl
	]);
	return (0, import_react.useMemo)(() => ({
		user,
		isPending
	}), [user, isPending]);
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var optionalAuth = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-1vAx-gM_.mjs").then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { getSessionUser } = await import("./verify.server-CHnc-QMx.mjs");
	return next({ context: { userId: (await getSessionUser(context.bearerToken))?.id ?? null } });
});
var getJournal = createServerFn({ method: "GET" }).handler(createSsrRpc("e82c2360d3b9e2a68b6cd566daed811df0847e0801e7aa853e828ac80de9f6fb"));
var listDives = createServerFn({ method: "GET" }).middleware([optionalAuth]).handler(createSsrRpc("135d68d34606ddf2549bfc89f9bddf6abc75904db647617c10888e5e25ac4056"));
var claimJournal = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("b01d2dfac8f18ca68c6f26e2c10ab88d7ff837c94d4763cb8d15147afd2e5221"));
var checkKey = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("88866644aa23515aadac4a7ae978f8e47e267033a40fa42ca59498325ea4b74f"));
var createDive = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("8d3d3b997a058765dfc34f3de5740cebba35a271e12dcf0c0e443b184dcacf39"));
var removeDive = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("dd4e887a115efb99e5c85ffbbe12a8a797f61553c285322343af6a942be42ad4"));
var PROMPTS = [
	"Paint one color that feels like today.",
	"Play three notes that sound like the weather.",
	"A photo of something green you walked past.",
	"Draw the snack you wish you had.",
	"Ten seconds of a song stuck in your head.",
	"The messiest beautiful thing in the room.",
	"A chord for the best part of the day.",
	"Paint what the sky is doing right now."
];
function promptFor(date) {
	const start = Date.UTC(date.getFullYear(), 0, 0);
	const day = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start) / 864e5);
	return PROMPTS[Math.abs(day) % PROMPTS.length] ?? PROMPTS[0];
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
		if (!user || !journal?.ready) return;
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
	}, [user?.id, journal?.ready]);
	function rememberKey(next) {
		localStorage.setItem(KEY, next);
		setFamilyKey(next);
	}
	function pickVoice(next) {
		setVoice(next);
		localStorage.setItem(VOICE_KEY, next);
	}
	async function submit(input) {
		if (!user) {
			setError("Sign in to keep this in the book.");
			return false;
		}
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
			setNotice("Saved. It's in the book.");
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
	const canSave = Boolean(user && familyKey);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-5xl px-4 py-5 sm:py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-wide text-ink/60 uppercase",
					children: "A place for two"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl leading-none",
					children: "Daily Dive"
				})] }), isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-28 animate-pulse rounded-full bg-ink/10" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "btn btn-fern",
					children: "Sign in to post"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-ink/80",
				children: "Paint, guitar, and whatever today was. You two can add from any phone. Everyone else can only watch."
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
				children: [isPending || !journal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-card bg-ink/10" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostDock, {
					myName: journal.myName,
					sisterName: journal.sisterName,
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
					onRename: async (names) => {
						if (!familyKey) return;
						setBusy(true);
						try {
							const next = await claimJournal({ data: {
								familyKey,
								myName: names.myName,
								sisterName: names.sisterName
							} });
							setJournal(next);
							setNotice("Names saved.");
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
							children: "Watching"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-ink/80",
							children: "You can play the paint nook, the strings, and splat run. Saving a dive needs a sign-in."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "btn btn-fern mt-4",
							children: "Sign in to post"
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
					}
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-card bg-ink/10" })]
			})
		]
	});
}
//#endregion
export { Home as component };
