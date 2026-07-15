/**
 * boost-meeting-slots worker (SPIKE / prototype).
 *
 * Returns the current meeting-time slots from Anna's Google Form as JSON,
 * so the Anmälan page can auto-sync dates without a code change.
 *
 *   GET /  ->  { "slots": ["15 juli kl 11:00", ...] }
 *
 * Why a worker (not browser code): Google's form is cross-origin, so the
 * browser can't read it (CORS). A server can. The site calls this endpoint
 * on load and falls back to a hardcoded list if it fails.
 *
 * Owner long-term: Mohand (P4) — sibling to the contact-worker. This is a
 * prototype to validate the approach; refine before production.
 */

const FORM_VIEW_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeXgSD42m6JLWIna8yE7C03qD4h_I-6TdPC-Mr3MWpS5mZ8lQ/viewform";

/** Google Form field id for "Tid för inskrivningsmöte". If Anna restructures
 *  the form this may shift; the parser returns [] on failure (caller falls back). */
const MEETING_FIELD_ID = "788472964";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }
    if (request.method !== "GET") {
      return new Response("Method not allowed", {
        status: 405,
        headers: CORS_HEADERS,
      });
    }
    try {
      const res = await fetch(FORM_VIEW_URL, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; boost-meeting-slots-worker/1.0)",
        },
      });
      const html = await res.text();
      const slots = parseMeetingSlots(html);
      return new Response(JSON.stringify({ slots, count: slots.length }), {
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({
          slots: [],
          error: err instanceof Error ? err.message : String(err),
        }),
        {
          status: 502,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        },
      );
    }
  },
};

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
