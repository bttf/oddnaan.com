import { getRepository } from "typeorm";
import { Post } from "src/data/models/Post";

export default async (
  _: any,
  args: {
    uuid: string;
    title: string;
    body: string;
    isPublished: boolean;
    bodyFormat: "markdown" | "jsx" | "html" | "text";
  },
  context: any
) => {
  const { uuid, title, body, isPublished, bodyFormat } = args;
  const postRepo = getRepository(Post);
  let editedPost;

  try {
    editedPost = await postRepo
      .createQueryBuilder()
      .update(Post)
      .set({
        title,
        body,
        isPublished,
        bodyFormat,
      })
      .where({ uuid })
      .returning(["title", "body", "is_published", "body_format"])
      .execute();
  } catch (e) {
    console.error("Could not edit post", e);
    return { errors: ["Trouble editing post"] };
  }

  return { editedPost };
};
