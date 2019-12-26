import React from 'react';
import NewsViewsSummary from './NewsViewsSummary';

const NewsVisits = ({ users_views, auth }) => {
    return (
        <div>
            { users_views && users_views.map(user => <NewsViewsSummary key={Math.random() * 100000} auth={auth} user={user}/>) }
        </div>
    )
}

export default NewsVisits;
