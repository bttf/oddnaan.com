import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCAL_STORAGE_TOKEN } from "./constants";
import { onLogout } from "./auth";

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// For more information on `NEXT_PUBLIC_` prefixes on env vars,
// see https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
export const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: authLink.concat(
    new HttpLink({
      uri: process.env.NEXT_PUBLIC_ODDNAAN_GRAPHQL_ENDPOINT,
    })
  ),
  cache: new InMemoryCache(),
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
  ssrMode: typeof window === "undefined",
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_ODDNAAN_PUBLIC_GRAPHQL_ENDPOINT,
  }),
  cache: new InMemoryCache(),
});
