import * as Koa from "koa";
import { ApolloServer } from "apollo-server-koa";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

const genContext = ({ ctx }: { ctx: Koa.Context }) => {
  return {
    ...ctx,
  };
};

export default new ApolloServer({ typeDefs, resolvers, context: genContext });
