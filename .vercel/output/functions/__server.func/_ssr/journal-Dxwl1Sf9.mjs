import { i as TSS_SERVER_FUNCTION, n as createMiddleware, r as createServerFn } from "./ssr.mjs";
import { a as getSql, t as authMiddleware } from "./middleware-CGXLX9m3.mjs";
// node_modules/.nitro/vite/services/ssr/assets/journal-Dxwl1Sf9.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var VOICES = /* @__PURE__ */ new Set([
	"me",
	"sis",
	"guest"
]);
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
	const { getBearerToken } = await import("./client-Bjfx2ad2.mjs").then((n) => n.n).then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { getSessionUser } = await import("./verify.server-DBMwgunI.mjs");
	return next({ context: { userId: (await getSessionUser(context.bearerToken))?.id ?? null } });
});
function cleanName(value, fallback, max = 16) {
	return value.trim().slice(0, max) || fallback;
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
    select pass_hash, pass_salt, my_name, sister_name, allow_guest_posts, created_by from journal where id = 1
  `)[0] ?? null;
}
async function assertKey(pass) {
	const journal = await readJournal();
	if (!journal) throw new Error("Set your family key first.");
	if (!await keyMatches(pass, journal.pass_salt, journal.pass_hash)) throw new Error("That key doesn't match.");
	return journal;
}
function isTruthyBool(value) {
	return value === true || value === "t" || value === "true";
}
function okMedia(kind, media) {
	if (kind === "photo" || kind === "painting") return media.startsWith("data:image/");
	if (kind === "audio") return media.startsWith("data:audio/");
	if (kind === "video") return media.startsWith("data:video/");
	return false;
}
async function fetchJournalInfo(userId) {
	const journal = await readJournal();
	if (!journal) return {
		ready: false,
		myName: "Me",
		sisterName: "Sis",
		allowGuestPosts: false,
		isOwner: false
	};
	return {
		ready: true,
		myName: journal.my_name,
		sisterName: journal.sister_name,
		allowGuestPosts: isTruthyBool(journal.allow_guest_posts),
		isOwner: Boolean(userId && journal.created_by === userId)
	};
}
async function fetchDives(userId) {
	const sql = await getSql();
	const [rows, commentRows, tagRows] = await Promise.all([
		sql`
      select id, user_id, voice, author_label, kind, title, body, media, extra, shared, likes,
        to_char(created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at
      from dives
      order by created_at desc
      limit 25
    `,
		sql`
      select id, dive_id, author_name, body, is_family,
        to_char(created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at
      from comments
      order by created_at asc
      limit 250
    `,
		sql`
      select id, dive_id, tag from tags
    `
	]);
	const commentsByDive = /* @__PURE__ */ new Map();
	for (const c of commentRows) {
		const list = commentsByDive.get(c.dive_id) ?? [];
		list.push({
			id: c.id,
			diveId: c.dive_id,
			authorName: c.author_name,
			body: c.body,
			isFamily: isTruthyBool(c.is_family),
			createdAt: c.created_at
		});
		commentsByDive.set(c.dive_id, list);
	}
	const tagsByDive = /* @__PURE__ */ new Map();
	for (const t of tagRows) {
		const list = tagsByDive.get(t.dive_id) ?? [];
		list.push(t.tag);
		tagsByDive.set(t.dive_id, list);
	}
	return rows.filter((row) => isTruthyBool(row.shared) || userId && row.user_id === userId).filter((row) => VOICES.has(row.voice) && KINDS.has(row.kind)).map((row) => ({
		id: row.id,
		voice: row.voice,
		authorLabel: row.author_label,
		kind: row.kind,
		title: row.title,
		body: row.body,
		media: row.media,
		extra: row.extra,
		shared: isTruthyBool(row.shared),
		createdAt: row.created_at,
		mine: Boolean(userId && row.user_id === userId),
		comments: commentsByDive.get(row.id) ?? [],
		likes: Number(row.likes ?? 0),
		tags: tagsByDive.get(row.id) ?? []
	}));
}
var getJournal_createServerFn_handler = createServerRpc({
	id: "e82c2360d3b9e2a68b6cd566daed811df0847e0801e7aa853e828ac80de9f6fb",
	name: "getJournal",
	filename: "src/lib/journal.ts"
}, (opts) => getJournal.__executeServer(opts));
var getJournal = createServerFn({ method: "GET" }).middleware([optionalAuth]).handler(getJournal_createServerFn_handler, async ({ context }) => {
	return fetchJournalInfo(context.userId);
});
var listPosts_createServerFn_handler = createServerRpc({
	id: "d0a5f87e3d7cc9b630698a100633894cc6e971e70c7341fb6c45c2fbb2e994db",
	name: "listPosts",
	filename: "src/lib/journal.ts"
}, (opts) => listPosts.__executeServer(opts));
var listPosts = createServerFn({ method: "GET" }).middleware([optionalAuth]).handler(listPosts_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const [rows, commentRows, tagRows] = await Promise.all([
		sql`
        select id, user_id, voice, author_label, kind, title, body, shared, likes,
          to_char(created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at
        from dives
        order by created_at desc
        limit 25
      `,
		sql`
        select id, dive_id, author_name, body, is_family,
          to_char(created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at
        from comments
        order by created_at asc
        limit 250
      `,
		sql`
        select id, dive_id, tag from tags
      `
	]);
	const commentsByDive = /* @__PURE__ */ new Map();
	for (const c of commentRows) {
		const list = commentsByDive.get(c.dive_id) ?? [];
		list.push({
			id: c.id,
			diveId: c.dive_id,
			authorName: c.author_name,
			body: c.body,
			isFamily: isTruthyBool(c.is_family),
			createdAt: c.created_at
		});
		commentsByDive.set(c.dive_id, list);
	}
	const tagsByDive = /* @__PURE__ */ new Map();
	for (const t of tagRows) {
		const list = tagsByDive.get(t.dive_id) ?? [];
		list.push(t.tag);
		tagsByDive.set(t.dive_id, list);
	}
	return rows.filter((row) => isTruthyBool(row.shared) || context.userId && row.user_id === context.userId).filter((row) => VOICES.has(row.voice) && KINDS.has(row.kind)).map((row) => ({
		id: row.id,
		title: row.title,
		content: row.body,
		createdAt: row.created_at,
		voice: row.voice,
		authorLabel: row.author_label,
		kind: row.kind,
		likes: Number(row.likes ?? 0),
		comments: commentsByDive.get(row.id) ?? [],
		tags: tagsByDive.get(row.id) ?? []
	}));
});
var listDives_createServerFn_handler = createServerRpc({
	id: "135d68d34606ddf2549bfc89f9bddf6abc75904db647617c10888e5e25ac4056",
	name: "listDives",
	filename: "src/lib/journal.ts"
}, (opts) => listDives.__executeServer(opts));
var listDives = createServerFn({ method: "GET" }).middleware([optionalAuth]).handler(listDives_createServerFn_handler, async ({ context }) => {
	return fetchDives(context.userId);
});
var getVlogFeed_createServerFn_handler = createServerRpc({
	id: "cba6d29231659ff4fd8b5295360b79af4485edf7d6ecf98cf144a54a0bea2313",
	name: "getVlogFeed",
	filename: "src/lib/journal.ts"
}, (opts) => getVlogFeed.__executeServer(opts));
var getVlogFeed = createServerFn({ method: "GET" }).middleware([optionalAuth]).handler(getVlogFeed_createServerFn_handler, async ({ context }) => {
	const [journal, dives] = await Promise.all([fetchJournalInfo(context.userId), fetchDives(context.userId)]);
	return {
		journal,
		dives
	};
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
	const allowGuestPosts = Boolean(data.allowGuestPosts);
	const existing = await readJournal();
	const sql = await getSql();
	if (!existing) {
		const { salt, hash } = await hashNew(familyKey);
		try {
			await sql`
          insert into journal (id, pass_hash, pass_salt, my_name, sister_name, allow_guest_posts, created_by)
          values (1, ${hash}, ${salt}, ${myName}, ${sisterName}, ${allowGuestPosts}, ${context.userId})
        `;
		} catch {
			const again = await readJournal();
			if (!again) throw new Error("Couldn't save the family key. Try again.");
			if (!await keyMatches(familyKey, again.pass_salt, again.pass_hash)) throw new Error("Someone already set the family key.");
		}
		return {
			ready: true,
			myName,
			sisterName,
			allowGuestPosts,
			isOwner: true
		};
	}
	if (!await keyMatches(familyKey, existing.pass_salt, existing.pass_hash)) throw new Error("That key doesn't match.");
	await sql`
      update journal
      set my_name = ${myName}, sister_name = ${sisterName}, allow_guest_posts = ${allowGuestPosts}
      where id = 1
    `;
	return {
		ready: true,
		myName,
		sisterName,
		allowGuestPosts,
		isOwner: existing.created_by === context.userId
	};
});
var updateJournalSettings_createServerFn_handler = createServerRpc({
	id: "8a2b46fd8840f7c060a3c3e256a0fc56458456a6b21214ea7950403b5840cc11",
	name: "updateJournalSettings",
	filename: "src/lib/journal.ts"
}, (opts) => updateJournalSettings.__executeServer(opts));
var updateJournalSettings = createServerFn({ method: "POST" }).middleware([optionalAuth]).validator((input) => input).handler(updateJournalSettings_createServerFn_handler, async ({ data, context }) => {
	const existing = await assertKey(asKey(data.familyKey));
	const myName = cleanName(data.myName ?? "", "Me");
	const sisterName = cleanName(data.sisterName ?? "", "Sis");
	const allowGuestPosts = Boolean(data.allowGuestPosts);
	await (await getSql())`
      update journal
      set my_name = ${myName}, sister_name = ${sisterName}, allow_guest_posts = ${allowGuestPosts}
      where id = 1
    `;
	return {
		ready: true,
		myName,
		sisterName,
		allowGuestPosts,
		isOwner: Boolean(context.userId && existing.created_by === context.userId)
	};
});
var checkKey_createServerFn_handler = createServerRpc({
	id: "88866644aa23515aadac4a7ae978f8e47e267033a40fa42ca59498325ea4b74f",
	name: "checkKey",
	filename: "src/lib/journal.ts"
}, (opts) => checkKey.__executeServer(opts));
var checkKey = createServerFn({ method: "POST" }).middleware([optionalAuth]).validator((input) => input).handler(checkKey_createServerFn_handler, async ({ data }) => {
	await assertKey(asKey(data.familyKey));
	return { ok: true };
});
var createDive_createServerFn_handler = createServerRpc({
	id: "8d3d3b997a058765dfc34f3de5740cebba35a271e12dcf0c0e443b184dcacf39",
	name: "createDive",
	filename: "src/lib/journal.ts"
}, (opts) => createDive.__executeServer(opts));
var createDive = createServerFn({ method: "POST" }).middleware([optionalAuth]).validator((input) => input).handler(createDive_createServerFn_handler, async ({ data, context }) => {
	if (!VOICES.has(data.voice)) throw new Error("Pick who this is from.");
	if (!KINDS.has(data.kind)) throw new Error("That kind of dive isn't supported.");
	const journal = await readJournal();
	if (!journal) throw new Error("Set your family key first.");
	let authorLabel = null;
	let shared = Boolean(data.shared);
	if (data.voice === "guest") {
		const hasValidKey = data.familyKey?.trim() ? await keyMatches(data.familyKey.trim(), journal.pass_salt, journal.pass_hash) : false;
		if (!isTruthyBool(journal.allow_guest_posts) && !hasValidKey) throw new Error("Visitor posting is turned off right now. You can still leave a comment!");
		authorLabel = cleanName(data.authorLabel ?? "", "Visitor", 24);
		shared = true;
	} else await assertKey(asKey(data.familyKey));
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
      insert into dives (id, user_id, voice, author_label, kind, title, body, media, extra, shared)
      values (
        ${id},
        ${context.userId ?? (data.voice === "guest" ? "guest" : "family")},
        ${data.voice},
        ${authorLabel},
        ${data.kind},
        ${title},
        ${body},
        ${media},
        ${extra},
        ${shared}
      )
    `;
	return { id };
});
var createAuthorizedPost_createServerFn_handler = createServerRpc({
	id: "9472411d6230af2f63704130cc1b52adaaa298471de40c682b9efc1b6f70648b",
	name: "createAuthorizedPost",
	filename: "src/lib/journal.ts"
}, (opts) => createAuthorizedPost.__executeServer(opts));
var createAuthorizedPost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createAuthorizedPost_createServerFn_handler, async ({ data, context }) => {
	if (data.voice !== "me" && data.voice !== "sis") throw new Error("Pick who this post is from.");
	const journal = await readJournal();
	if (!journal) throw new Error("Set your family key first.");
	const isOwner = journal.created_by === context.userId;
	const key = data.familyKey?.trim() ?? "";
	const hasValidKey = key ? await keyMatches(key, journal.pass_salt, journal.pass_hash) : false;
	if (!isOwner && !hasValidKey) throw new Error("Only authorized vlog owners or family key holders can publish posts.");
	const title = (data.title ?? "").trim().slice(0, 120);
	const body = (data.content ?? "").trim().slice(0, 2e3);
	if (title.length < 2) throw new Error("Add a title (at least 2 characters).");
	if (!body) throw new Error("Write some content for your post.");
	const { randomUUID } = await import("node:crypto");
	const id = randomUUID();
	const sql = await getSql();
	await sql`
      insert into dives (id, user_id, voice, author_label, kind, title, body, media, extra, shared)
      values (
        ${id},
        ${context.userId},
        ${data.voice},
        ${null},
        ${"note"},
        ${title},
        ${body},
        ${null},
        ${null},
        ${data.shared ?? true}
      )
    `;
	const tagsList = (data.tags ?? "").toString().split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
	for (const tag of tagsList) await sql`
        insert into tags (id, dive_id, tag)
        values (${randomUUID()}, ${id}, ${tag})
      `;
	return {
		id,
		title,
		body
	};
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
var removeDive = createServerFn({ method: "POST" }).middleware([optionalAuth]).validator((input) => input).handler(removeDive_createServerFn_handler, async ({ data }) => {
	await assertKey(asKey(data.familyKey));
	if (!data.id || typeof data.id !== "string") throw new Error("Missing dive.");
	if (!(await (await getSql())`
      delete from dives where id = ${data.id} returning id
    `).length) throw new Error("That dive couldn't be found.");
	return { ok: true };
});
var likePost_createServerFn_handler = createServerRpc({
	id: "6aba6890efff2bd02e208283ef6f209ac2e3133e759961ac4a2caf72079e0fb7",
	name: "likePost",
	filename: "src/lib/journal.ts"
}, (opts) => likePost.__executeServer(opts));
var likePost = createServerFn({ method: "POST" }).middleware([optionalAuth]).validator((input) => input).handler(likePost_createServerFn_handler, async ({ data }) => {
	if (!data.id || typeof data.id !== "string") throw new Error("Missing post id.");
	const rows = await (await getSql())`
      update dives
      set likes = likes + 1
      where id = ${data.id}
      returning id, likes
    `;
	if (!rows.length) throw new Error("That post couldn't be found.");
	return {
		ok: true,
		likes: rows[0].likes
	};
});
var deletePost_createServerFn_handler = createServerRpc({
	id: "b3e014de302bfec110f1a51a55d57ae3fde11eff8124b75cafd0c74b15fb0bbf",
	name: "deletePost",
	filename: "src/lib/journal.ts"
}, (opts) => deletePost.__executeServer(opts));
var deletePost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(deletePost_createServerFn_handler, async ({ data, context }) => {
	if (!data.id || typeof data.id !== "string") throw new Error("Missing post id.");
	const journal = await readJournal();
	if (!journal) throw new Error("Vlog is not initialized yet.");
	if (journal.created_by !== context.userId) throw new Error("Only the site owner can delete posts.");
	const rows = await (await getSql())`
      delete from dives where id = ${data.id} returning id
    `;
	if (!rows.length) throw new Error("That post couldn't be found.");
	return {
		ok: true,
		id: rows[0].id
	};
});
var addComment_createServerFn_handler = createServerRpc({
	id: "d4305bc35c8ad691da55e882b5b3a8180da8757a5becdb43eaaeace951e86837",
	name: "addComment",
	filename: "src/lib/journal.ts"
}, (opts) => addComment.__executeServer(opts));
var addComment = createServerFn({ method: "POST" }).middleware([optionalAuth]).validator((input) => input).handler(addComment_createServerFn_handler, async ({ data, context }) => {
	if (!data.diveId || typeof data.diveId !== "string") throw new Error("Pick a post to comment on.");
	const authorName = cleanName(data.authorName ?? "", "Visitor", 32);
	const body = (data.body ?? "").trim().slice(0, 300);
	if (!body) throw new Error("Write a short comment first.");
	const sql = await getSql();
	const dive = (await sql`
      select id, user_id, shared from dives where id = ${data.diveId}
    `)[0];
	if (!dive) throw new Error("That post isn't here anymore.");
	if (!isTruthyBool(dive.shared) && (!context.userId || dive.user_id !== context.userId)) throw new Error("You can't comment on a private post.");
	let isFamily = false;
	if (data.familyKey?.trim()) {
		const journal = await readJournal();
		if (journal) isFamily = await keyMatches(data.familyKey.trim(), journal.pass_salt, journal.pass_hash);
	}
	const { randomUUID } = await import("node:crypto");
	const id = randomUUID();
	await sql`
      insert into comments (id, dive_id, author_name, body, is_family)
      values (${id}, ${data.diveId}, ${authorName}, ${body}, ${isFamily})
    `;
	return { id };
});
var removeComment_createServerFn_handler = createServerRpc({
	id: "c06e2babf521222499d2399b9835f95f3a5bc65560def47cfa1c8396d4d55545",
	name: "removeComment",
	filename: "src/lib/journal.ts"
}, (opts) => removeComment.__executeServer(opts));
var removeComment = createServerFn({ method: "POST" }).middleware([optionalAuth]).validator((input) => input).handler(removeComment_createServerFn_handler, async ({ data }) => {
	await assertKey(asKey(data.familyKey));
	if (!data.id || typeof data.id !== "string") throw new Error("Missing comment.");
	if (!(await (await getSql())`
      delete from comments where id = ${data.id} returning id
    `).length) throw new Error("That comment couldn't be found.");
	return { ok: true };
});
export { addComment_createServerFn_handler, checkKey_createServerFn_handler, claimJournal_createServerFn_handler, createAuthorizedPost_createServerFn_handler, createDive_createServerFn_handler, deletePost_createServerFn_handler, getJournal_createServerFn_handler, getVlogFeed_createServerFn_handler, likePost_createServerFn_handler, listDives_createServerFn_handler, listPosts_createServerFn_handler, removeComment_createServerFn_handler, removeDive_createServerFn_handler, updateJournalSettings_createServerFn_handler };
