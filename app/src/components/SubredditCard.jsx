import React from 'react';
import {useState} from 'react';

export default function SubredditCard(props){
    const [isSelected, setIsSelected] = useState(false);
    return (
        <div className="subreddit-card">
            <h3>{props.subreddit.title ? props.subreddit.title : "Loading title..."}</h3>
            <p>{props.subreddit.rules ? props.subreddit.rules : "Loading rules..."}</p>
        </div>
    );
}