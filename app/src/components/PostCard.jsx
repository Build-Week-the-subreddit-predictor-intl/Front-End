import React from "react";
import { PostCardWrapper } from "./styled-components";

export default function PostCard(props) {
  return (
    <PostCardWrapper className="post-card">
      <div className="box">
        <div className="box-header">
          <img src="https://via.placeholder.com/80x80" />
          {props.postData.title}
        </div>
        <p className="box-body">{props.postData.text}</p>
      </div>
    </PostCardWrapper>
  );
}
