import { gql } from "apollo-server-koa";

export default gql`
  type User {
    uuid: String!
    username: String!
    email: String!
  }

  type Asset {
    uuid: String!
    name: String!
    url: String!
    createdAt: String!
    uploader: User!
    isPrivate: Boolean!
  }

  enum PostBodyFormatEnum {
    MARKDOWN
    JSX
    HTML
    TEXT
  }

  type Post {
    uuid: String!
    title: String!
    body: String!
    createdAt: String!
    updatedAt: String!
    isPublished: Boolean!
    bodyFormat: PostBodyFormatEnum!
    author: User!
  }

  enum AssetsOrderByEnum {
    NAME
    CREATED_AT
  }

  type Query {
    post(uuid: String!): Post
    posts: [Post!]!
    asset(uuid: String!): Asset
    assets(orderBy: AssetsOrderByEnum, query: String): [Asset!]!
    user(uuid: String!): User
    users: [User!]!
  }
`;
