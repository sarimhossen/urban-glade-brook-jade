import { i as TSS_SERVER_FUNCTION, n as createMiddleware, r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-BfyPTE23.mjs";
import { t as authMiddleware } from "./middleware-BTnXpzi8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal-CoXGiqLS.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var VOICES = /* @__PURE__ */ new Set(["me", "sis"]);
var KINDS = /* @__PURE__ */ new Set([
	"note",
	"photo",
	"audio",
	"video",
	"painting",
	"riff"
]);
var MAX_MEDIA = 14e5;
var optionalAuth = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-1vAx-gM_.mjs").then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { getSessionUser } = await import("./verify.server-CHnc-QMx.mjs");
	return next({ context: { userId: (await getSessionUser(context.bearerToken))?.id ?? null } });
});
function cleanName(value, fallback) {
	return value.trim().slice(0, 16) || fallback;
}
function asKey(value) {
	if (typeof value !== "string") throw new Error("Type the family key.");
	const key = value.trim();
	if (key.length < 4 || key.length > 64) throw new Error("The family key needs 4 to 64 characters.");
	return key;
}
async function hashNew(pass) {
	const { randomBytes, scryptSync } = await import("node:crypto");
	const salt = randomBytes(16).toString("hex");
	return {
		salt,
		hash: scryptSync(pass, salt, 32).toString("hex")
	};
}
async function keyMatches(pass, salt, hash) {
	const { scryptSync, timingSafeEqual } = await import("node:crypto");
	const next = scryptSync(pass, salt, 32);
	const prev = Buffer.from(hash, "hex");
	if (next.length !== prev.length) return false;
	return timingSafeEqual(next, prev);
}
async function readJournal() {
	return (await (await getSql())`
    select pass_hash, pass_salt, my_name, sister_name from journal where id = 1
  `)[0] ?? null;
}
async function assertKey(pass) {
	const journal = await readJournal();
	if (!journal) throw new Error("Set your family key first.");
	if (!await keyMatches(pass, journal.pass_salt, journal.pass_hash)) throw new Error("That key doesn't match.");
	return journal;
}
function isShared(value) {
	return value === true || value === "t" || value === "true";
}
function okMedia(kind, media) {
	if (kind === "photo" || kind === "painting") return media.startsWith("data:image/");
	if (kind === "audio") return media.startsWith("data:audio/");
	if (kind === "video") return media.startsWith("data:video/");
	return false;
}
var getJournal_createServerFn_handler = createServerRpc({
	id: "e82c2360d3b9e2a68b6cd566daed811df0847e0801e7aa853e828ac80de9f6fb",
	name: "getJournal",
	filename: "src/lib/journal.ts"
}, (opts) => getJournal.__executeServer(opts));
var getJournal = createServerFn({ method: "GET" }).handler(getJournal_createServerFn_handler, async () => {
	const journal = await readJournal();
	if (!journal) return {
		ready: false,
		myName: "Me",
		sisterName: "Sis"
	};
	return {
		ready: true,
		myName: journal.my_name,
		sisterName: journal.sister_name
	};
});
var listDives_createServerFn_handler = createServerRpc({
	id: "135d68d34606ddf2549bfc89f9bddf6abc75904db647617c10888e5e25ac4056",
	name: "listDives",
	filename: "src/lib/journal.ts"
}, (opts) => listDives.__executeServer(opts));
var listDives = createServerFn({ method: "GET" }).middleware([optionalAuth]).handler(listDives_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select id, user_id, voice, kind, title, body, media, extra, shared,
        to_char(created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at
      from dives
      order by created_at desc
      limit 40
    `).filter((row) => isShared(row.shared) || context.userId && row.user_id === context.userId).filter((row) => VOICES.has(row.voice) && KINDS.has(row.kind)).map((row) => ({
		id: row.id,
		voice: row.voice,
		kind: row.kind,
		title: row.title,
		body: row.body,
		media: row.media,
		extra: row.extra,
		shared: isShared(row.shared),
		createdAt: row.created_at,
		mine: Boolean(context.userId && row.user_id === context.userId)
	}));
});
var claimJournal_createServerFn_handler = createServerRpc({
	id: "b01d2dfac8f18ca68c6f26e2c10ab88d7ff837c94d4763cb8d15147afd2e5221",
	name: "claimJournal",
	filename: "src/lib/journal.ts"
}, (opts) => claimJournal.__executeServer(opts));
var claimJournal = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(claimJournal_createServerFn_handler, async ({ data, context }) => {
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
			if (!await keyMatches(familyKey, again.pass_salt, again.pass_hash)) throw new Error("Someone already set the family key.");
		}
		return {
			ready: true,
			myName,
			sisterName
		};
	}
	if (!await keyMatches(familyKey, existing.pass_salt, existing.pass_hash)) throw new Error("That key doesn't match.");
	await sql`
      update journal set my_name = ${myName}, sister_name = ${sisterName} where id = 1
    `;
	return {
		ready: true,
		myName,
		sisterName
	};
});
var checkKey_createServerFn_handler = createServerRpc({
	id: "88866644aa23515aadac4a7ae978f8e47e267033a40fa42ca59498325ea4b74f",
	name: "checkKey",
	filename: "src/lib/journal.ts"
}, (opts) => checkKey.__executeServer(opts));
var checkKey = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(checkKey_createServerFn_handler, async ({ data }) => {
	await assertKey(asKey(data.familyKey));
	return { ok: true };
});
var createDive_createServerFn_handler = createServerRpc({
	id: "8d3d3b997a058765dfc34f3de5740cebba35a271e12dcf0c0e443b184dcacf39",
	name: "createDive",
	filename: "src/lib/journal.ts"
}, (opts) => createDive.__executeServer(opts));
var createDive = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createDive_createServerFn_handler, async ({ data, context }) => {
	await assertKey(asKey(data.familyKey));
	if (!VOICES.has(data.voice)) throw new Error("Pick who this is from.");
	if (!KINDS.has(data.kind)) throw new Error("That kind of dive isn't supported.");
	const title = (data.title ?? "").trim().slice(0, 80);
	const body = (data.body ?? "").trim().slice(0, 500);
	const media = data.media?.trim() ? data.media.trim() : null;
	let extra = data.extra?.trim() ? data.extra.trim().slice(0, 4e3) : null;
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
		if (media.length > MAX_MEDIA) throw new Error("That file is too big. Use a smaller photo or a shorter clip.");
		if (!okMedia(data.kind, media)) throw new Error("That file type can't be saved.");
	}
	const { randomUUID } = await import("node:crypto");
	const id = randomUUID();
	await (await getSql())`
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
function normalizeRiff(extra) {
	let parsed;
	try {
		parsed = JSON.parse(extra ?? "");
	} catch {
		throw new Error("That riff didn't save. Try recording it again.");
	}
	if (!Array.isArray(parsed) || parsed.length === 0 || parsed.length > 48) throw new Error("Record a short riff first.");
	const hits = parsed.map((hit) => {
		if (!hit || typeof hit !== "object") throw new Error("That riff didn't save.");
		const row = hit;
		const i = Number(row.i);
		const t = Number(row.t);
		if (!Number.isInteger(i) || i < 0 || i > 5) throw new Error("That riff didn't save.");
		if (!Number.isFinite(t) || t < 0 || t > 2e4) throw new Error("That riff didn't save.");
		return {
			i,
			t: Math.round(t)
		};
	});
	return JSON.stringify(hits);
}
var removeDive_createServerFn_handler = createServerRpc({
	id: "dd4e887a115efb99e5c85ffbbe12a8a797f61553c285322343af6a942be42ad4",
	name: "removeDive",
	filename: "src/lib/journal.ts"
}, (opts) => removeDive.__executeServer(opts));
var removeDive = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(removeDive_createServerFn_handler, async ({ data, context }) => {
	await assertKey(asKey(data.familyKey));
	if (!data.id || typeof data.id !== "string") throw new Error("Missing dive.");
	if (!(await (await getSql())`
      delete from dives where id = ${data.id} and user_id = ${context.userId} returning id
    `).length) throw new Error("That dive isn't yours to remove.");
	return { ok: true };
});
//#endregion
export { checkKey_createServerFn_handler, claimJournal_createServerFn_handler, createDive_createServerFn_handler, getJournal_createServerFn_handler, listDives_createServerFn_handler, removeDive_createServerFn_handler };
