import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import { Checkbox, Heading, majorScale, Pane, Spinner } from "evergreen-ui";
import { ALL_ASSETS_QUERY, ALL_POSTS_QUERY } from "../lib/graphql/queries";
// import styles from "../styles/Home.module.css";

const PostRow = ({ post, index }) => {
  return (
    <Pane
      key={post.uuid}
      width="100%"
      display="flex"
      background={index % 2 !== 0 ? undefined : "tint1"}
    >
      <Pane
        flexShrink={1}
        display="flex"
        alignItems="center"
        paddingX={majorScale(1)}
      >
        {format(new Date(parseInt(post.createdAt, 10)), "p PP")}
      </Pane>
      <Pane
        flex={4}
        display="flex"
        alignItems="center"
        paddingX={majorScale(4)}
      >
        {post.title}
      </Pane>
      <Pane flexShrink={1} paddingX={majorScale(1)}>
        <Checkbox checked={post.isPublished} label="published" />
      </Pane>
    </Pane>
  );
};

const AssetRow = ({ asset, index }) => {
  return (
    <Pane
      key={asset.uuid}
      width="100%"
      display="flex"
      background={index % 2 !== 0 ? undefined : "tint1"}
    >
      <Pane
        flexShrink={1}
        display="flex"
        alignItems="center"
        paddingX={majorScale(1)}
      >
        {format(new Date(parseInt(asset.createdAt, 10)), "p PP")}
      </Pane>
      <Pane
        flex={4}
        display="flex"
        alignItems="center"
        paddingX={majorScale(4)}
      >
        <a href={asset.url}>{asset.name}</a>
      </Pane>
      <Pane flexShrink={1} paddingX={majorScale(1)}>
        <Checkbox checked={asset.isPrivate} label="private" />
      </Pane>
    </Pane>
  );
};

export default function Dashboard() {
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

  const { posts = [] } = allPostsData || {};
  const { assets = [] } = allAssetsData || {};

  return (
    <Pane
      padding={majorScale(4)}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Pane flexShrink={1}>
        <Heading size={900}>oddnaan.com</Heading>
      </Pane>

      <Pane flex={1} display="flex" flexDirection="column" minHeight={0}>
        <Heading flexShrink={1} size={700} marginY={majorScale(2)}>
          posts
        </Heading>
        <Pane
          flex={1}
          elevation={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          overflowY="scroll"
        >
          {allPostsLoading ? (
            <Spinner />
          ) : (
            posts.map((p, i) => <PostRow post={p} index={i} />)
          )}
        </Pane>
      </Pane>

      <Pane flex={1} display="flex" flexDirection="column">
        <Heading flexShrink={1} size={700} marginY={majorScale(2)}>
          assets
        </Heading>
        <Pane
          flex={1}
          elevation={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          overflowY="scroll"
        >
          {allAssetsLoading ? (
            <Spinner />
          ) : (
            assets.map((a, i) => <AssetRow asset={a} index={i} />)
          )}
        </Pane>
      </Pane>
    </Pane>
  );
}
