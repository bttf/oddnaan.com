import bcrypt from "bcrypt";
import { User as UserModel } from "../../../data/models/User";
import { getRepository } from "typeorm";

export default async (
  _: any,
  args: { input: { username: string; email: string; password: string } },
  context: any
) => {
  const {
    input: { username, email, password },
  } = args;
  const userRepo = getRepository(UserModel);

  const passwordDigest: string = await new Promise((resolve, reject) =>
    bcrypt.genSalt(10, (err: Error, salt: string) => {
      bcrypt.hash(password, salt, async (err: Error, hash: string) => {
        if (err) reject(err);
        resolve(hash);
      });
    })
  );

  const user = userRepo.create({
    username,
    email,
    password: passwordDigest,
  });

  try {
    await userRepo.save(user);
  } catch (e) {
    console.error("User creation failed", e);
    return { errors: ["User creation failed"] };
  }

  return { createdUser: user };
};
