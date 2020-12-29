import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import marked from "marked";
import { format } from "date-fns";
import { Button, majorScale, Pane, Text, TextInput } from "evergreen-ui";
import { CREATE_POST, EDIT_POST } from "../../lib/graphql/mutations";
import "react-markdown-editor-lite/lib/index.css";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

export default function NewPost({ post = {} }) {
  const titleRef = useRef(null);
  const router = useRouter();
  const [title, setTitle] = useState(post.title || "New post");
  const [body, setBody] = useState(post.body || "");
  const [savedAt, setSavedAt] = useState(
    post.updatedAt
      ? format(new Date(parseInt(post.updatedAt, 10)), "pp PP")
      : null
  );
  const [createPostM] = useMutation(CREATE_POST);
  const [editPostM] = useMutation(EDIT_POST);

  useEffect(() => {
    // Only select if this is a new post
    if (titleRef && !post.uuid) {
      const el = titleRef.current;
      el.select();
    }
  }, [titleRef]);

  const savePost = async () => {
    if (post.uuid) {
      await editPostM({
        variables: {
          uuid: post.uuid,
          title,
          body,
          bodyFormat: "MARKDOWN",
        },
      });
    } else {
      const createdPostRes = await createPostM({
        variables: { title, body, bodyFormat: "MARKDOWN", isPublished: false },
      });
      const post = createdPostRes?.data?.createPost?.createdPost;
      router.push(`/posts/${post.uuid}`);
    }

    setSavedAt(format(new Date(), "pp PP"));
  };

  /**
   * onChange
   *  - update local state
   *  - debounce mutation to save
   */

  /**
   * onImageUpload
   *  - fn that returns promise that resolves to image url
   *  - call backend mutation - should return URL
   *  - backend mutation should save it as an asset
   */

  return (
    <>
      <Head>
        <title>{title} - oddnaan admin</title>
      </Head>
      <Pane paddingX={majorScale(2)}>
        <Pane display="flex" alignItems="center">
          <TextInput
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title goes here"
            size={600}
            width="100%"
            paddingY={majorScale(3)}
            marginY={majorScale(2)}
          />
        </Pane>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={marked}
          value={body}
          onChange={({ text }) => setBody(text)}
        />

        <Pane
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          marginY={majorScale(2)}
        >
          {savedAt && <Text>Saved {savedAt}</Text>}
          <Button
            marginX={majorScale(1)}
            onClick={() => (window.location.href = "/")}
          >
            Cancel
          </Button>
          <Button onClick={savePost}>Save</Button>
        </Pane>
      </Pane>
    </>
  );
}
