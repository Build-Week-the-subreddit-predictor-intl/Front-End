import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import actions from "../actions";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.logout());
  }, [dispatch]);

  return <div>You have been logged out.</div>;
};

export default Logout;
