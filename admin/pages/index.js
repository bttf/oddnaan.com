import { useRef, useState } from "react";
import NextLink from "next/link";
import { useMutation, useQuery } from "@apollo/client";
import { format } from "date-fns";
import {
  AddIcon,
  Checkbox,
  Heading,
  Link,
  majorScale,
  Pane,
  Spinner,
  Text,
  UploadIcon,
} from "evergreen-ui";
import { onLogout } from "../lib/auth";
import { ALL_ASSETS_QUERY, ALL_POSTS_QUERY } from "../lib/graphql/queries";
import { CREATE_ASSETS, EDIT_POST } from "../lib/graphql/mutations";

const PostRow = ({ post, index, onPublish }) => {
  return (
    <Pane
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
        <NextLink href={`/posts/${post.uuid}`}>{post.title}</NextLink>
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
        width="182px"
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
        <Checkbox disabled checked={asset.isPrivate} label="private" />
      </Pane>
    </Pane>
  );
};

export default function Dashboard() {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    loading: allPostsLoading,
    error: allPostsError,
    data: allPostsData,
  } = useQuery(ALL_POSTS_QUERY);

  const {
    loading: allAssetsLoading,
    error: allAssetsError,
    data: allAssetsData,
    refetch: allAssetsRefetch,
  } = useQuery(ALL_ASSETS_QUERY);

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

  const [createAssetsM] = useMutation(CREATE_ASSETS, {
    update(cache, res) {
      const {
        data: {
          createAssets: { createdAssets, errors },
        },
      } = res || {};

      if (!createdAssets || !createdAssets.length) {
        console.log("Assets weren't uploaded", errors);
      }

      allAssetsRefetch();
      setIsUploading(false);
    },
  });

  const { posts = [] } = allPostsData || {};
  const { assets = [] } = allAssetsData || {};

  const onPublish = (post, isPublished) => {
    editPostM({
      variables: { uuid: post.uuid, isPublished },
    });
  };

  // When user clicks 'Upload asset' div, simulate click on hidden file input element
  const onUploadClick = () => {
    if (fileInputRef) {
      fileInputRef.current.click();
    }
  };

  const onFilesUploaded = (e) => {
    setIsUploading(true);
    createAssetsM({
      variables: {
        files: e.target.files,
      },
    });
  };

  return (
    <Pane
      padding={majorScale(4)}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Pane flexShrink={1} display="flex" alignItems="baseline">
        <Heading size={900} paddingRight={majorScale(1)}>
          oddnaan.com
        </Heading>
        <Link cursor="pointer" onClick={onLogout}>
          Log out
        </Link>
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
          <NextLink href="/posts/new">
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
          </NextLink>
          {allPostsLoading ? (
            <Spinner />
          ) : (
            posts.map((p, i) => (
              <PostRow key={p.uuid} post={p} index={i} onPublish={onPublish} />
            ))
          )}
        </Pane>
      </Pane>

      <Pane
        flex={1}
        display="flex"
        flexDirection="column"
        minHeight={0}
        position="relative"
      >
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
          paddingBottom="64px"
        >
          <Pane
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            background={isUploading ? "tint2" : "blueTint"}
            padding={majorScale(2)}
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor={isUploading ? "not-allowed" : "pointer"}
            zIndex={9}
            onClick={isUploading ? () => {} : onUploadClick}
          >
            {isUploading ? (
              <Spinner size={20} />
            ) : (
              <>
                <UploadIcon color="info" marginX={majorScale(1)} />
                <Text color="#1070CA">Upload asset</Text>
              </>
            )}
          </Pane>
          {allAssetsLoading ? (
            <Spinner />
          ) : (
            assets.map((a, i) => <AssetRow asset={a} index={i} />)
          )}
        </Pane>
      </Pane>
      <Pane display="none">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          required
          onChange={onFilesUploaded}
        />
      </Pane>
    </Pane>
  );
}
