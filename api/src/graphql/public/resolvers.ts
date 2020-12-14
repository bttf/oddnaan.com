import { Post as PostModel } from "src/data/models/Post";

const Post = {
  // TODO Add type definition for `context`
  author: (_post: PostModel, _args: any, context: any) => {
    // fetch user here
    return {};
  },
};

const Query = {
  // TODO Add type definition for `context`
  post: (_source: any, args: { uuid: string }, context: any) => {
    const { uuid } = args;
    // find post by uuid
    return {};
  },
  // TODO Add type definition for `context`
  posts: (_source: any, _args: any, context: any) => {
    // find all posts
    return [{}];
  },
};

const Mutation = {
  // TODO Add type definition for `context`
  // TODO Add type definitino for `args`;
  // Can it be generated from LoginWithEmailInput graphql type?
  loginWithEmail: async (_: any, args: any, context: any) => {},
};

export default { Query, Mutation };
