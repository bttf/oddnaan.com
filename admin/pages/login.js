import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Pane, majorScale, TextInput } from "evergreen-ui";
import { LOGIN_WITH_EMAIL } from "../lib/graphql/mutations";
import { publicClient } from "../lib/apollo";
import { LOCAL_STORAGE_TOKEN } from "../lib/constants";

export default function Login() {
  const [isLoadingToken, setIsLoadingToken] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginWithEmailM] = useMutation(LOGIN_WITH_EMAIL, {
    client: publicClient,
    update(_, res) {
      setIsLoadingToken(false);

      const {
        data: {
          loginWithEmail: { token, errors },
        },
      } = res || {};

      if (!token) {
        console.log("Nah dawg", errors);
      }

      window.localStorage.setItem(LOCAL_STORAGE_TOKEN, token);

      window.location.href = "/";
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoadingToken(true);

    loginWithEmailM({
      variables: { email, password },
    });
  };

  return (
    <Pane
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Pane
        is="form"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        onSubmit={handleSubmit}
      >
        <TextInput
          marginBottom={majorScale(2)}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></TextInput>
        <TextInput
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></TextInput>
        <input style={{ visibility: "hidden" }} type="submit"></input>
      </Pane>
    </Pane>
  );
}
