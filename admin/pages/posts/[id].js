import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { Pane, Spinner } from "evergreen-ui";
import { GET_POST_QUERY } from "../../lib/graphql/queries";
import NewPost from "./new";

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;

  const { loading: postLoading, error: postError, data: postData } = useQuery(
    GET_POST_QUERY,
    {
      variables: { uuid: id },
    }
  );

  if (postLoading) {
    return (
      <Pane
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner />
      </Pane>
    );
  }

  return <NewPost post={postData.post} />;
}
