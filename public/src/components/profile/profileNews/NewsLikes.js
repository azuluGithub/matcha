import React from 'react';
import NewsLikesSummary from './NewsLikesSummary';

const NewsLikes = ({ users_likes, auth }) => {
    return (
        <div>
            { users_likes && users_likes.map(user => <NewsLikesSummary key={Math.random() * 100000} auth={auth} user={user}/>) }
        </div>
    )
}

export default NewsLikes;
