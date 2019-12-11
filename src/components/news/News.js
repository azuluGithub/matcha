import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Footer from '../fragements/Footer';
import Navbar from '../fragements/Navbar';
import NewsMatches from './NewsMatches';
import NewsVisits from './NewsVisits';
import NewsLikes from './NewsLikes';

class News extends Component {

    render () {
        const { auth, my_views, my_likes } = this.props;
        if (!auth.uid) {
            return ( <Redirect to="/signin"/> )
        } else {
            return (
                <div>
                    <Navbar/>
                    <div className="nuus-page">
                    <span className="viud_name">{ "Notifications" } </span><hr/><br/>
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link active" id="nav-visit-tab" data-toggle="tab" href="#nav-visit" role="tab" aria-controls="nav-visit" aria-selected="true">Visits</a>
                                <a className="nav-item nav-link" id="nav-like-tab" data-toggle="tab" href="#nav-like" role="tab" aria-controls="nav-like" aria-selected="false">Likes</a>
                                <a className="nav-item nav-link" id="nav-match-tab" data-toggle="tab" href="#nav-match" role="tab" aria-controls="nav-match" aria-selected="false">Matches</a>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-visit" role="tabpanel" aria-labelledby="nav-visit-tab">
                                <NewsVisits my_views={my_views} />
                            </div>
                            <div className="tab-pane fade" id="nav-like" role="tabpanel" aria-labelledby="nav-like-tab ">
                                <NewsLikes my_likes={my_likes}/>
                            </div>
                            <div className="tab-pane fade" id="nav-match" role="tabpanel" aria-labelledby="nav-match-tab">
                                <NewsMatches />
                            </div>
                        </div>
                    </div>
                    <Footer/>     
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
        return authId === like.liked_id ? like.liked_id : null
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
        { collection: "views", orderBy: ["createdAt", "desc"] },
        { collection: "likes", orderBy: ["createdAt", "desc"] }
    ])
) (News);