import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { GROK_PROVIDERS, authClient, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const [mode, setMode] = useState<"in" | "up">("up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const result =
        mode === "up"
          ? await authClient.signUp.email({
              name: name.trim() || "Me",
              email: email.trim(),
              password,
              callbackURL: "/",
            })
          : await authClient.signIn.email({
              email: email.trim(),
              password,
              callbackURL: "/",
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

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-10">
      <Link to="/" className="text-sm font-semibold text-fern">
        Back to the clearing
      </Link>
      <h1 className="mt-3 font-display text-4xl">Sign in to post</h1>
      <p className="mt-2 text-ink/80">
        You and your sister can share one login, or each make your own. The family key still decides who can
        post. Everyone else just watches.
      </p>
      <div className="mt-6 space-y-2">
        {GROK_PROVIDERS.map((provider) => (
          <button
            key={provider.providerId}
            type="button"
            className="btn btn-quiet w-full"
            onClick={() => signIn(provider.providerId, { callbackURL: "/" })}
          >
            Continue with {provider.label === "X" ? "𝕏" : provider.label}
          </button>
        ))}
      </div>
      <form className="mt-6 space-y-3" onSubmit={(event) => void onSubmit(event)}>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className={mode === "up" ? "btn btn-fern" : "btn btn-quiet"} onClick={() => setMode("up")}>
            Create
          </button>
          <button type="button" className={mode === "in" ? "btn btn-fern" : "btn btn-quiet"} onClick={() => setMode("in")}>
            I have one
          </button>
        </div>
        {mode === "up" && (
          <input
            className="field"
            placeholder="Name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-label="Name"
          />
        )}
        <input
          className="field"
          type="email"
          placeholder="Email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-label="Email"
        />
        <input
          className="field"
          type="password"
          placeholder="Password"
          autoComplete={mode === "up" ? "new-password" : "current-password"}
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-label="Password"
        />
        <button className="btn btn-sap w-full" type="submit" disabled={busy}>
          {mode === "up" ? "Create account" : "Sign in"}
        </button>
        {error && <p className="text-sm font-medium">{error}</p>}
      </form>
    </main>
  );
}
