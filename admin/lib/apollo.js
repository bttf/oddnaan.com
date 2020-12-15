import { ApolloClient, InMemoryCache } from "@apollo/client";
import { LOCAL_STORAGE_TOKEN } from "./constants";
import { onLogout } from "./auth";

const {
  ODDNAAN_GRAPHQL_ENDPOINT,
  ODDNAAN_PUBLIC_GRAPHQL_ENDPOINT,
} = process.env;

export const client = new ApolloClient({
  uri: ODDNAAN_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN);
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  onError: ({ graphQLErrors, networkErrors }) => {
    if (graphQLErrors) {
      const isUnauthorized =
        graphQLErrors &&
        graphQLErrors.some((e) => e.message === "Unauthorized");

      // Log out and redirect to login page if unauthorized
      if (isUnauthorized) {
        onLogout();
        window.location.href = "/login";
      }

      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }

    if (networkErrors) {
      // TODO figure out what to do with network errors
      console.log(`[Network error]: ${networkErrors}`);
    }
  },
});

export const publicClient = new ApolloClient({
  uri: ODDNAAN_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});
