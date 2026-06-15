import { describe, it, expect } from "vitest";
import {
  mapNews,
  mapTimeline,
  mapResource,
  richTextToPlainText,
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
