import { gql } from "@apollo/client";

export const GET_ALL_POSTS_QUERY = gql`
  query GetAllPosts {
    posts {
      uuid
      title
      createdAt
    }
  }
`;
