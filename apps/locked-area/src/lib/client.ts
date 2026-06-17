import { Client, cacheExchange, fetchExchange } from '@urql/core';

const url = import.meta.env.VITE_HYGRAPH_URL;
const token = import.meta.env.VITE_HYGRAPH_TOKEN;

if (!url || !token) {
  throw new Error('Missing Hygraph environment variables. Check your .env file.');
}

export const client = new Client({
  url: url as string,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  },
});




// // import { Client, cacheExchange, fetchExchange } from '@urql/core';

// // const url = import.meta.env.VITE_HYGRAPH_URL;
// // const token = import.meta.env.VITE_HYGRAPH_TOKEN;

// // export const client = new Client({
// //   url,
// //   exchanges: [cacheExchange, fetchExchange],
// //   fetchOptions: () => ({
// //     headers: { Authorization: `Bearer ${token}` },
// //   }),
// // });

// VITE_HYGRAPH_URL=https://eu-west-2.cdn.hygraph.com/content/cmpsipkj900tq07w3wypgapa2/master
// VITE_HYGRAPH_TOKEN=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3ODAyNjA5MDQsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY21wcHNyaTRoMDIyZjA3dzd2Y3JxNGw3eC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiODVlZWUzMzAtN2YxMS00ZDk3LWJhNjEtMWM4NmVkY2ZmMzJmIiwianRpIjoiY21wdTlkbDdoMHljaTA3bXE5NXl5YjgycyJ9.L2nNTWKCqwh_N2109WwansAojRekFdOs2H1K0pZi43unSAq-TvLGpYk72jzFPs4qYlqusZYhyn7BRc_m5SQcXjP5kb4ulWzSqzTQ1w3njA72mASmp1u0VPrGigLS9zs5_OOR9lxN_UqjL2Q2t3di1gQOK7zL4B64gc0Lug_4fPwuSSf01VhJCx5iJspraM3MBcbBAuz0Ol40GXdKpZp7Kzsl1oxqrKNllVPCNJKhtinaaePLzR1LB2mjMxs3vlM_gU-oTqzQmuGPTw208jYligieA0RCMQmmwvg-UMrlVdblY1ZO5fe4lVU_m8honoM7-pTVNv8YCfny2eUngnqwNpF4n_UCxGPKRc55p4Y5pvOiHJc6zOPzc36o0w7WdRkl3sTC4f0FXBFySGNx84e_7CX9bgVk3d9H14wRMrnx471BNLPat4u3siO8
