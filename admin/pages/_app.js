import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import { Pane } from "evergreen-ui";
import { LOCAL_STORAGE_TOKEN } from "../lib/constants";
import { client } from "../lib/apollo";
import "../styles/globals.css";

const getAuthToken = () => {
  return window.localStorage.getItem(LOCAL_STORAGE_TOKEN);
};

const LoadingState = () => (
  <Pane
    height="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <h1>Loading</h1>
  </Pane>
);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoadingToken, setIsLoadingToken] = useState(true);

  // Check for token in local storage. If it does not exist, redirect.
  useEffect(() => {
    if (!getAuthToken() && router.pathname !== "/login") {
      window.location.href = "/login";
    } else {
      setIsLoadingToken(false);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>oddnaan admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoadingToken ? <LoadingState /> : <Component {...pageProps} />}
    </ApolloProvider>
  );
}

export default MyApp;
