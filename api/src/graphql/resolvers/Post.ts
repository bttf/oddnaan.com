import { Post } from "../../data/models/Post";

export default {
  bodyFormat(post: Post) {
    return post.bodyFormat.toUpperCase();
  },
};
