import { o as __toESM } from "../_runtime.mjs";
import { r as signIn, t as authClient } from "./client-Bjfx2ad2.mjs";
import { t as GROK_PROVIDERS } from "./server-BfTlBDHy.mjs";
import { Ut as require_react, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/login-YTnMf5Ew.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const [mode, setMode] = (0, import_react.useState)("up");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(event) {
		event.preventDefault();
		setBusy(true);
		setError(null);
		try {
			const result = mode === "up" ? await authClient.signUp.email({
				name: name.trim() || "Me",
				email: email.trim(),
				password,
				callbackURL: "/"
			}) : await authClient.signIn.email({
				email: email.trim(),
				password,
				callbackURL: "/"
			});
			if (result.error) {
				setError(result.error.message ?? "Couldn't sign in.");
				setBusy(false);
				return;
			}
			window.location.assign("/");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Couldn't sign in.");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-sm font-semibold text-fern",
				children: "Back to the clearing"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl",
				children: "Sign in to post"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-ink/80",
				children: "You and your sister can share one login, or each make your own. The family key still decides who can post. Everyone else just watches."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 space-y-2",
				children: GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "btn btn-quiet w-full",
					onClick: () => signIn(provider.providerId, { callbackURL: "/" }),
					children: ["Continue with ", provider.label === "X" ? "𝕏" : provider.label]
				}, provider.providerId))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 space-y-3",
				onSubmit: (event) => void onSubmit(event),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: mode === "up" ? "btn btn-fern" : "btn btn-quiet",
							onClick: () => setMode("up"),
							children: "Create"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: mode === "in" ? "btn btn-fern" : "btn btn-quiet",
							onClick: () => setMode("in"),
							children: "I have one"
						})]
					}),
					mode === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						placeholder: "Name",
						autoComplete: "name",
						value: name,
						onChange: (event) => setName(event.target.value),
						"aria-label": "Name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						type: "email",
						placeholder: "Email",
						autoComplete: "email",
						required: true,
						value: email,
						onChange: (event) => setEmail(event.target.value),
						"aria-label": "Email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						type: "password",
						placeholder: "Password",
						autoComplete: mode === "up" ? "new-password" : "current-password",
						required: true,
						minLength: 8,
						value: password,
						onChange: (event) => setPassword(event.target.value),
						"aria-label": "Password"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-sap w-full",
						type: "submit",
						disabled: busy,
						children: mode === "up" ? "Create account" : "Sign in"
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: error
					})
				]
			})
		]
	});
}
export { Login as component };
