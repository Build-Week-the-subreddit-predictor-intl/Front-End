import React from "react";
import { useSelector } from "react-redux";
import PostCard from "./PostCard";

export const previousPosts = [
  {
    title: "Lorem ipsum dolor sit amet",
    text:
      "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ",
    id: 0
  },
  {
    title: "Lorem ipsum dolor sit amet",
    text:
      "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ",
    id: 1
  },
  {
    title: "Lorem ipsum dolor sit amet",
    text:
      "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ",
    id: 2
  },
  {
    title: "Lorem ipsum dolor sit amet",
    text:
      "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ",
    id: 3
  },
  {
    title: "Lorem ipsum dolor sit amet",
    text:
      "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ",
    id: 4
  }
];
export default function PostCollection(props) {

  if (!previousPosts) {
    return <h2 className="loader">Loading...</h2>;
  } else {
    return (
      <div className="post-collection">
        <h2>Latest Posts</h2>
        {previousPosts.map(post => {
          return <PostCard postData={post} key={post.id} />;
        })}
      </div>
    );
  }
}
