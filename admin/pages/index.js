import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client";
import { format } from "date-fns";
import {
  AddIcon,
  Checkbox,
  Heading,
  majorScale,
  Pane,
  Spinner,
  Text,
  UploadIcon,
} from "evergreen-ui";
import { ALL_ASSETS_QUERY, ALL_POSTS_QUERY } from "../lib/graphql/queries";
import { EDIT_POST } from "../lib/graphql/mutations";
// import styles from "../styles/Home.module.css";

const PostRow = ({ post, index, onPublish }) => {
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
        width="182px"
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
        <Checkbox
          checked={post.isPublished}
          onChange={(e) => onPublish(post, e.target.checked)}
          label="published"
        />
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

  const [editPostM] = useMutation(EDIT_POST, {
    update(cache, res) {
      const {
        data: {
          editPost: { editedPost, errors },
        },
      } = res || {};

      if (!editedPost) {
        console.log("Could not edit post", errors);
      }

      const { posts } = cache.readQuery({
        query: ALL_POSTS_QUERY,
      });

      cache.writeQuery({
        query: ALL_POSTS_QUERY,
        data: {
          posts: posts.map((p) =>
            p.uuid === editedPost.uuid ? editedPost : p
          ),
        },
      });
    },
  });

  const {
    loading: allAssetsLoading,
    error: allAssetsError,
    data: allAssetsData,
  } = useQuery(ALL_ASSETS_QUERY);

  const { posts = [] } = allPostsData || {};
  const { assets = [] } = allAssetsData || {};
  const onPublish = (post, isPublished) => {
    console.log("onPublish");
    editPostM({
      variables: { uuid: post.uuid, isPublished },
    });
  };

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

      <Pane
        flex={1}
        display="flex"
        flexDirection="column"
        minHeight={0}
        position="relative"
      >
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
          paddingBottom="64px"
        >
          <Link href="/posts/new">
            <Pane
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              background="greenTint"
              padding={majorScale(2)}
              display="flex"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              zIndex={9}
            >
              <AddIcon color="success" marginX={majorScale(1)} />
              <Text color="#47B881">New post</Text>
            </Pane>
          </Link>
          {allPostsLoading ? (
            <Spinner />
          ) : (
            posts.map((p, i) => (
              <PostRow post={p} index={i} onPublish={onPublish} />
            ))
          )}
        </Pane>
      </Pane>

      <Pane flex={1} display="flex" flexDirection="column" position="relative">
        <Heading flexShrink={1} size={700} marginY={majorScale(2)}>
          assets
        </Heading>
        <Pane
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          background="blueTint"
          padding={majorScale(2)}
          display="flex"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          zIndex={9}
          onClick={() => alert("upload asset")}
        >
          <UploadIcon color="info" marginX={majorScale(1)} />
          <Text color="#1070CA">Upload asset</Text>
        </Pane>
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
