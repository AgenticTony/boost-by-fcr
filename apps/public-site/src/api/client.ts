import {
  mockNewsArticles,
  mockTimeline,
  mockResources,
  type NewsArticle,
  type TimelineEntry,
  type Resource,
} from "./mock-data";

export type { NewsArticle, TimelineEntry, Resource };
import { resourceCategoryLabels, formatFileSize } from "@/lib/resource-utils";

// Simulated API delay
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── News ───

export async function fetchNews(): Promise<NewsArticle[]> {
  await delay(100);
  return mockNewsArticles;
}

export async function fetchNewsBySlug(
  slug: string,
): Promise<NewsArticle | null> {
  await delay(100);
  return mockNewsArticles.find((a) => a.slug === slug) ?? null;
}

// ─── Timeline ───

export async function fetchTimeline(): Promise<TimelineEntry[]> {
  await delay(100);
  return mockTimeline;
}

// ─── Resources ───

export async function fetchResources(): Promise<Resource[]> {
  await delay(100);
  return mockResources;
}

export async function fetchResourcesByCategory(
  category: string,
): Promise<Resource[]> {
  await delay(100);
  if (category === "alla") return mockResources;
  return mockResources.filter((r) => r.category === category);
}

// ─── Forms ───

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  track: string;
  about?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitRegistration(
  _data: RegistrationFormData,
): Promise<{ success: boolean }> {
  await delay(800);
  return { success: true };
}

export async function submitContact(
  _data: ContactFormData,
): Promise<{ success: boolean }> {
  await delay(800);
  return { success: true };
}

// ─── Category helpers (re-exported for convenience) ───

export { resourceCategoryLabels, formatFileSize };
