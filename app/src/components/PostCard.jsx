import React from "react";
import { PostCardWrapper } from "./styled-components";
import {Link} from 'react-router-dom';

export default function PostCard(props) {
  return (
    <PostCardWrapper className="post-card">
      <Link to = {`/post-history/post${props.postData.id}`}>
        <div className="box">
          <div className="box-header">
            <img src="https://via.placeholder.com/80x80" />
            {props.postData.title}
          </div>
          <p className="box-body">{props.postData.text}</p>
        </div>
      </Link>
      <div className="button-container">
        <button>Edit Post</button>
        <button>Delete Post</button>
      </div>
    </PostCardWrapper>
  );
}
