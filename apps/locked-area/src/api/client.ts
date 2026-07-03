import { Client, cacheExchange, fetchExchange } from "urql";

const HYGRAPH_URL = "https://eu-west-2.cdn.hygraph.com/content/cmpsipkj900tq07w3wypgapa2/master";

export const client = new Client({
  url: HYGRAPH_URL,
  exchanges: [cacheExchange, fetchExchange],
});
