import Head from "next/head";
import { useQuery, gql } from "@apollo/client";
import Header from "../components/Header";
import Television from "../components/Television";
import PostsList from "../components/PostsList";
import { GET_ALL_POSTS_QUERY } from "../apollo/queries";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS_QUERY);
  const posts = (data && data.posts) || [];

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
          <PostsList isLoading={loading} posts={posts} />
        </div>
      </div>
    </div>
  );
}
