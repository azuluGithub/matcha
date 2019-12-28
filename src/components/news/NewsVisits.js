import React from 'react';
import NewsViewsSummary from './NewsViewsSummary';

const NewsVisits = ({ users_views, auth, blocks, iBlocked}) => {
    return (
        <div>
            { users_views && users_views.map(user => <NewsViewsSummary key={Math.random() * 100000} blocks={blocks} iBlocked={iBlocked} auth={auth} user={user}/>) }
        </div>
    )
}

export default NewsVisits;
