import React from 'react';
import NewsMatchesSummary from './NewsMatchesSummary';

const NewsMatches = ({ users_matches, auth, blocks, iBlocked }) => {
    return (
        <div>
            { users_matches && users_matches.map(user => <NewsMatchesSummary key={Math.random() * 100000} blocks={blocks} iBlocked={iBlocked} auth={auth} user={user}/>) }
        </div>
    )
}

export default NewsMatches;

