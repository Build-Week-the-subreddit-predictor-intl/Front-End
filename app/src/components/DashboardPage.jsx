import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useRouteMatch, useHistory } from "react-router-dom";
import queryString from "query-string";

import actions from "../actions";
import DashboardWithFormik from "./Dashboard";
import { ButtonReddit } from "./styled-components";

const DashBoardWithRedditAuth = () => {
  const redditUrl = useSelector(state => state.redditAuthUrl);
  const authed = useSelector(state => state.redditAuth);
  const posts = useSelector(state => state.posts);
  const history = useHistory();
  const [postData, setPostData] = useState();
  const location = useLocation();
  const dispatch = useDispatch();
  const match = useRouteMatch({
    path: "/post-history/post/:id/edit",
    exact: true
  });

  const matchId = match && match.params.id ? match.params.id : null;

  useEffect(() => {
    const values = queryString.parse(location.search);
    dispatch(actions.getRedditUrl());
    if (!authed && values.state) {
      dispatch(
        actions.sendRedditAuthToBackend({
          state: values.state,
          code: values.code
        })
      );
    }
  }, [authed, dispatch, location.search]);

  useEffect(() => {
    setPostData({
      title: matchId ? posts.find(post => `${post.id}` === matchId).title : "",
      text: matchId ? posts.find(post => `${post.id}` === matchId).text : "",
      id: matchId ? matchId : ""
    });
  }, [posts, matchId]);

  return (
    <>
      {authed ? (
        <DashboardWithFormik
          {...postData}
          isEditing={match && match.params.id ? true : false}
          history={history}
        />
      ) : (
        <a href={redditUrl}>
          <ButtonReddit>Authorize with Reddit</ButtonReddit>
        </a>
      )}
    </>
  );
};

export default DashBoardWithRedditAuth;
