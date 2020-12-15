import { gql } from "@apollo/client";

export const ALL_POSTS_QUERY = gql`
  query AllPosts {
    posts {
      uuid
      title
      createdAt
      updatedAt
      isPublished
    }
  }
`;

export const ALL_ASSETS_QUERY = gql`
  query AllAssets {
    assets {
      uuid
      name
      url
      createdAt
      isPrivate
    }
  }
`;
