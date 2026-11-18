import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

export type Voice = "me" | "sis";
export type Kind = "note" | "photo" | "audio" | "video" | "painting" | "riff";

export type Dive = {
  id: string;
  voice: Voice;
  kind: Kind;
  title: string;
  body: string;
  media: string | null;
  extra: string | null;
  shared: boolean;
  createdAt: string;
  mine: boolean;
};

export type JournalInfo = {
  ready: boolean;
  myName: string;
  sisterName: string;
};

const VOICES = new Set<Voice>(["me", "sis"]);
const KINDS = new Set<Kind>(["note", "photo", "audio", "video", "painting", "riff"]);
const MAX_MEDIA = 1_400_000;

type JournalRow = {
  pass_hash: string;
  pass_salt: string;
  my_name: string;
  sister_name: string;
};

type DiveRow = {
  id: string;
  user_id: string;
  voice: string;
  kind: string;
  title: string;
  body: string;
  media: string | null;
  extra: string | null;
  shared: boolean | string;
  created_at: string;
};

const optionalAuth = createMiddleware({ type: "function" })
  .client(async ({ next }) => {
    const { getBearerToken } = await import("@/lib/auth/client");
    return next({ sendContext: { bearerToken: getBearerToken() ?? undefined } });
  })
  .server(async ({ next, context }) => {
    const { getSessionUser } = await import("@/lib/auth/verify.server");
    const user = await getSessionUser(context.bearerToken);
    return next({ context: { userId: user?.id ?? null } });
  });

function cleanName(value: string, fallback: string) {
  const name = value.trim().slice(0, 16);
  return name || fallback;
}

function asKey(value: unknown) {
  if (typeof value !== "string") throw new Error("Type the family key.");
  const key = value.trim();
  if (key.length < 4 || key.length > 64) {
    throw new Error("The family key needs 4 to 64 characters.");
  }
  return key;
}

async function hashNew(pass: string) {
  const { randomBytes, scryptSync } = await import("node:crypto");
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(pass, salt, 32).toString("hex");
  return { salt, hash };
}

async function keyMatches(pass: string, salt: string, hash: string) {
  const { scryptSync, timingSafeEqual } = await import("node:crypto");
  const next = scryptSync(pass, salt, 32);
  const prev = Buffer.from(hash, "hex");
  if (next.length !== prev.length) return false;
  return timingSafeEqual(next, prev);
}

async function readJournal(): Promise<JournalRow | null> {
  const sql = await getSql();
  const rows = await sql<JournalRow>`
    select pass_hash, pass_salt, my_name, sister_name from journal where id = 1
  `;
  return rows[0] ?? null;
}

async function assertKey(pass: string) {
  const journal = await readJournal();
  if (!journal) throw new Error("Set your family key first.");
  const ok = await keyMatches(pass, journal.pass_salt, journal.pass_hash);
  if (!ok) throw new Error("That key doesn't match.");
  return journal;
}

function isShared(value: boolean | string) {
  return value === true || value === "t" || value === "true";
}

function okMedia(kind: Kind, media: string) {
  if (kind === "photo" || kind === "painting") return media.startsWith("data:image/");
  if (kind === "audio") return media.startsWith("data:audio/");
  if (kind === "video") return media.startsWith("data:video/");
  return false;
}

export const getJournal = createServerFn({ method: "GET" }).handler(async (): Promise<JournalInfo> => {
  const journal = await readJournal();
  if (!journal) return { ready: false, myName: "Me", sisterName: "Sis" };
  return { ready: true, myName: journal.my_name, sisterName: journal.sister_name };
});

export const listDives = createServerFn({ method: "GET" })
  .middleware([optionalAuth])
  .handler(async ({ context }): Promise<Dive[]> => {
    const sql = await getSql();
    const rows = await sql<DiveRow>`
      select id, user_id, voice, kind, title, body, media, extra, shared,
        to_char(created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at
      from dives
      order by created_at desc
      limit 40
    `;
    return rows
      .filter((row) => isShared(row.shared) || (context.userId && row.user_id === context.userId))
      .filter((row): row is DiveRow & { voice: Voice; kind: Kind } => VOICES.has(row.voice as Voice) && KINDS.has(row.kind as Kind))
      .map((row) => ({
        id: row.id,
        voice: row.voice,
        kind: row.kind,
        title: row.title,
        body: row.body,
        media: row.media,
        extra: row.extra,
        shared: isShared(row.shared),
        createdAt: row.created_at,
        mine: Boolean(context.userId && row.user_id === context.userId),
      }));
  });

