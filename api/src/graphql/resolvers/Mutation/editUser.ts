import bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import { User } from "../../../data/models/User";

export default async (
  _: any,
  args: {
    uuid: string;
    username: string;
    email: string;
    oldPassword: string;
    newPassword: string;
  },
  context: any
) => {
  const { uuid, username, email, oldPassword, newPassword } = args;
  const userRepo = getRepository(User);
  const user = await userRepo.findOne({ where: { uuid } });

  if (!user) {
    return { errors: ["User not found"] };
  }

  // Validate oldPassword
  try {
    await new Promise((resolve, reject) =>
      bcrypt.compare(oldPassword, user?.password || "", (err, res) => {
        if (err) reject(err);
        if (!res) reject("Invalid password");
        resolve(true);
      })
    );
  } catch (e) {
    console.error("Edit user failed - Wrong password", e);
    return { errors: ["Edit user failed"] };
  }

  const passwordDigest: string = await new Promise((resolve, reject) =>
    bcrypt.genSalt(10, (err: Error, salt: string) => {
      bcrypt.hash(newPassword, salt, async (err: Error, hash: string) => {
        if (err) reject(err);
        resolve(hash);
      });
    })
  );

  let editedUser;
  try {
    editedUser = await userRepo
      .createQueryBuilder()
      .update(User)
      .set({ username, email, password: passwordDigest })
      .where({ uuid })
      .returning(["uuid", "username", "email"])
      .execute();
  } catch (e) {
    console.error("Error editing user", e);
    return { errors: ["Trouble editing user"] };
  }

  return { editedUser };
};
