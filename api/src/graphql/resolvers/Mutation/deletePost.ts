import { getRepository } from "typeorm";
import { Post } from "src/data/models/Post";

export default async (_: any, args: { uuid: string }, context: any) => {
  const { uuid } = args;
  const postRepo = getRepository(Post);

  try {
    await postRepo.delete({ uuid });
  } catch (e) {
    console.error("Error deleting post", e);
    return { errors: ["Trouble deleting post"] };
  }

  return { deletedPost: { uuid } };
};
