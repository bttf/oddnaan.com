import { useEffect, useState } from "react";
import { Pane } from "evergreen-ui";
import { useQuery } from "@apollo/client";
import { LOCAL_STORAGE_TOKEN } from "../lib/constants";
import { ALL_ASSETS_QUERY, ALL_POSTS_QUERY } from "../lib/graphql/queries";
// import styles from "../styles/Home.module.css";

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

export default function Dashboard() {
  const [isLoadingToken, setIsLoadingToken] = useState(true);

  // Check for token in local storage. If it does not exist, redirect.
  useEffect(() => {
    if (!getAuthToken()) {
      window.location.href = "/login";
    } else {
      setIsLoadingToken(false);
    }
  }, []);

  const {
    loading: allPostsLoading,
    error: allPostsError,
    data: allPostsData,
  } = useQuery(ALL_POSTS_QUERY);

  const {
    loading: allAssetsLoading,
    error: allAssetsError,
    data: allAssetsData,
  } = useQuery(ALL_ASSETS_QUERY);

  // TODO Reflect assets loading state in child component
  if (isLoadingToken || allPostsLoading) {
    return <LoadingState />;
  }

  return (
    <div>
      <h1>wooo boy</h1>
      <h2>posts</h2>
      <ul>
        {allPostsData.map((p) => (
          <li>{p.title}</li>
        ))}
      </ul>
      <h2>assets</h2>
      <ul>
        {allAssetsData.map((a) => (
          <li>{a.name}</li>
        ))}
      </ul>
    </div>
  );
}
