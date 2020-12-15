import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User as UserModel } from "src/data/models/User";
import { Post as PostModel } from "src/data/models/Post";

const { ODDNAAN_AUTH_SECRET: AUTH_SECRET } = process.env;

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
  loginWithEmail: async (
    _: any,
    args: { input: { email: string; password: string } },
    context: any
  ) => {
    const {
      input: { email, password },
    } = args;

    const userRepo = getRepository(UserModel);

    // TODO Is this the right way to denote optional typing?
    let user: UserModel | undefined;

    try {
      // Match on either e-mail or username
      user = await userRepo.findOne({
        where: [{ email }, { username: email }],
      });
    } catch (e) {
      console.error("Trouble finding user", e);
      return { errors: ["Unauthorized"] };
    }

    try {
      if (!AUTH_SECRET) {
        console.error("AUTH_SECRET is not set");
        throw new Error("An error occurred");
      }

      if (!user) {
        console.error("No user found for email/username", email, user);
        return { errors: ["Unauthorized"] };
      }

      await new Promise((resolve, reject) =>
        bcrypt.compare(password, user?.password || "", (err, res) => {
          if (err) reject(err);
          if (!res) reject("Invalid password");
          resolve(true);
        })
      );

      return {
        token: jwt.sign(
          { user: { ...user, password: undefined } },
          AUTH_SECRET,
          { expiresIn: "365d" }
        ),
      };
    } catch (e) {
      console.error(e);
      throw new Error("Login failed");
    }
  },
};

export default { Query, Mutation };
