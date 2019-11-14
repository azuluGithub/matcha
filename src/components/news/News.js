import React, { Component } from 'react';
import NewsLikes from './NewsLikes';
import NewsVisits from './NewsVisits';
import NewsMatches from './NewsMatches';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class News extends Component {

    render () {
        const { auth, my_views, my_likes } = this.props;
        if (!auth.uid) {
            return ( <Redirect to="/signin"/> )
        } else {
            return (
                <div className="newsMain container-fluid">
                    <div className="row">
                        <div className="col-sm-12 col-md-3 col-lg-4 newsSides">
                            
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 newsCenter pre-scrollable">
                            <div className="newsMain">
                                <p className="newsTitle">NOTIFICATIONS</p>
                                <NewsMatches />
                                <NewsLikes my_likes={my_likes}/>
                                <NewsVisits my_views={my_views} />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-lg-4 newsSides"></div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    const authId = state.firebase.auth.uid;
    const views = state.firestore.ordered.views;
    const likes = state.firestore.ordered.likes;
    const filtered_views = views && views.filter(view => {
        return authId === view.viewed_id
    })
    const filtered_likes = likes && likes.filter(like => {
        return authId === like.liked_id
    })
    return {
        auth: state.firebase.auth,
        my_views: filtered_views,
        my_likes: filtered_likes
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "views", orderBy: ["createdAt", "asc"] },
        { collection: "likes", orderBy: ["createdAt", "asc"] }
    ])
) (News);