export const claimJournal = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { familyKey: string; myName: string; sisterName: string }) => input)
  .handler(async ({ data, context }) => {
    const familyKey = asKey(data.familyKey);
    const myName = cleanName(data.myName ?? "", "Me");
    const sisterName = cleanName(data.sisterName ?? "", "Sis");
    const existing = await readJournal();
    const sql = await getSql();
    if (!existing) {
      const { salt, hash } = await hashNew(familyKey);
      try {
        await sql`
          insert into journal (id, pass_hash, pass_salt, my_name, sister_name, created_by)
          values (1, ${hash}, ${salt}, ${myName}, ${sisterName}, ${context.userId})
        `;
      } catch {
        const again = await readJournal();
        if (!again) throw new Error("Couldn't save the family key. Try again.");
        const ok = await keyMatches(familyKey, again.pass_salt, again.pass_hash);
        if (!ok) throw new Error("Someone already set the family key.");
      }
      return { ready: true, myName, sisterName };
    }
    const ok = await keyMatches(familyKey, existing.pass_salt, existing.pass_hash);
    if (!ok) throw new Error("That key doesn't match.");
    await sql`
      update journal set my_name = ${myName}, sister_name = ${sisterName} where id = 1
    `;
    return { ready: true, myName, sisterName };
  });

export const checkKey = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { familyKey: string }) => input)
  .handler(async ({ data }) => {
    await assertKey(asKey(data.familyKey));
    return { ok: true as const };
  });

export type CreateDiveInput = {
  familyKey: string;
  voice: Voice;
  kind: Kind;
  title: string;
  body: string;
  media: string | null;
  extra: string | null;
  shared: boolean;
};

export const createDive = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: CreateDiveInput) => input)
  .handler(async ({ data, context }) => {
    await assertKey(asKey(data.familyKey));
    if (!VOICES.has(data.voice)) throw new Error("Pick who this is from.");
    if (!KINDS.has(data.kind)) throw new Error("That kind of dive isn't supported.");
    const title = (data.title ?? "").trim().slice(0, 80);
    const body = (data.body ?? "").trim().slice(0, 500);
    const media = data.media?.trim() ? data.media.trim() : null;
    let extra = data.extra?.trim() ? data.extra.trim().slice(0, 4000) : null;
    if (!title) throw new Error("Add a short title.");
    if (data.kind === "riff") {
      extra = normalizeRiff(extra);
      if (media) throw new Error("A riff doesn't need a file.");
    } else if (data.kind === "note") {
      extra = null;
      if (media) throw new Error("A note doesn't need a file.");
      if (!body && title.length < 2) throw new Error("Write a little note.");
    } else {
      extra = null;
      if (!media) throw new Error("Add the file first.");
      if (media.length > MAX_MEDIA) {
        throw new Error("That file is too big. Use a smaller photo or a shorter clip.");
      }
      if (!okMedia(data.kind, media)) throw new Error("That file type can't be saved.");
    }
    const { randomUUID } = await import("node:crypto");
    const id = randomUUID();
    const sql = await getSql();
    await sql`
      insert into dives (id, user_id, voice, kind, title, body, media, extra, shared)
      values (
        ${id},
        ${context.userId},
        ${data.voice},
        ${data.kind},
        ${title},
        ${body},
        ${media},
        ${extra},
        ${Boolean(data.shared)}
      )
    `;
    return { id };
  });

function normalizeRiff(extra: string | null) {
  let parsed: unknown;
  try {
    parsed = JSON.parse(extra ?? "");
  } catch {
    throw new Error("That riff didn't save. Try recording it again.");
  }
  if (!Array.isArray(parsed) || parsed.length === 0 || parsed.length > 48) {
    throw new Error("Record a short riff first.");
  }
  const hits = parsed.map((hit) => {
    if (!hit || typeof hit !== "object") throw new Error("That riff didn't save.");
    const row = hit as { i?: unknown; t?: unknown };
    const i = Number(row.i);
    const t = Number(row.t);
    if (!Number.isInteger(i) || i < 0 || i > 5) throw new Error("That riff didn't save.");
    if (!Number.isFinite(t) || t < 0 || t > 20_000) throw new Error("That riff didn't save.");
    return { i, t: Math.round(t) };
  });
  return JSON.stringify(hits);
}

export const removeDive = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id: string; familyKey: string }) => input)
  .handler(async ({ data, context }) => {
    await assertKey(asKey(data.familyKey));
    if (!data.id || typeof data.id !== "string") throw new Error("Missing dive.");
    const sql = await getSql();
    const rows = await sql<{ id: string }>`
      delete from dives where id = ${data.id} and user_id = ${context.userId} returning id
    `;
    if (!rows.length) throw new Error("That dive isn't yours to remove.");
    return { ok: true as const };
  });
