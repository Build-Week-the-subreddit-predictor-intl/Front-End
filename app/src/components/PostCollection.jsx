import React from 'react';
import {useSelector} from 'react-redux';
import PostCard from './PostCard';

export default function PostCollection(props){
    const previousPosts = [
        {
            title: "Lorem ipsum dolor sit amet",
            text: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. "
        },
        {
            title: "Lorem ipsum dolor sit amet",
            text: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. "
        },
        {
            title: "Lorem ipsum dolor sit amet",
            text: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. "
        },
        {
            title: "Lorem ipsum dolor sit amet",
            text: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. "
        },
        {
            title: "Lorem ipsum dolor sit amet",
            text: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. "
        }
    ];

    if(!previousPosts){
        return <h2 className = "loader">Loading...</h2>
    }else{
        return (
            <div className = "post-collection">
                <h2>Latest Posts</h2>
                {
                    previousPosts.map(post=>{
                        return <PostCard postData = {post} key = {post.id}/>
                    })
                }
            </div>
        );
    }
}