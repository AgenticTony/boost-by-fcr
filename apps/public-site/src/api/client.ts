/**
 * API client — barrel re-export.
 *
 * All functions delegate to the active adapter (mock now, Hygraph in Sprint 3).
 * Pages import from here and never touch the adapter directly.
 */

// ─── Adapter singleton (swap here for Sprint 3) ───
import { createMockAdapter } from "./mock-adapter";
const adapter = createMockAdapter();

// ─── Types ───
export type { NewsArticle, TimelineEntry, Resource } from "@/types";
export type { RegistrationFormData, ContactFormData } from "@/types/forms";

// ─── Data functions ───

export const fetchNews = () => adapter.fetchNews();
export const fetchNewsBySlug = (slug: string) => adapter.fetchNewsBySlug(slug);
export const fetchTimeline = () => adapter.fetchTimeline();
export const fetchResources = () => adapter.fetchResources();
export const fetchResourcesByCategory = (category: string) =>
  adapter.fetchResourcesByCategory(category);
export const submitRegistration = (
  data: Parameters<typeof adapter.submitRegistration>[0],
) => adapter.submitRegistration(data);
export const submitContact = (
  data: Parameters<typeof adapter.submitContact>[0],
) => adapter.submitContact(data);

// ─── Category helpers (re-exported for convenience) ───

export { resourceCategoryLabels, formatFileSize } from "@/lib/resource-utils";
