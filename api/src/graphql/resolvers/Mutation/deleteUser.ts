import { getRepository } from "typeorm";
import { User } from "src/data/models/User";

export default async (_: any, args: { uuid: string }, context: any) => {
  const { uuid } = args;
  const userRepo = getRepository(User);

  try {
    await userRepo.delete({ uuid });
  } catch (e) {
    console.error("Could not delete user", e);
    return { errors: ["Trouble deleting user"] };
  }

  return { deletedUser: { uuid } };
};
