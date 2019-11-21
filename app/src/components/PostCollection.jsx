import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import PostCard from "./PostCard";

export default function PostCollection(props) {
  const location = useLocation();
  const posts = useSelector(state => state.posts);
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
