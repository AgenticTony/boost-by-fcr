import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock graphql-request so the adapter factory can be exercised without network.
// Hoisted so the mock is registered before the module under test loads.
const { requestMock, GraphQLClientMock } = vi.hoisted(() => {
  const requestMock = vi.fn();
  return {
    requestMock,
    // Regular function so it is callable with `new GraphQLClient(...)`.
    GraphQLClientMock: vi.fn().mockImplementation(function () {
      return { request: requestMock };
    }),
  };
});

vi.mock("graphql-request", () => ({
  GraphQLClient: GraphQLClientMock,
}));

import {
  mapNews,
  mapTimeline,
  mapResource,
  richTextToPlainText,
  createHygraphAdapter,
} from "./hygraph-adapter";
import type { NewsArticle, TimelineEntry, Resource } from "@/types";

describe("richTextToPlainText", () => {
  it("flattens a Hygraph rich-text AST into blank-line-separated paragraphs", () => {
    const raw = JSON.stringify({
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", text: "First paragraph." }],
        },
        {
          type: "paragraph",
          children: [{ type: "text", text: "Second one." }],
        },
      ],
    });
    expect(richTextToPlainText(raw)).toBe("First paragraph.\n\nSecond one.");
  });

  it("concatenates inline text nodes within a block", () => {
    const raw = JSON.stringify({
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            { type: "text", text: "Hello " },
            { type: "text", text: "world" },
          ],
        },
      ],
    });
    expect(richTextToPlainText(raw)).toBe("Hello world");
  });

  it("returns the raw string unchanged when it is not JSON (plain text)", () => {
    const plain = "Just a plain string body.";
    expect(richTextToPlainText(plain)).toBe(plain);
  });

  it("returns the raw string unchanged when the JSON has no block children", () => {
    const raw = '{"type":"root","children":[]}';
    expect(richTextToPlainText(raw)).toBe(raw);
  });

  it("drops empty/whitespace-only blocks", () => {
    const raw = JSON.stringify({
      type: "root",
      children: [
        { type: "paragraph", children: [{ type: "text", text: "   " }] },
        { type: "paragraph", children: [{ type: "text", text: "kept" }] },
      ],
    });
    expect(richTextToPlainText(raw)).toBe("kept");
  });

  it("treats a leaf node with neither text nor children as empty", () => {
    // A node like { type: "image" } hits collectText's final `return ""`.
    const raw = JSON.stringify({
      type: "root",
      children: [
        { type: "image" },
        { type: "paragraph", children: [{ type: "text", text: "kept" }] },
      ],
    });
    expect(richTextToPlainText(raw)).toBe("kept");
  });
});

describe("mapNews", () => {
  const base = {
    id: "n1",
    slug: "hello-world",
    title: "Hello World",
    publishedAt: "2026-01-01T00:00:00Z",
    category: "nyhet",
    excerpt: "Short summary",
  };

  it("maps all fields and flattens a rich-text body", () => {
    const bodyRaw = JSON.stringify({
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", text: "Body text" }],
        },
      ],
    });
    const mapped = mapNews({ ...base, body: { raw: bodyRaw } });
    const expected: NewsArticle = {
      ...base,
      body: "Body text",
      imageUrl: undefined,
      imageAlt: undefined,
      author: undefined,
    };
    expect(mapped).toEqual(expected);
  });

  it("keeps a plain-string body unchanged", () => {
    const mapped = mapNews({ ...base, body: "Plain body" });
    expect(mapped.body).toBe("Plain body");
  });

  it("maps optional image and author when present", () => {
    const mapped = mapNews({
      ...base,
      body: "x",
      image: { url: "https://img/x.jpg", altText: "alt" },
      author: "Anna",
    });
    expect(mapped.imageUrl).toBe("https://img/x.jpg");
    expect(mapped.imageAlt).toBe("alt");
    expect(mapped.author).toBe("Anna");
  });
});

describe("mapTimeline", () => {
  it("maps all fields including optional image", () => {
    const mapped = mapTimeline({
      id: "t1",
      year: 2010,
      projectName: "Start",
      description: "Began",
      funder: "ESF",
      image: { url: "https://img/t.jpg", altText: "alt" },
    });
    const expected: TimelineEntry = {
      id: "t1",
      year: 2010,
      projectName: "Start",
      description: "Began",
      funder: "ESF",
      imageUrl: "https://img/t.jpg",
      imageAlt: "alt",
    };
    expect(mapped).toEqual(expected);
  });

  it("defaults optional fields to undefined", () => {
    const mapped = mapTimeline({
      id: "t2",
      year: 2011,
      projectName: "X",
      description: "Y",
    });
    expect(mapped.funder).toBeUndefined();
    expect(mapped.imageUrl).toBeUndefined();
  });
});

describe("mapResource", () => {
  it("maps all fields including optional file metadata", () => {
    const mapped = mapResource({
      id: "r1",
      title: "Guide",
      slug: "guide",
      category: "metodmaterial",
      description: "A guide",
      file: { url: "https://files/g.pdf", fileName: "g.pdf", fileSize: 1234 },
      fileType: "pdf",
      isPublic: true,
    });
    const expected: Resource = {
      id: "r1",
      title: "Guide",
      slug: "guide",
      category: "metodmaterial",
      description: "A guide",
      fileUrl: "https://files/g.pdf",
      fileName: "g.pdf",
      fileSize: 1234,
      fileType: "pdf",
      isPublic: true,
    };
    expect(mapped).toEqual(expected);
  });
});

/**
 * Adapter factory: verifies each read maps Hygraph payloads and that form
 * submissions are honest no-ops (delivered=false) until a backend exists.
 * Network is intercepted via the graphql-request mock above.
 */
