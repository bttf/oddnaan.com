import Head from "next/head";
import Header from "./Header";

export default function Home() {
  return (
    <div className="font-body">
      <Head>
        <title>oddnaan's blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="py-4 px-8">
        <Header />
      </div>
    </div>
  );
}
