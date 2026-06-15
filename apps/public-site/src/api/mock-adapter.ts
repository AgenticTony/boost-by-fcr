import type { ApiAdapter } from "./adapter";
import { mockNewsArticles, mockTimeline, mockResources } from "./mock-data";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function createMockAdapter(): ApiAdapter {
  return {
    async fetchNews() {
      await delay(100);
      return mockNewsArticles;
    },

    async fetchNewsBySlug(slug) {
      await delay(100);
      return mockNewsArticles.find((a) => a.slug === slug) ?? null;
    },

    async fetchTimeline() {
      await delay(100);
      return mockTimeline;
    },

    async fetchResources() {
      await delay(100);
      return mockResources;
    },

    async fetchResourcesByCategory(category) {
      await delay(100);
      if (category === "alla") return mockResources;
      return mockResources.filter((r) => r.category === category);
    },

    async submitRegistration(_data) {
      await delay(800);
      // No backend yet: success keeps the happy path, delivered=false tells the
      // UI this wasn't actually sent anywhere.
      return { success: true, delivered: false };
    },

    async submitContact(_data) {
      await delay(800);
      return { success: true, delivered: false };
    },
  };
}
