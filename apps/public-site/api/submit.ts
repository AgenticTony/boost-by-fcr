import type { IncomingMessage, ServerResponse } from "node:http";
import { z } from "zod";

/**
 * POST /api/submit -> { ok, delivered, demoMode?, message? }
 *
 * Server-side handler for the Anmälan form (demo variant /anmal-dig3). Validates
 * the payload, checks the honeypot, and — when Supabase is configured — inserts
 * the submission into the `submissions` table via the PostgREST REST API (no SDK
 * dependency, just `fetch`). When Supabase env vars are NOT set it returns an
 * HONEST "demo mode" response so the team can exercise the full UX without a
 * backend provisioned; the page surfaces this distinctly (not a fake success).
 *
 * Why server-side (not a direct browser POST to Supabase): keeps the service
 * role key off the client, lets us validate centrally, and gives one place to
 * add spam/PII handling. Same-origin from the React app, so no CORS needed.
 *
 * === Supabase setup (to go live) ===
 * 1. Create a table:
 *      create table submissions (
 *        id uuid primary key default gen_random_uuid(),
 *        name text not null,
 *        personnummer text not null,
 *        phone text,
 *        email text,
 *        handler_name text not null,
 *        handler_contact text,
 *        meeting_time text not null,
 *        other text,
 *        consent boolean not null,
 *        created_at timestamptz not null default now()
 *      );
 *    Enable RLS and create NO policies — inserts run with the service role
 *    key, which bypasses RLS. This table stores personnummer (Swedish PII),
 *    so RLS must stay ON so the public anon key (shipped in the client) can't
 *    read rows. The team views submissions via the dashboard session, not anon.
 * 2. Set env vars on Vercel (Runtime, NOT prefixed with VITE_ so they stay
 *    server-side): SUPABASE_URL (https://<project>.supabase.co) and
 *    SUPABASE_SERVICE_ROLE_KEY.
 */

const schema = z.object({
  name: z.string().min(1),
  personnummer: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  handlerName: z.string().min(1),
  handlerContact: z.string().optional(),
  meetingTime: z.string().min(1),
  other: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, "consent required"),
  // NOTE: the honeypot (`website`) is NOT in the schema — it is checked on the
  // raw JSON before validation so a filled honeypot returns a fake 200 instead
  // of a 400 (a 400 would tell the bot it was caught).
});
type Submission = z.infer<typeof schema>;

function json(
  res: ServerResponse,
  status: number,
  body: unknown,
  extraHeaders: Record<string, string> = {},
) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    ...extraHeaders,
  });
  res.end(JSON.stringify(body));
}

/** Buffer the request body, capped at 100 KB to bound abuse. */
function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 100_000) {
        req.destroy();
        reject(new Error("payload too large"));
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

/** Insert a submission into Supabase via PostgREST. Throws on non-2xx. */
async function insertSubmission(sub: Submission): Promise<void> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY not configured");
  }
  const row = {
    name: sub.name,
    personnummer: sub.personnummer,
    phone: sub.phone ?? null,
    email: sub.email ?? null,
    handler_name: sub.handlerName,
    handler_contact: sub.handlerContact ?? null,
    meeting_time: sub.meetingTime,
    other: sub.other ?? null,
    consent: sub.consent,
  };
  const res = await fetch(`${url}/rest/v1/submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Supabase insert failed: ${res.status} ${detail.slice(0, 200)}`);
  }
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    json(res, 405, { ok: false, error: "Method not allowed" }, { Allow: "POST" });
    return;
  }

  let parsed: unknown;
  try {
    const raw = await readBody(req);
    parsed = raw ? JSON.parse(raw) : {};
  } catch {
    json(res, 400, { ok: false, error: "Ogiltig förfrågan" });
    return;
  }

  // Honeypot — check on the raw payload BEFORE validation: a filled field means
  // a bot, so return a fake success and bail (never reveal a rejection).
  if (
    parsed &&
    typeof parsed === "object" &&
    typeof (parsed as { website?: unknown }).website === "string" &&
    ((parsed as { website: string }).website).length > 0
  ) {
    json(res, 200, { ok: true, delivered: true });
    return;
  }

  const result = schema.safeParse(parsed);
  if (!result.success) {
    json(res, 400, {
      ok: false,
      error: "Validering misslyckades",
      issues: result.error.issues.map((i) => i.path.join(".") + ": " + i.message),
    });
    return;
  }
  const data = result.data;

  const supabaseConfigured =
    !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseConfigured) {
    // Honest demo mode: validated, but not persisted. Page shows this clearly.
    json(res, 200, {
      ok: true,
      delivered: false,
      demoMode: true,
      message:
        "Demo-läge: Supabase är inte ansluten, så anmälan validerades men sparades inte.",
    });
    return;
  }

  try {
    await insertSubmission(data);
    json(res, 200, { ok: true, delivered: true });
  } catch (err) {
    console.error("[submit] insert failed:", err);
    json(res, 502, {
      ok: false,
      error: "Kunde inte spara anmälan just nu. Försök igen.",
    });
  }
}
