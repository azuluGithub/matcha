import React from 'react';
import NewsMatchesSummary from './NewsMatchesSummary';

const NewsMatches = ({ users_matches, auth }) => {
    return (
        <div>
            { users_matches && users_matches.map(user => <NewsMatchesSummary key={Math.random() * 100000} auth={auth} user={user}/>) }
        </div>
    )
}

export default NewsMatches;
