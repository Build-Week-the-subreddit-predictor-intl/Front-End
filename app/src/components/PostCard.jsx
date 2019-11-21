import React from "react";
import { useSelector } from "react-redux";
import { PostCardWrapper } from "./styled-components";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";

export default function PostCard(props) {
  const match = useRouteMatch({
    path: "/post-history/post/:id",
    exact: true
  });

  const link = match
    ? `/post-history/post/${match.params.id}`
    : `/post-history/post/${props.postData.id}`;

  const posts = useSelector(state => state.posts);
  const filterPost = match
    ? posts.find(post => `${post.id}` === match.params.id)
    : "";

  return (
    <PostCardWrapper className="post-card">
      <Link to={link}>
        <div className="box">
          <div className="box-header">
            <img src="https://via.placeholder.com/80x80" />
            {filterPost ? filterPost.title : props.postData.title}
          </div>
          <p className="box-body">
            {filterPost ? filterPost.body : props.postData.text}
          </p>
        </div>
      </Link>
      <div className="button-container">
        <button>Edit Post</button>
        <button>Delete Post</button>
      </div>
    </PostCardWrapper>
  );
}
