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

const likeFunc = (likes, users, auth_id) => {
    const listOfLikers = [];
    for (let i = 0; i < likes.length; i++) {
         if (likes[i].liked_id === auth_id) {
            for (let j = 0; j < users.length; j++) {
                 if (users[j].id === likes[i].liker_id) {
                    listOfLikers.push(users[j]);
                 }
            }
         }
    }
    return listOfLikers;
}

const viewFunc = (views, users, auth_id) => {
    const listOfViews = [];
    for (let i = 0; i < views.length; i++) {
         if (views[i].viewed_id === auth_id) {
            for (let j = 0; j < users.length; j++) {
                 if (users[j].id === views[i].viewer_id) {
                    listOfViews.push(users[j]);
                 }
            }
         }
    }
    return listOfViews;
}

const matchesFunc = (matches, users, auth_id) => {
    const listOfMatches = [];
    for (let i = 0; i < matches.length; i++) {
         if (matches[i].liker_id === auth_id || matches[i].liked_id === auth_id) {
            for (let j = 0; j < users.length; j++) {
                 if ((users[j].id === matches[i].liker_id || users[j].id === matches[i].liked_id) && users[j].id !== auth_id) {
                    listOfMatches.push(users[j]);
                 }
            }
         }
    }
    return listOfMatches;
  }

class News extends Component {

    render () {
        const { auth, views, users, likes, matches } = this.props;
        
        if (!auth.uid) {
            return ( <Redirect to="/signin"/> )
        } else {
            if (likes && users && auth && matches) {
                const users_likes = likeFunc(likes, users, auth.uid);
                const users_views = viewFunc(views, users, auth.uid);
                const users_matches = matchesFunc(matches, users, auth.uid);
                return (
                    <div>
                        <Navbar/>
                        <div className="nuus-page">
                        <span className="viud_name">{ "Your Notifications" } </span><br/><br/><hr/><br/>
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active" id="nav-visit-tab" data-toggle="tab" href="#nav-visit" role="tab" aria-controls="nav-visit" aria-selected="true">Visits</a>
                                    <a className="nav-item nav-link" id="nav-like-tab" data-toggle="tab" href="#nav-like" role="tab" aria-controls="nav-like" aria-selected="false">Likes</a>
                                    <a className="nav-item nav-link" id="nav-match-tab" data-toggle="tab" href="#nav-match" role="tab" aria-controls="nav-match" aria-selected="false">Matches</a>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-visit" role="tabpanel" aria-labelledby="nav-visit-tab">
                                    <NewsVisits users_views={users_views} auth={auth} />
                                </div>
                                <div className="tab-pane fade" id="nav-like" role="tabpanel" aria-labelledby="nav-like-tab ">
                                    <NewsLikes users_likes={users_likes} auth={auth}/>
                                </div>
                                <div className="tab-pane fade" id="nav-match" role="tabpanel" aria-labelledby="nav-match-tab">
                                    <NewsMatches users_matches={users_matches} auth={auth} />
                                </div>
                            </div>
                        </div>
                        <Footer/>     
                    </div>
                )
            } else {
                return (
                    <div id="dot-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                );
            }
        }
    }
}

const mapStateToProps = (state) => {
    const auth = state.firebase.auth;
    const views = state.firestore.ordered.views;
    const users = state.firestore.ordered.users;
    const likes = state.firestore.ordered.likes;
    const matches = state.firestore.ordered.matches;
    return {
        auth: auth,
        users: users,
        views: views,
        matches: matches,
        likes: likes
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "users" },
        { collection: "views", orderBy: ["createdAt", "desc"] },
        { collection: "matches", orderBy: ["createdAt", "desc"] },
        { collection: "likes", orderBy: ["createdAt", "desc"] }
    ])
) (News);