import React from 'react';
import NewsLikesSummary from './NewsLikesSummary';

const NewsLikes = ({ users_likes, auth, blocks, iBlocked }) => {
    return (
        <div>
            { users_likes && users_likes.map(user => <NewsLikesSummary key={Math.random() * 100000} blocks={blocks} iBlocked={iBlocked} auth={auth} user={user}/>) }
        </div>
    )
}

export default NewsLikes;
