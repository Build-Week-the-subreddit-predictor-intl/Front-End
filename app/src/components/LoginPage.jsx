import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./Login";

const LoginPage = () => {
  const [error, setError] = useState("");
  const loggedIn = useSelector(state => state.loggedIn);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push("/dashboard");
    }
  }, [loggedIn, history]);

  return <Login error={error} setError={setError} />;
};

export default LoginPage;
