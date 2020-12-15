import { gql } from "@apollo/client";

export const LOGIN_WITH_EMAIL = gql`
  mutation Dudenes($email: String!, $password: String!) {
    loginWithEmail(input: { email: $email, password: $password }) {
      token
      errors
    }
  }
`;
