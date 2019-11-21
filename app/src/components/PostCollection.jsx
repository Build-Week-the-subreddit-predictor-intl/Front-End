import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../actions";

import PostCard from "./PostCard";

export default function PostCollection(props) {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const getUsersPosts = useCallback(() => dispatch(actions.fetchPosts()), [
    dispatch
  ]);

  useEffect(() => {
    getUsersPosts();
  }, [getUsersPosts]);

  if (!posts) {
    return <h2 className="loader">Loading...</h2>;
  } else {
    return (
      <div className="post-collection">
        <h2>Latest Posts</h2>
        {posts.map(post => {
          return <PostCard postData={post} key={post.id} />;
        })}
      </div>
    );
  }
}
