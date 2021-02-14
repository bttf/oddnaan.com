import Head from "next/head";
import Header from "../components/Header";
import Television from "../components/Television";

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
      </div>
    </div>
  );
}
