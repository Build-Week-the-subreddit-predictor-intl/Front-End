import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import actions from "../actions";
import DashboardWithFormik from "./Dashboard";
import { ButtonReddit } from "./styled-components";


const DashBoardWithRedditAuth = () => {
  const redditUrl = useSelector(state => state.redditAuthUrl);
  const authed = useSelector(state => state.redditAuthed);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const values = queryString.parse(location.search);
    if (!authed && values.state) {
      dispatch(
        actions.sendRedditAuthToBackend({
          state: values.state,
          code: values.code
        })
      );
    }
    console.log(values);
  }, [location.search]);
  return (
    <>
      {authed ? (
        <DashboardWithFormik />
      ) : (
        <a href={redditUrl}>
          <ButtonReddit>Authorize with Reddit</ButtonReddit>
        </a>
      )}
    </>
  );
};

export default DashBoardWithRedditAuth;