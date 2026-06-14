import { GraphQLClient } from "graphql-request";
import type { ApiAdapter } from "./adapter";
import type { NewsArticle, TimelineEntry, Resource } from "@/types";
import type { RegistrationFormData, ContactFormData } from "@/types/forms";

// ─── Hygraph field mapping ─────────────────────────────────────────
/**
 * These interfaces match the Hygraph schema the backend team is building.
 * Field names use camelCase — backend must match these exactly.
 * If field names differ, only the GraphQL queries below need updating.
 */
interface HygraphNews {
  id: string;
  slug: string;
  title: string;
  publishedAt: string;
  category: string;
  excerpt: string;
  body: { raw: string } | string;
  image?: { url: string; altText?: string };
  author?: string;
}

interface HygraphTimeline {
  id: string;
  year: number;
  projectName: string;
  description: string;
  funder?: string;
  image?: { url: string; altText?: string };
}

interface HygraphResource {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  file?: { url: string; fileName?: string; fileSize?: number };
  fileType?: string;
  isPublic: boolean;
}

// ─── GraphQL queries ────────────────────────────────────────────────

const NEWS_FRAGMENT = `
fragment NewsFields on NewsArticle {
  id
  slug
  title
  publishedAt
  category
  excerpt
  body { raw }
  image { url altText }
  author
}`;

const TIMELINE_FRAGMENT = `
fragment TimelineFields on TimelineEntry {
  id
  year
  projectName
  description
  funder
  image { url altText }
}`;

const RESOURCE_FRAGMENT = `
fragment ResourceFields on Resource {
  id
  title
  slug
  category
  description
  file { url fileName fileSize }
  fileType
  isPublic
}`;

const FETCH_NEWS = `
${NEWS_FRAGMENT}
query FetchNews {
  newsArticles(orderBy: publishedAt_DESC) {
    ...NewsFields
  }
}`;

const FETCH_NEWS_BY_SLUG = `
${NEWS_FRAGMENT}
query FetchNewsBySlug($slug: String!) {
  newsArticle(where: { slug: $slug }) {
    ...NewsFields
  }
}`;

const FETCH_TIMELINE = `
${TIMELINE_FRAGMENT}
query FetchTimeline {
  timelineEntries(orderBy: year_ASC) {
    ...TimelineFields
  }
}`;

const FETCH_RESOURCES = `
${RESOURCE_FRAGMENT}
query FetchResources {
  resources(where: { isPublic: true }) {
    ...ResourceFields
  }
}`;

const FETCH_RESOURCES_BY_CATEGORY = `
${RESOURCE_FRAGMENT}
query FetchResourcesByCategory($category: String!) {
  resources(where: { category: $category, isPublic: true }) {
    ...ResourceFields
  }
}`;

// ─── Mappers ────────────────────────────────────────────────────────

function mapNews(raw: HygraphNews): NewsArticle {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    publishedAt: raw.publishedAt,
    category: raw.category,
    excerpt: raw.excerpt,
    body: typeof raw.body === "string" ? raw.body : (raw.body?.raw ?? ""),
    imageUrl: raw.image?.url,
    imageAlt: raw.image?.altText,
    author: raw.author,
  };
}

function mapTimeline(raw: HygraphTimeline): TimelineEntry {
  return {
    id: raw.id,
    year: raw.year,
    projectName: raw.projectName,
    description: raw.description,
    funder: raw.funder,
    imageUrl: raw.image?.url,
    imageAlt: raw.image?.altText,
  };
}

function mapResource(raw: HygraphResource): Resource {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    category: raw.category,
    description: raw.description,
    fileUrl: raw.file?.url,
    fileName: raw.file?.fileName,
    fileSize: raw.file?.fileSize,
    fileType: raw.fileType,
    isPublic: raw.isPublic,
  };
}

// ─── Adapter factory ────────────────────────────────────────────────

/**
 * Create a Hygraph-backed API adapter.
 *
 * @param endpoint - Hygraph Content API URL (e.g. https://eu-west-2.cdn.hygraph.com/content/.../master)
 * @param token    - Permanent Auth Token (optional for public content)
 */
export function createHygraphAdapter(
  endpoint: string,
  token?: string,
): ApiAdapter {
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const client = new GraphQLClient(endpoint, { headers });

  return {
    async fetchNews() {
      const data = await client.request<{ newsArticles: HygraphNews[] }>(
        FETCH_NEWS,
      );
      return data.newsArticles.map(mapNews);
    },

    async fetchNewsBySlug(slug) {
      const data = await client.request<{ newsArticle: HygraphNews | null }>(
        FETCH_NEWS_BY_SLUG,
        { slug },
      );
      return data.newsArticle ? mapNews(data.newsArticle) : null;
    },

    async fetchTimeline() {
      const data = await client.request<{
        timelineEntries: HygraphTimeline[];
      }>(FETCH_TIMELINE);
      return data.timelineEntries.map(mapTimeline);
    },

    async fetchResources() {
      const data = await client.request<{ resources: HygraphResource[] }>(
        FETCH_RESOURCES,
      );
      return data.resources.map(mapResource);
    },

    async fetchResourcesByCategory(category) {
      if (category === "alla") return this.fetchResources();
      const data = await client.request<{ resources: HygraphResource[] }>(
        FETCH_RESOURCES_BY_CATEGORY,
        { category },
      );
      return data.resources.map(mapResource);
    },

    // Forms are not CMS-backed — these stay as no-ops until a backend endpoint exists
    async submitRegistration(_data: RegistrationFormData) {
      console.warn(
        "[hygraph-adapter] submitRegistration: no backend endpoint yet",
      );
      return { success: true };
    },

    async submitContact(_data: ContactFormData) {
      console.warn("[hygraph-adapter] submitContact: no backend endpoint yet");
      return { success: true };
    },
  };
}
