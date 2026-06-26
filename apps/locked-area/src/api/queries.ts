import { gql } from "urql";

export const GET_ARTICLES = gql`
  query GetArticles {
    articles(orderBy: publishedAt_DESC) {
      id
      title
      slug
      summary
      publishedAt
      publishedDate
      readTime
      category
      image {
        url
      }
    }
  }
`;

export const GET_PAGES = gql`
  query GetPages {
    pages {
      id
      title
      slug
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      slug
      tagline
      description {
        html
      }
      image {
        url
      }
    }
  }
`;
