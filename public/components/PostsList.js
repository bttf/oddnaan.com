import Link from "next/link";
import { formatISO } from "date-fns";

const _unixTimeToDate = (timeStr) => {
  console.log("huh", timeStr);
  console.log("huh?", new Date(parseInt(timeStr)));
  return new Date(parseInt(timeStr));
};

export default function PostsList({ isLoading, posts }) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-4xl">Loading...</div>
      </div>
    );
  }

  return posts.map((post) => (
    <div key={post.id} className="mx-0 my-7">
      <div className="text-4xl">
        <Link href={post.url}>
          <span className="hover:text-link-blue cursor-pointer">
            {post.title}
          </span>
        </Link>
      </div>
      <div className="mt-2 flex flex-wrap">
        <div className="mr-2">
          <span className="font-bold text-gray-400">Created: </span>
          <span>
            {formatISO(_unixTimeToDate(post.createdAt), {
              representation: "date",
            })}
          </span>
        </div>
        {post.updatedAt && (
          <div className="mr-2">
            <span className="font-bold text-gray-400">Updated: </span>
            <span>
              {formatISO(_unixTimeToDate(post.updatedAt), {
                representation: "date",
              })}
            </span>
          </div>
        )}
        <div className="mr-2">
          <span className="font-bold text-gray-400">Word count: </span>
          <span>{post.wordCount}</span>
        </div>
      </div>
    </div>
  ));
}
