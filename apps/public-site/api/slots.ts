import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * GET /api/slots -> { slots: string[] }
 *
 * Returns the current "Tid för inskrivningsmöte" options from Anna's Google
 * Form, so the Anmälan dropdown can auto-sync without a code change. The
 * browser can't read the cross-origin Google Form (CORS), so this runs
 * server-side, scrapes the FB_PUBLIC_LOAD_DATA blob, and returns JSON.
 *
 * The page calls this on load and falls back to its hardcoded list on failure,
 * so the form never breaks if Google is unreachable or changes its HTML.
 *
 * Parser ported VERBATIM from apps/meeting-slots-worker/src/index.ts (Mohand).
 * Keep these two copies in sync. TODO(prod): extract into a shared workspace
 * package so there is a single source of truth.
 */

const FORM_VIEW_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeXgSD42m6JLWIna8yE7C03qD4h_I-6TdPC-Mr3MWpS5mZ8lQ/viewform";

/** Google Form field id for "Tid för inskrivningsmöte". */
const MEETING_FIELD_ID = "788472964";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Same-origin GET from the Anmälan page; reject anything else.
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ slots: [] });
    return;
  }

  try {
    const googleRes = await fetch(FORM_VIEW_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; boost-meeting-slots/1.0)",
      },
    });
    if (!googleRes.ok) {
      console.error(`[slots] Google form returned ${googleRes.status}`);
      res.status(502).json({ slots: [] });
      return;
    }
    const html = await googleRes.text();
    const slots = parseMeetingSlots(html);
    if (slots.length === 0) {
      // Google responded but we found no options — likely an
      // FB_PUBLIC_LOAD_DATA_ format change. Surface it; never cache a miss.
      console.error("[slots] parsed 0 slots — possible format change");
      res.status(502).json({ slots: [] });
      return;
    }
    // Edge-cache for 60s; serve stale up to 5m while revalidating, so we don't
    // hit Google on every pageview. Only cache real results, never failures.
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(200).json({ slots });
  } catch (err) {
    console.error("[slots] fetch failed:", err);
    res.status(502).json({ slots: [] });
  }
}

/** Extract the meeting-time options from the form's FB_PUBLIC_LOAD_DATA blob. */
function parseMeetingSlots(html: string): string[] {
  const data = extractLoadData(html);
  if (!data) return [];
  // data[1][1] = array of field items; each item[4][0] = [entryId, options, ...]
  const items = (data as unknown[])?.[1];
  const itemList = Array.isArray(items) ? (items as unknown[])[1] : undefined;
  if (!Array.isArray(itemList)) return [];
  for (const item of itemList) {
    const entry = (item as unknown[])?.[4]?.[0];
    if (Array.isArray(entry) && String(entry[0]) === MEETING_FIELD_ID) {
      const options = entry[1];
      if (!Array.isArray(options)) return [];
      return options
        .map((o: unknown) => (Array.isArray(o) ? o[0] : o))
        .filter((o): o is string => typeof o === "string" && o.length > 0);
    }
  }
  return [];
}

/** Parse the FB_PUBLIC_LOAD_DATA JSON array by bracket-balancing — robust to
 *  trailing content after the blob (a naive regex on `];</script>` can miss it). */
function extractLoadData(html: string): unknown | null {
  const marker = html.indexOf("FB_PUBLIC_LOAD_DATA_");
  if (marker === -1) return null;
  const eq = html.indexOf("=", marker);
  if (eq === -1) return null;
  let i = eq + 1;
  while (i < html.length && html[i] !== "[") i++;
  if (i >= html.length) return null;
  const start = i;
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (; i < html.length; i++) {
    const ch = html[i];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === "\\") esc = true;
      else if (ch === '"') inStr = false;
    } else if (ch === '"') {
      inStr = true;
    } else if (ch === "[") {
      depth++;
    } else if (ch === "]") {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(html.slice(start, i + 1));
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}
