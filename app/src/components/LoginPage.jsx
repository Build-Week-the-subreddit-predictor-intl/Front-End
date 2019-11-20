import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./Login";

const LoginPage = () => {
  const loggedIn =
    useSelector(state => state.loggedIn) && sessionStorage.getItem("token")
      ? true
      : false;

  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push("/dashboard");
    }
  }, [loggedIn, history]);

  return <Login />;
};

export default LoginPage;
