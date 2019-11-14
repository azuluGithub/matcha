import React from 'react';
import NewsMatches from './NewsMatches';
import NewsVisits from './NewsVisits';
import NewsLikes from './NewsLikes';

const HistoryVisits = () => {
    return (
        <div>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-item nav-link active" id="nav-match-tab" data-toggle="tab" href="#nav-match" role="tab" aria-controls="nav-match" aria-selected="true">Matches</a>
                    <a className="nav-item nav-link" id="nav-visit-tab" data-toggle="tab" href="#nav-visit" role="tab" aria-controls="nav-visit" aria-selected="false">Visits</a>
                    <a className="nav-item nav-link" id="nav-like-tab" data-toggle="tab" href="#nav-like" role="tab" aria-controls="nav-like" aria-selected="false">Likes</a>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-match" role="tabpanel" aria-labelledby="nav-match-tab">
                    <NewsMatches />
                </div>
                <div className="tab-pane fade" id="nav-visit" role="tabpanel" aria-labelledby="nav-visit-tab">
                    <NewsVisits />
                </div>
                <div className="tab-pane fade" id="nav-like" role="tabpanel" aria-labelledby="nav-like-tab">
                    <NewsLikes />
                </div>
            </div>
        </div>
    )
}

export default HistoryVisits
