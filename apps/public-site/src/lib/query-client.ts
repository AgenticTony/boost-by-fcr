import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min — mock data never changes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
