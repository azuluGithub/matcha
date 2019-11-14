import React from 'react';
import NewsViewsSummary from './NewsViewsSummary';

const NewsVisits = ({ my_views }) => {
    return (
        <div>
            { my_views && my_views.map(view => <NewsViewsSummary key={Math.random() * 100000} view={view}/>) }
        </div>
    )
}

export default NewsVisits;
