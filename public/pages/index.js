import Head from "next/head";
import Link from "next/link";
import { formatISO } from "date-fns";
import Header from "../components/Header";
import Television from "../components/Television";

// TODO Actually fetch these from a backend
const blogPosts = [
  {
    url: "/what-i-learned-at-a-hyper-growth-startup",
    title:
      "What I Learned from Working at a Hyper-Growth Startup (And What I Wish I Could Forget)",
    createdAt: new Date("2020-04-20"),
    updatedAt: new Date("2020-10-18"),
    wordCount: 756,
  },
  {
    url: "/why-ruffles-are-the-perfect-potato-chip",
    title: "Why Ruffles are the Perfect Potato Chip",
    createdAt: new Date("2020-01-15"),
    updatedAt: new Date("2020-01-15"),
    wordCount: 1600,
  },
  {
    url:
      "/the-low-down-on-all-the-girls-ive-dated-and-why-i-had-no-choice-but-to-dump-each-and-every-one-of-them",
    title:
      "The Low-down on All the Girls I've Dated, And Why I Had No Choice But To Dump Each And Every One Of Them",
    createdAt: new Date("2020-03-20"),
    updatedAt: new Date("2020-06-15"),
    wordCount: 300,
  },
];

export default function Home() {
  return (
    <div className="font-body">
      <Head>
        <title>oddnaan's blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="py-4 px-8">
        <div className="h-52 w-80 mb-8">
          <Television />
        </div>

        <Header />

        <div className="mt-8">
          {blogPosts.map((post) => (
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
                    {formatISO(post.createdAt, { representation: "date" })}
                  </span>
                </div>
                <div className="mr-2">
                  <span className="font-bold text-gray-400">Updated: </span>
                  <span>
                    {formatISO(post.updatedAt, { representation: "date" })}
                  </span>
                </div>
                <div className="mr-2">
                  <span className="font-bold text-gray-400">Word count: </span>
                  <span>{post.wordCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
