import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PostCardWrapper } from "./styled-components";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import actions from "../actions";

export default function PostCard(props) {
  const dispatch = useDispatch();

  const match = useRouteMatch({
    path: "/post-history/post/:id",
    exact: true
  });

  const link = match
    ? `/post-history/post/${match.params.id}`
    : `/post-history/post/${props.postData.id}`;

  useEffect(() => {
    if (match) {
      dispatch(actions.fetchSingle(match.params.id));
    }
  }, [dispatch, match]);
  const posts = useSelector(state => state.posts);
  const filterPost = match
    ? posts.find(post => `${post.id}` === match.params.id)
    : "";

  return (
    <PostCardWrapper className="post-card">
      <Link to={link}>
        <div className="box">
          <div className="box-header">
            <img src="https://via.placeholder.com/80x80" alt="" />
            {filterPost ? filterPost.title : props.postData.title}
          </div>
          <p className="box-body">
            {filterPost ? filterPost.text : props.postData.text}
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
              actions.deleteById(filterPost ? filterPost.id : props.postData.id)
            )
          }
        >
          Delete Post
        </button>
      </div>
    </PostCardWrapper>
  );
}
