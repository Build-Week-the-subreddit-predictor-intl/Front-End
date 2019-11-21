import React from "react";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PostCardWrapper } from "./styled-components";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import actions from "../actions";

export default function PostCard(props) {
  const dispatch = useDispatch();
  const redditAuthState = useSelector(state => state.redditAuthState);
  const postToReddit = useCallback((title, text, subreddit)=> ()=>dispatch(actions.postToReddit(
    {
      title,
      text,
      state: redditAuthState,
      subreddit
    }
  )), []);

  const match = useRouteMatch({
    path: "/post-history/post/:id",
    exact: true
  });

  const matchId = match && match.params.id ? match.params.id : null;

  const link = matchId
    ? `/post-history/post/${matchId}`
    : `/post-history/post/${props.postData.id}`;

  useEffect(() => {
    if (matchId) {
      dispatch(actions.fetchSingle(matchId));
    }
  }, [dispatch, matchId]);

  const posts = useSelector(state => state.posts);
  const filterPost = match
    ? posts.find(post => `${post.id}` === match.params.id)
    : "";
  const post = filterPost || props.postData;

  return (
    <PostCardWrapper className="post-card">
      <Link to={link}>
        <div className="box">
          <div className="box-header">
            {post.title}
          </div>
          <p className="box-body">
            {post.text}
          </p>
        </div>
      </Link>
      <div className="button-container">
        <Link to={`${link}/edit`}>
          <button>Edit Post</button>
        </Link>
        <button
          onClick={() =>
            dispatch(
              actions.deleteById(post.id)
            )
          }
        >
          Delete Post
        </button>
      </div>
      {
        post.suggestion && !post.flair_text ? post.suggestion.map((subreddit)=>{
          return (
              <button className = "reddit-post" onClick = {postToReddit(post.title, post.text, subreddit, post.id)} key = {subreddit}>{`Post to r/${subreddit}`}</button>
          )
        })
        :
        null
      }
    </PostCardWrapper>
  );
}
