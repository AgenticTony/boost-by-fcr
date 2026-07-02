import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { IncomingMessage, ServerResponse } from "node:http";
import handler from "./submit";

/**
 * API tests for POST /api/submit. The handler is invoked directly with a mock
 * http req (that streams a JSON body) + mock res, and a stubbed global `fetch`
 * so Supabase is never hit for real. Env vars toggle demo-mode vs live-insert.
 */

const VALID = {
  name: "Anna Andersson",
  personnummer: "990101-1234",
  phone: "070-123 45 67",
  email: "anna@test.se",
  handlerName: "Maria Vägledare",
  handlerContact: "maria@boostbyfcr.se",
  meetingTime: "4 september kl 9:00",
  other: "",
  consent: true,
  website: "",
};

/** Mock req that streams `body` then emits 'end'. POST by default. */
function mockReq(method = "POST", body: unknown = VALID): IncomingMessage {
  const text = typeof body === "string" ? body : JSON.stringify(body);
  const handlers: Record<string, Array<(...a: unknown[]) => void>> = {};
  const req = {
    method,
    on(event: string, cb: (...a: unknown[]) => void) {
      (handlers[event] ||= []).push(cb);
      return req;
    },
    destroy() {},
  };
  setTimeout(() => {
    (handlers["data"] || []).forEach((cb) => cb(text));
    (handlers["end"] || []).forEach((cb) => cb());
  }, 0);
  return req as unknown as IncomingMessage;
}

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

describe("POST /api/submit", () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    errorSpy.mockRestore();
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  });

  it("rejects non-POST requests with 405", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { res, captured } = mockRes();
    await handler(mockReq("GET"), res);
    expect(captured.status).toBe(405);
    expect(captured.headers?.["Allow"]).toBe("POST");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 400 when required fields are missing (and never reaches Supabase)", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { res, captured } = mockRes();
    await handler(
      mockReq("POST", { name: "", personnummer: "", consent: false }),
      res,
    );
    expect(captured.status).toBe(400);
    expect(JSON.parse(captured.body ?? "{}").ok).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 400 when consent is not given", async () => {
    vi.stubGlobal("fetch", vi.fn());
    const { res, captured } = mockRes();
    await handler(mockReq("POST", { ...VALID, consent: false }), res);
    expect(captured.status).toBe(400);
    expect(JSON.parse(captured.body ?? "{}").issues).toBeDefined();
  });

  it("returns honest demo-mode when Supabase env vars are unset", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { res, captured } = mockRes();
    await handler(mockReq(), res);
    expect(captured.status).toBe(200);
    const body = JSON.parse(captured.body ?? "{}");
    expect(body).toMatchObject({ ok: true, delivered: false, demoMode: true });
    // Supabase must NOT be called in demo mode.
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("inserts into Supabase and reports delivered=true when env is set", async () => {
    process.env.SUPABASE_URL = "https://demo.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "svc-key";
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(""),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { res, captured } = mockRes();
    await handler(mockReq(), res);

    expect(captured.status).toBe(200);
    expect(JSON.parse(captured.body ?? "{}")).toMatchObject({
      ok: true,
      delivered: true,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe(
      "https://demo.supabase.co/rest/v1/submissions",
    );
    expect((init as RequestInit).method).toBe("POST");
    const headers = (init as RequestInit).headers as Record<string, string>;
    expect(headers.apikey).toBe("svc-key");
    expect(headers.Authorization).toBe("Bearer svc-key");
    // Consent + meeting time forwarded; consent must be boolean true.
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.meeting_time).toBe("4 september kl 9:00");
    expect(body.consent).toBe(true);
  });

  it("returns 502 when the Supabase insert fails", async () => {
    process.env.SUPABASE_URL = "https://demo.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "svc-key";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500, text: () => Promise.resolve("boom") }),
    );
    const { res, captured } = mockRes();
    await handler(mockReq(), res);
    expect(captured.status).toBe(502);
    expect(JSON.parse(captured.body ?? "{}").ok).toBe(false);
  });

  it("treats a filled honeypot as delivered and skips Supabase", async () => {
    process.env.SUPABASE_URL = "https://demo.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "svc-key";
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { res, captured } = mockRes();
    await handler(mockReq("POST", { ...VALID, website: "spam" }), res);
    expect(captured.status).toBe(200);
    expect(JSON.parse(captured.body ?? "{}")).toMatchObject({
      ok: true,
      delivered: true,
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
