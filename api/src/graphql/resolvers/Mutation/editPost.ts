import { getRepository } from "typeorm";
import { Post } from "src/data/models/Post";
import { translateBodyFormatEnum } from "./createPost";

export default async (
  _: any,
  args: {
    input: {
      uuid: string;
      title: string;
      body: string;
      isPublished: boolean;
      bodyFormat: "MARKDOWN" | "JSX" | "HTML" | "TEXT";
    };
  },
  context: any
) => {
  const {
    input: { uuid, title, body, isPublished, bodyFormat },
  } = args;
  const postRepo = getRepository(Post);
  let postUpdateResult;

  try {
    postUpdateResult = await postRepo
      .createQueryBuilder()
      .update(Post)
      .set({
        ...(title ? { title } : {}),
        ...(body ? { body } : {}),
        ...(isPublished != null ? { isPublished } : {}),
        ...(bodyFormat
          ? { bodyFormat: translateBodyFormatEnum(bodyFormat) }
          : {}),
      })
      .where({ uuid })
      .returning(["uuid", "title", "body", "isPublished", "bodyFormat"])
      .execute();
  } catch (e) {
    console.error("Could not edit post", e);
    return { errors: ["Trouble editing post"] };
  }

  const editedPost = postUpdateResult.raw[0];

  return {
    editedPost: {
      uuid: editedPost.uuid,
      title: editedPost.title,
      body: editedPost.body,
      isPublished: editedPost.is_published,
      bodyFormat: editedPost.body_format.toUpperCase(),
    },
  };
};