describe("createHygraphAdapter", () => {
  beforeEach(() => {
    requestMock.mockReset();
    GraphQLClientMock.mockClear();
  });

  const endpoint = "https://test.hygraph.com/graphql";

  function makeAdapter(token?: string) {
    return createHygraphAdapter(endpoint, token);
  }

  it("constructs a GraphQLClient with a bearer header when a token is given", () => {
    makeAdapter("tok");
    expect(GraphQLClientMock).toHaveBeenCalledWith(endpoint, {
      headers: { Authorization: "Bearer tok" },
    });
  });

  it("omits the Authorization header when no token is supplied", () => {
    makeAdapter();
    expect(GraphQLClientMock).toHaveBeenCalledWith(endpoint, { headers: {} });
  });

  it("fetchNews maps Hygraph articles", async () => {
    requestMock.mockResolvedValue({
      newsArticles: [
        {
          id: "n1",
          slug: "s1",
          title: "Title",
          publishedAt: "2026-01-01T00:00:00Z",
          category: "nyhet",
          excerpt: "Ex",
          body: { raw: "Plain body" },
        },
      ],
    });
    const news = await makeAdapter().fetchNews();
    expect(news).toHaveLength(1);
    expect(news[0]).toMatchObject({
      id: "n1",
      title: "Title",
      body: "Plain body",
    });
  });

  it("fetchNewsBySlug returns null when the article is absent", async () => {
    requestMock.mockResolvedValue({ newsArticle: null });
    expect(await makeAdapter().fetchNewsBySlug("missing")).toBeNull();
  });

  it("fetchNewsBySlug returns a mapped article when present", async () => {
    requestMock.mockResolvedValue({
      newsArticle: {
        id: "n2",
        slug: "s2",
        title: "T2",
        publishedAt: "2026-02-02T00:00:00Z",
        category: "nyhet",
        excerpt: "e",
        body: { raw: "b" },
      },
    });
    const article = await makeAdapter().fetchNewsBySlug("s2");
    expect(article?.id).toBe("n2");
  });

  it("fetchTimeline maps timeline entries", async () => {
    requestMock.mockResolvedValue({
      timelineEntries: [
        { id: "t1", year: 2010, projectName: "P", description: "D" },
      ],
    });
    const timeline = await makeAdapter().fetchTimeline();
    expect(timeline).toHaveLength(1);
    expect(timeline[0].projectName).toBe("P");
  });

  it("fetchResources maps resources", async () => {
    requestMock.mockResolvedValue({
      resources: [
        {
          id: "r1",
          title: "R",
          slug: "r",
          category: "normer",
          description: "d",
          isPublic: true,
        },
      ],
    });
    const resources = await makeAdapter().fetchResources();
    expect(resources).toHaveLength(1);
    expect(resources[0].title).toBe("R");
  });

  it("fetchResourcesByCategory forwards the category to the query", async () => {
    requestMock.mockResolvedValue({ resources: [] });
    await makeAdapter().fetchResourcesByCategory("normer");
    expect(requestMock).toHaveBeenCalledWith(expect.anything(), {
      category: "normer",
    });
  });

  it("fetchResourcesByCategory('alla') delegates to fetchResources with no category filter", async () => {
    requestMock.mockResolvedValue({
      resources: [
        {
          id: "r1",
          title: "R",
          slug: "r",
          category: "normer",
          description: "d",
          isPublic: true,
        },
      ],
    });
    const resources = await makeAdapter().fetchResourcesByCategory("alla");
    expect(resources).toHaveLength(1);
    // The "alla" path calls client.request(query) with a single argument.
    expect(requestMock).toHaveBeenCalledWith(expect.anything());
  });

  it("submitRegistration warns and signals not delivered (no backend yet)", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = await makeAdapter().submitRegistration({} as never);
    expect(result).toEqual({ success: true, delivered: false });
    expect(warnSpy).toHaveBeenCalled();
  });

  it("submitContact warns and signals not delivered (no backend yet)", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = await makeAdapter().submitContact({} as never);
    expect(result).toEqual({ success: true, delivered: false });
    expect(warnSpy).toHaveBeenCalled();
  });

  const contactPayload = {
    name: "Anna",
    email: "anna@example.se",
    subject: "Hej",
    message: "Testmeddelande",
  };

  it("submitContact POSTs to VITE_CONTACT_WORKER_URL and reports delivered on success", async () => {
    vi.stubEnv("VITE_CONTACT_WORKER_URL", "https://worker.test/submit");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, id: "abc" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await makeAdapter().submitContact(contactPayload);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://worker.test/submit",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(contactPayload),
      }),
    );
    expect(result).toEqual({ success: true, delivered: true });

    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("submitContact reports not delivered when the worker responds non-2xx", async () => {
    vi.stubEnv("VITE_CONTACT_WORKER_URL", "https://worker.test/submit");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) }),
    );
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await makeAdapter().submitContact(contactPayload);
    expect(result).toEqual({ success: false, delivered: false });

    errSpy.mockRestore();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("submitContact reports not delivered when the network call throws", async () => {
    vi.stubEnv("VITE_CONTACT_WORKER_URL", "https://worker.test/submit");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await makeAdapter().submitContact(contactPayload);
    expect(result).toEqual({ success: false, delivered: false });

    errSpy.mockRestore();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("propagates request errors so the resilient layer can fall back", async () => {
    requestMock.mockRejectedValue(new Error("network down"));
    await expect(makeAdapter().fetchNews()).rejects.toThrow("network down");
  });
});
