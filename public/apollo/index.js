import { ApolloClient, createHttpLink } from "@apollo/client";

export default client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: createHttpLink({
    uri: process.env.NEXT_PUBLIC_ODDNAAN_PUBLIC_GRAPHQL_ENDPOINT,
  }),
  cache: new InMemoryCache(),
});
