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
import NewsUnLikes from './NewsUnLikes';

const iBlocked = (blocker_id, blocked_id) => (block) => {
    return block.blocker_id === blocker_id && block.blocked_id === blocked_id;
}

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

const unLikeFunc = (unLikes, users, auth_id) => {
    const listOfunLikers = [];
    for (let i = 0; i < unLikes.length; i++) {
         if (unLikes[i].unLiked_id === auth_id) {
            for (let j = 0; j < users.length; j++) {
                if (users[j].id === unLikes[i].unLiker_id) {
                    listOfunLikers.push(users[j]);
                }
            }
         }
    }
    return listOfunLikers;
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
        const { auth, views, users, likes, unLikes, matches, blocks } = this.props;
        if (!auth.uid) {
            return ( <Redirect to="/signin"/> )
        } else {
            if (likes && unLikes && users && auth && matches && views && blocks) {
                const users_likes = likeFunc(likes, users, auth.uid);
                const users_unLikes = unLikeFunc(unLikes, users, auth.uid);
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
                                    <a className="nav-item nav-link" id="nav-unLike-tab" data-toggle="tab" href="#nav-unLike" role="tab" aria-controls="nav-unLike" aria-selected="false">unLikes</a>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-visit" role="tabpanel" aria-labelledby="nav-visit-tab">
                                    <NewsVisits blocks={blocks} iBlocked={iBlocked} users_views={users_views} auth={auth} />
                                </div>
                                <div className="tab-pane fade" id="nav-like" role="tabpanel" aria-labelledby="nav-like-tab ">
                                    <NewsLikes blocks={blocks} iBlocked={iBlocked} users_likes={users_likes} auth={auth}/>
                                </div>
                                <div className="tab-pane fade" id="nav-match" role="tabpanel" aria-labelledby="nav-match-tab">
                                    <NewsMatches blocks={blocks} iBlocked={iBlocked} users_matches={users_matches} auth={auth} />
                                </div>
                                <div className="tab-pane fade" id="nav-unLike" role="tabpanel" aria-labelledby="nav-unLike-tab ">
                                    <NewsUnLikes blocks={blocks} iBlocked={iBlocked} users_unLikes={users_unLikes} auth={auth}/>
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
    const blocks = state.firestore.ordered.blocks;
    const views = state.firestore.ordered.views;
    const users = state.firestore.ordered.users;
    const likes = state.firestore.ordered.likes;
    const unLikes = state.firestore.ordered.unLikes;
    const matches = state.firestore.ordered.matches;
    return {
        auth: auth,
        blocks: blocks,
        users: users,
        views: views,
        matches: matches,
        likes: likes,
        unLikes: unLikes
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "users" },
        { collection: "blocks"},
        { collection: "views", orderBy: ["createdAt", "desc"] },
        { collection: "matches", orderBy: ["createdAt", "desc"] },
        { collection: "likes", orderBy: ["createdAt", "desc"] },
        { collection: "unLikes", orderBy: ["createdAt", "desc"] }
    ])
) (News);