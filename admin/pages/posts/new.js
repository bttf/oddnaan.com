import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useMutation } from "@apollo/client";
import marked from "marked";
import { Button, majorScale, Pane, Text, TextInput } from "evergreen-ui";
import { CREATE_POST } from "../../lib/graphql/mutations";
import "react-markdown-editor-lite/lib/index.css";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

export default function NewPost() {
  const titleRef = useRef(null);
  const [title, setTitle] = useState("New post");
  const [body, setBody] = useState("");
  const [savedAt, setSavedAt] = useState(null);
  const [createPostM] = useMutation(CREATE_POST);

  useEffect(() => {
    if (titleRef) {
      const el = titleRef.current;
      el.select();
    }
  }, [titleRef]);

  const savePost = () => {
    // call mutation here
    createPostM({
      variables: { title, body, bodyFormat: "MARKDOWN", isPublished: false },
    });
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
        {/**
         * This needs to be a text input to populate the 'title' field
         * - On pageload, highlight selection
         * - should trigger autosave on change
         */}
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
          {savedAt && <Text>Saved 10:52:44 AM</Text>}
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
