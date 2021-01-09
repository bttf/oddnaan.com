import { ApolloServer, gql } from "apollo-server-koa";
import resolvers from "./graphql/public/resolvers";
import typeDefs from "./graphql/public/typeDefs";

const context = () => ({});

export default new ApolloServer({ typeDefs, resolvers, context });
