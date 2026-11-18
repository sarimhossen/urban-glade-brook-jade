import { createFileRoute } from "@tanstack/react-router";
import { dbSource, getSql } from "@/lib/db";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        const started = Date.now();
        const envStatus = {
          DATABASE_URL: Boolean(process.env.DATABASE_URL?.trim()),
          DATABASE_URL_UNPOOLED: Boolean(process.env.DATABASE_URL_UNPOOLED?.trim()),
          BETTER_AUTH_URL: Boolean(process.env.BETTER_AUTH_URL?.trim()),
          BETTER_AUTH_SECRET: Boolean(process.env.BETTER_AUTH_SECRET?.trim()),
          VITE_AUTH_ENABLED: process.env.VITE_AUTH_ENABLED ?? "true",
        };
        try {
          const sql = await getSql();
          const [ping, tables] = await Promise.all([
            sql<{ ok: number }>`select 1 as ok`,
            sql<{ table_name: string }>`
              select table_name
              from information_schema.tables
              where table_schema = 'public'
              order by table_name
            `,
          ]);
          return Response.json({
            ok: ping[0]?.ok === 1,
            dbSource,
            latencyMs: Date.now() - started,
            tables: tables.map((t) => t.table_name),
            env: envStatus,
          });
        } catch (err) {
          console.error("[/api/health] database check failed:", err);
          return Response.json(
            {
              ok: false,
              dbSource,
              latencyMs: Date.now() - started,
              env: envStatus,
              error: err instanceof Error ? err.message : "Database check failed",
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
