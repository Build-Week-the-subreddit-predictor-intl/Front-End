import React from "react";
import { Route, Redirect } from "react-router-dom";

const isAuthed = () => {
  return sessionStorage.getItem("token") ? true : false;
};

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        isAuthed() ? children : <Redirect to={{ pathname: "/login" }} />
      }
    />
  );
};

export default PrivateRoute;