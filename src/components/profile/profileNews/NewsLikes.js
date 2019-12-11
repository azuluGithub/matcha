import React from 'react';
import NewsLikesSummary from './NewsLikesSummary';

const NewsLikes = ({ my_likes }) => {
    return (
        <div>
            { my_likes && my_likes.map(like => <NewsLikesSummary key={Math.random() * 100000} like={like}/>) }
        </div>
    )
}

export default NewsLikes;
