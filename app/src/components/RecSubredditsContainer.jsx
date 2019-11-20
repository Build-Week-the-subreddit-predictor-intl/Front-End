import React from 'react';
import SubredditCard from './SubredditCard';


export default function RecSubredditsContainer(props){
    return(
        <div className="subreddits-container">
            <SubredditCard subreddit = {{}}></SubredditCard>
        </div>
    );
}