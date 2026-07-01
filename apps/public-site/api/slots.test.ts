import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { IncomingMessage, ServerResponse } from "node:http";
import handler from "./slots";

/**
 * API test for the GET /api/slots serverless function. The handler is invoked
 * directly with a mock http req/res and a stubbed global `fetch`, so it runs
 * fast and offline (no real call to Google Forms).
 *
 * The fixture is a minimal valid FB_PUBLIC_LOAD_DATA_ blob carrying only the
 * "Tid för inskrivningsmöte" field (entry 788472964) with two options — enough
 * to exercise the parser end-to-end.
 */

const MEETING_OPTIONS = ["23 juli kl 14:00", "28 juli kl 15:00"];

/** Minimal Google-Form HTML page carrying the meeting-time field + options.
 *  Structure mirrors the live blob the parser expects:
 *  data[1][1] = items; each item[4][0] = [entryId, options, ...]. */
function formHtml(options = MEETING_OPTIONS): string {
  const blob = [
    null,
    [
      null,
      [
        [
          1631586070,
          "Tid för inskrivningsmöte",
          "Välj tid",
          3,
          [
            [
              788472964,
              options.map((o) => [o, null, null, null, 0]),
              1, null, null, null, null, null, 0,
            ],
          ],
        ],
      ],
    ],
  ];
  return `<script>var FB_PUBLIC_LOAD_DATA_ = ${JSON.stringify(blob)};</script>`;
}

/** Minimal ServerResponse mock that captures writeHead() + end() calls. */
function mockRes() {
  const captured: { status?: number; headers?: Record<string, string>; body?: string } = {};
  const res = {
    writeHead(status: number, headers?: Record<string, string>) {
      captured.status = status;
      captured.headers = headers;
      return res;
    },
    end(body?: string) {
      captured.body = body;
      return res;
    },
  };
  return { res: res as unknown as ServerResponse, captured };
}

const mockReq = (method = "GET"): IncomingMessage => ({ method } as IncomingMessage);

describe("GET /api/slots", () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    errorSpy.mockRestore();
  });

  it("returns 200 with parsed slots + an edge-cache header on a valid form", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(formHtml()),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { res, captured } = mockRes();
    await handler(mockReq(), res);

    expect(captured.status).toBe(200);
    expect(captured.headers?.["Content-Type"]).toMatch(/application\/json/);
    expect(captured.headers?.["Cache-Control"]).toMatch(/s-maxage=60.*stale-while-revalidate/);
    expect(JSON.parse(captured.body ?? "{}")).toEqual({ slots: MEETING_OPTIONS });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain("docs.google.com");
  });

  it("rejects non-GET requests with 405 (and does not call Google)", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { res, captured } = mockRes();
    await handler(mockReq("POST"), res);

    expect(captured.status).toBe(405);
    expect(captured.headers?.["Allow"]).toBe("GET");
    expect(JSON.parse(captured.body ?? "{}")).toEqual({ slots: [] });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 502 (uncached) when Google responds non-ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 404, text: () => Promise.resolve("") }),
    );
    const { res, captured } = mockRes();
    await handler(mockReq(), res);

    expect(captured.status).toBe(502);
    expect(JSON.parse(captured.body ?? "{}")).toEqual({ slots: [] });
    expect(captured.headers?.["Cache-Control"]).toBeUndefined();
  });

  it("returns 502 when the parser finds no slots (format change)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve("<html>no form data here</html>") }),
    );
    const { res, captured } = mockRes();
    await handler(mockReq(), res);

    expect(captured.status).toBe(502);
    expect(JSON.parse(captured.body ?? "{}")).toEqual({ slots: [] });
  });

  it("returns 502 when the fetch throws (network failure)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    const { res, captured } = mockRes();
    await handler(mockReq(), res);

    expect(captured.status).toBe(502);
    expect(JSON.parse(captured.body ?? "{}")).toEqual({ slots: [] });
  });
});
