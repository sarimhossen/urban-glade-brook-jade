#!/usr/bin/env node
/**
 * Diagnostic script to verify environment mapping and Neon PostgreSQL connectivity.
 * Usage: npm run db:check
 */
import pg from "pg";
import { projectRoot, readAppEnv, readDotEnv } from "./with-app-env.mjs";

const root = projectRoot();
const env = { ...readDotEnv(root), ...readAppEnv(root), ...process.env };

function redactUrl(raw) {
  if (!raw) return "(not set)";
  try {
    const u = new URL(raw);
    const maskedPass = u.password ? "****" : "";
    return `${u.protocol}//${u.username}${maskedPass ? `:${maskedPass}` : ""}@${u.host}${u.pathname}${u.search}`;
  } catch {
    return "(invalid URL format)";
  }
}

async function testPool(label, connectionString) {
  if (!connectionString?.trim()) {
    console.log(`[db:check] ${label}: SKIPPED (not set)`);
    return false;
  }
  const start = Date.now();
  const pool = new pg.Pool({
    connectionString,
    max: 1,
    connectionTimeoutMillis: 10000,
  });
  try {
    const info = await pool.query(
      "select current_database() as db, current_user as usr, version() as ver",
    );
    const tables = await pool.query(
      "select table_name from information_schema.tables where table_schema = 'public' order by table_name",
    );
    const ms = Date.now() - start;
    const row = info.rows[0];
    console.log(
      `[db:check] ${label}: OK (${ms}ms) -> db=${row.db}, user=${row.usr}`,
    );
    console.log(
      `[db:check] ${label} tables (${tables.rows.length}): ${tables.rows.map((r) => r.table_name).join(", ") || "none"}`,
    );
    return true;
  } catch (err) {
    console.error(
      `[db:check] ${label}: FAILED -> ${err instanceof Error ? err.message : String(err)}`,
    );
    return false;
  } finally {
    await pool.end();
  }
}

async function main() {
  console.log("=== Environment Mapping Check ===");
  console.log("DATABASE_URL:", redactUrl(env.DATABASE_URL));
  console.log("DATABASE_URL_UNPOOLED:", redactUrl(env.DATABASE_URL_UNPOOLED));
  console.log("BETTER_AUTH_URL:", env.BETTER_AUTH_URL?.trim() || "(not set — dynamic host)");
  console.log("BETTER_AUTH_SECRET:", env.BETTER_AUTH_SECRET?.trim() ? "SET (hidden)" : "(not set — ephemeral fallback)");
  console.log("VITE_AUTH_ENABLED:", env.VITE_AUTH_ENABLED ?? "true");

  console.log("\n=== Neon Connectivity Check ===");
  const pooledOk = await testPool("DATABASE_URL (pooled)", env.DATABASE_URL);
  const unpooledOk = await testPool("DATABASE_URL_UNPOOLED (direct)", env.DATABASE_URL_UNPOOLED);

  if (!pooledOk) {
    process.exitCode = 1;
  } else if (env.DATABASE_URL_UNPOOLED && !unpooledOk) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("[db:check] unexpected error:", err);
  process.exit(1);
});
