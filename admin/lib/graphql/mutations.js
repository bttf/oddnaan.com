import { gql } from "@apollo/client";

export const LOGIN_WITH_EMAIL = gql`
  mutation LoginWithEmail($email: String!, $password: String!) {
    loginWithEmail(input: { email: $email, password: $password }) {
      token
      errors
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $body: String!
    $isPublished: Boolean!
    $bodyFormat: PostBodyFormatEnum!
  ) {
    createPost(
      input: {
        title: $title
        body: $body
        isPublished: $isPublished
        bodyFormat: $bodyFormat
      }
    ) {
      createdPost {
        uuid
      }
    }
  }
`;

export const EDIT_POST = gql`
  mutation EditPost(
    $uuid: String!
    $title: String
    $body: String
    $isPublished: Boolean
    $bodyFormat: PostBodyFormatEnum
  ) {
    editPost(
      input: {
        uuid: $uuid
        title: $title
        body: $body
        isPublished: $isPublished
        bodyFormat: $bodyFormat
      }
    ) {
      editedPost {
        uuid
        title
        body
        isPublished
        bodyFormat
      }
      errors
    }
  }
`;

export const CREATE_ASSETS = gql`
  mutation CreateAssets($files: [Upload!]!) {
    createAssets(input: { files: $files }) {
      createdAssets {
        name
        url
      }
      errors
    }
  }
`;
