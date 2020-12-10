import { ApolloServer, gql } from "apollo-server-koa";
import resolvers from "src/graphql/public/resolvers";
import typeDefs from "src/graphql/public/typeDefs";

const context = () => ({});

export default new ApolloServer({ typeDefs, resolvers, context });
