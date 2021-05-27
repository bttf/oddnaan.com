import { gql } from "apollo-server-koa";

const Query = gql`
  type User {
    uuid: String!
    username: String!
    email: String!
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
      url: String!
  }

  type Query {
    post(uuid: String!): Post
    posts: [Post!]!
  }
`;

const Mutation = gql`
  input LoginWithEmailInput {
    email: String!
    password: String!
  }

  type LoginWithEmailPayload {
    token: String
    errors: [String!]
  }

  type Mutation {
    loginWithEmail(input: LoginWithEmailInput): LoginWithEmailPayload
  }
`;

export default [Query, Mutation];
