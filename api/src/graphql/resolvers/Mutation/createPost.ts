import { getRepository } from "typeorm";
import { Post } from "src/data/models/Post";

const translateBodyFormatEnum = (
  input: "MARKDOWN" | "JSX" | "HTML" | "TEXT"
): "markdown" | "jsx" | "html" | "text" => {
  switch (input) {
    case "MARKDOWN":
      return "markdown";
    case "JSX":
      return "jsx";
    case "HTML":
      return "html";
    case "TEXT":
      return "text";
    default:
      return "markdown";
  }
};

export default async (
  _: any,
  args: {
    input: {
      title: string;
      body: string;
      isPublished: boolean;
      bodyFormat: "MARKDOWN" | "JSX" | "HTML" | "TEXT";
    };
  },
  context: any
) => {
  const {
    input: { title, body, isPublished, bodyFormat },
  } = args;
  const postRepo = getRepository(Post);
  const createdPost = postRepo.create({
    title,
    body,
    isPublished,
    bodyFormat: translateBodyFormatEnum(bodyFormat),
    author: context.req.user,
  });

  try {
    await postRepo.save(createdPost);
  } catch (e) {
    console.error("Could not create post", e);
    return { errors: ["Could not create post"] };
  }

  return { createdPost };
};
