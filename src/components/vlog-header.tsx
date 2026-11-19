import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getJournal, type JournalInfo } from "@/lib/journal";

export function VlogHeader() {
  const [journal, setJournal] = useState<JournalInfo | null>(null);

  useEffect(() => {
    void getJournal().then((info) => setJournal(info)).catch(() => {});
  }, []);

  const myName = journal?.myName ?? "Me";
  const sisterName = journal?.sisterName ?? "Sis";

  return (
    <header className="border-b border-ink/10 bg-card/60 backdrop-blur-md sticky top-0 z-30">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-fern text-card font-display text-lg font-bold shadow-sm">
            {myName[0] ?? "D"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Link to="/" className="font-display text-xl font-bold tracking-tight text-ink hover:text-fern">
                Daily Dive
              </Link>
              <span className="rounded-full bg-sap/70 px-2.5 py-0.5 text-xs font-semibold text-ink">
                Personal Vlog
              </span>
            </div>
            <p className="text-xs text-ink/70">
              {myName} &amp; {sisterName}&apos;s shared space for paintings, guitar riffs, and daily reflections.
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
          <Link to="/" className="rounded-full px-3 py-1.5 transition hover:bg-fern/10 text-ink">
            Vlog
          </Link>
          <Link to="/post" className="rounded-full px-3 py-1.5 transition hover:bg-fern/10 text-ink">
            Studio / Post
          </Link>
          <Link to="/login" className="rounded-full bg-fern px-4 py-1.5 text-card transition hover:opacity-90">
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}
