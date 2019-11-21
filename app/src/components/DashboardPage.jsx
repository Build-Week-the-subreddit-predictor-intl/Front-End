import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useRouteMatch } from "react-router-dom";
import queryString from "query-string";

import actions from "../actions";
import DashboardWithFormik from "./Dashboard";
import { ButtonReddit } from "./styled-components";

const DashBoardWithRedditAuth = () => {
  const redditUrl = useSelector(state => state.redditAuthUrl);
  const authed = useSelector(state => state.redditAuth);
  const posts = useSelector(state=> state.posts);
  const [postData, setPostData] = useState();
  const location = useLocation();
  const dispatch = useDispatch();
  const match = useRouteMatch({
    path: "/post-history/post/:id/edit",
    exact: true
  });

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

  useEffect(()=>{
    setPostData({
      title: (match && match.params.id) ? posts.find(post=>`${post.id}` === match.params.id).title : "",
      text: (match && match.params.id) ? posts.find(post=>`${post.id}` === match.params.id).text : "",
      id: (match && match.params.id) ? match.params.id : ""
    });
  }, [match, posts]);

  useEffect(()=>{
    // console.log(postData);
    
  }, [postData])

  return (
    <>
      {authed ? (
        <DashboardWithFormik {...postData} isEditing = {match && match.params.id ? true : false}/>
      ) : (
        <a href={redditUrl}>
          <ButtonReddit>Authorize with Reddit</ButtonReddit>
        </a>
      )}
    </>
  );
};

export default DashBoardWithRedditAuth;
