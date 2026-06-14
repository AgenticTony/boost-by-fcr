/**
 * API client — barrel re-export.
 *
 * All functions delegate to the active adapter.
 * Set VITE_USE_HYGRAPH=true to switch from mock to Hygraph.
 * Pages import from here and never touch the adapter directly.
 */

// ─── Adapter singleton ───
import { createMockAdapter } from "./mock-adapter";
import { createHygraphAdapter } from "./hygraph-adapter";

const useHygraph = import.meta.env.VITE_USE_HYGRAPH === "true";

const adapter = useHygraph
  ? createHygraphAdapter(
      import.meta.env.VITE_HYGRAPH_ENDPOINT ?? "",
      import.meta.env.VITE_HYGRAPH_TOKEN,
    )
  : createMockAdapter();

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
export const submitRegistration = adapter.submitRegistration.bind(adapter);
export const submitContact = adapter.submitContact.bind(adapter);

// ─── Category helpers (re-exported for convenience) ───

export { resourceCategoryLabels, formatFileSize } from "@/lib/resource-utils";
