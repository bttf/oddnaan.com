import { gql } from "apollo-server-koa";

export default gql`
  input CreatePostInput {
    title: String!
    body: String!
    isPublished: Boolean!
    bodyFormat: PostBodyFormatEnum!
  }

  type CreatePostPayload {
    createdPost: Post!
    errors: [String!]
  }

  input EditPostInput {
    uuid: String!
    title: String
    body: String
    isPublished: Boolean
    bodyFormat: PostBodyFormatEnum
  }

  type EditPostPayload {
    editedPost: Post
    errors: [String!]
  }

  input DeletePostInput {
    uuid: String!
  }

  type DeletePostPayload {
    deletedPost: Post
    errors: [String!]
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  type CreateUserPayload {
    createdUser: User
    errors: [String!]
  }

  input EditUserInput {
    uuid: String!
    username: String
    email: String
    oldPassword: String
    newPassword: String
  }

  type EditUserPayload {
    editedUser: User
    errors: [String!]
  }

  input DeleteUserInput {
    uuid: String!
  }

  type DeleteUserPayload {
    deletedUser: User
    errors: [String!]
  }

  input CreateAssetInput {
    name: String!
    url: String!
  }

  type CreateAssetPayload {
    createdAsset: Asset
    errors: [String!]
  }

  input EditAssetInput {
    uuid: String!
    name: String
    url: String
  }

  type EditAssetPayload {
    editedAsset: Asset
    errors: [String!]
  }

  input DeleteAssetInput {
    uuid: String!
  }

  type DeleteAssetPayload {
    deletedAsset: Asset
    errors: [String!]
  }

  type Mutation {
    createPost(input: CreatePostInput!): CreatePostPayload
    editPost(input: EditPostInput!): EditPostPayload
    deletePost(input: DeletePostInput!): DeletePostPayload

    createUser(input: CreateUserInput!): CreateUserPayload
    editUser(input: EditUserInput!): EditUserPayload
    deleteUser(input: DeleteUserInput!): DeleteUserPayload

    createAsset(input: CreateAssetInput): CreateAssetPayload
    editAsset(input: EditAssetInput): EditAssetPayload
    deleteAsset(input: DeleteAssetInput): DeleteAssetPayload
  }
`;
