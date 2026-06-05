import { useQuery } from "@tanstack/react-query";
import { fetchResources } from "@/api/client";

export function useResources(category: string) {
  return useQuery({
    queryKey: ["resources", category],
    queryFn: async () => {
      const all = await fetchResources();
      if (category === "alla") return all;
      return all.filter((r) => r.category === category);
    },
  });
}
