import React from 'react';
import NewsUnLikesSummary from './NewsUnLikesSummary';

const NewsUnLikes = ({ users_unLikes, auth, blocks, iBlocked }) => {
    return (
        <div>
            { users_unLikes && users_unLikes.map(user => <NewsUnLikesSummary key={Math.random() * 100000} blocks={blocks} iBlocked={iBlocked} user={user} auth={auth}/>) }
        </div>
    )
}

export default NewsUnLikes;