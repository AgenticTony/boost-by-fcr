import type { NewsArticle, TimelineEntry, Resource } from "@/types";
import type { RegistrationFormData, ContactFormData } from "@/types/forms";

/**
 * Swappable API adapter — switch implementation without touching pages.
 * Mock adapter is active now; Hygraph adapter replaces it in Sprint 3.
 */
export interface ApiAdapter {
  fetchNews(): Promise<NewsArticle[]>;
  fetchNewsBySlug(slug: string): Promise<NewsArticle | null>;
  fetchTimeline(): Promise<TimelineEntry[]>;
  fetchResources(): Promise<Resource[]>;
  fetchResourcesByCategory(category: string): Promise<Resource[]>;
  submitRegistration(data: RegistrationFormData): Promise<{ success: boolean }>;
  submitContact(data: ContactFormData): Promise<{ success: boolean }>;
}
