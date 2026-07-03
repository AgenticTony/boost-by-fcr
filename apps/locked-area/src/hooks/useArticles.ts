import { useQuery } from "@tanstack/react-query";
import { client } from "../api/client";
import { GET_ARTICLES } from "../api/queries";

export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const result = await client.query(GET_ARTICLES, {}).toPromise();
      if (result.error) throw result.error;
      return result.data?.articles;
    },
  });
};
