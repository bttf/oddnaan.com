import { gql } from "@apollo/client";

// TODO Consolidate ALL_POSTS_QUERY and ALL_ASSETS_QUERY into one. They're curr-
// ently being utilized on the same page.
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

export const GET_POST_QUERY = gql`
  query GetPost($uuid: String!) {
    post(uuid: $uuid) {
      uuid
      title
      body
      createdAt
      updatedAt
      isPublished
      bodyFormat
    }
  }
`;
