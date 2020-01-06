import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { likeUser, matchUser, unLikeUser, blockUser } from '../../store/actions/profileActions';
import Navbar from '../fragements/Navbar';
import Footer from '../fragements/Footer';
import User from './User';

const whoLiked = (liker_id, liked_id) => (like) => {
    return like.liker_id === liker_id && like.liked_id === liked_id;
}

const delete_like = (unliker_id, unliked_id) => (like) => {
    return like.liker_id === unliker_id && like.liked_id === unliked_id
}

const delete_unLike = (liker_id, liked_id) => (unLike) => {
    return unLike.unLiker_id === liker_id && unLike.unLiked_id === liked_id
}

const delete_match = (unliker_id, unliked_id) => (match) => {
    return match.liker_id === unliker_id && match.liked_id === unliked_id
}

const iUnLiked = (unLiker_id, unLiked_id) => (unLike) => {
    return unLike.unLiker_id === unLiker_id && unLike.unLiked_id === unLiked_id;
}

class ViewUser extends Component {
    handleLike = (e) => {
       e.preventDefault();
        const { auth, uid, likes, profile, unLikes } = this.props;
        let new_popularity = ++profile.popularity;
        //check if i'm already liked
        const wasILiked = likes.filter(whoLiked(uid, auth.uid));
        //check if I unliked
        const delete_unlike_id = unLikes.filter(delete_unLike(auth.uid, uid));
        //
        if (wasILiked.length > 0 && delete_unlike_id.length > 0) {
            this.props.likeUser(auth.uid, uid, new_popularity, delete_unlike_id[0].id);
            this.props.matchUser(auth.uid, uid);
        } else if (wasILiked.length > 0 && delete_unlike_id.length <= 0) {
            this.props.likeUser(auth.uid, uid, new_popularity, null);
            this.props.matchUser(auth.uid, uid);
        } else if (wasILiked.length <= 0 && delete_unlike_id.length > 0) {
            this.props.likeUser(auth.uid, uid, new_popularity, delete_unlike_id[0].id);
        } else if (wasILiked.length <= 0 && delete_unlike_id.length <= 0) {
            this.props.likeUser(auth.uid, uid, new_popularity, null);
        }
    }

    handleUnLike = (e) => {
       e.preventDefault();
        const { auth, uid, likes, matches } = this.props;
        const delete_id = likes.filter(delete_like(auth.uid, uid));
        const delete_match_id = matches.filter(delete_match(auth.uid, uid));
        if (delete_id.length > 0 && delete_match_id.length > 0) {
            this.props.unLikeUser(auth.uid, uid, delete_id[0].id, delete_match_id[0].id);
        } else if (delete_id.length > 0 && delete_match_id.length <= 0) {
            this.props.unLikeUser(auth.uid, uid, delete_id[0].id, null);
        } /*else if (delete_id.length <= 0 && delete_match_id.length> 0) {
            this.props.unLikeUser(auth.uid, uid, null, delete_match_id[0].id)
        } else {
            this.props.unLikeUser(auth.uid, uid, null, null);
        }*/
    }

    handleBlock = (e) => {
      /*  e.preventDefault();*/
        const { auth, uid } = this.props;
        this.props.blockUser(auth.uid, uid);
        this.props.history.push('/');
    }

    render() {
        const { auth } = this.props;
        if (!auth.uid) {
            return (<Redirect to="/signin"/>)
        } else {
            return <div>
                    <Navbar/>
                    <User 
                        profile={this.props.profile}
                        whoLiked={whoLiked}
                        iUnLiked={iUnLiked}
                        likes={this.props.likes}
                        liker_id={auth.uid}
                        liked_id={this.props.uid}
                        unLikes={this.props.unLikes}
                        unLiker_id={auth.uid}
                        unLiked_id={this.props.uid}
                        handleLike={this.handleLike}
                        handleUnLike={this.handleUnLike}
                        current_user={this.props.current_user}
                        handleBlock={this.handleBlock}
                    />
                    <Footer/>
                </div>
        }
    }
}

const mapDispatchToProps = (dispath) => {
    return {
        blockUser: (blocker_id, blocked_id) => dispath(blockUser(blocker_id, blocked_id)),
        unLikeUser: (unLiker_id, unLiked_id, delete_id, delete_match_id) => dispath(unLikeUser(unLiker_id, unLiked_id, delete_id, delete_match_id)),
        likeUser: (liker_id, liked_id, new_popularity, delete_unlike_id) => dispath(likeUser(liker_id, liked_id, new_popularity, delete_unlike_id)),
        matchUser: (liker_id, liked_id) => dispath(matchUser(liker_id, liked_id))
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const users = state.firestore.data.users;
    const matches = state.firestore.ordered.matches;
    const likes =  state.firestore.ordered.likes;
    const unLikes =  state.firestore.ordered.unLikes;
    const profile = users ? users[id] : null;
    return {
        profile: profile,
        auth: state.firebase.auth,
        current_user: state.firebase.profile,
        uid: id,
        likes: likes,
        matches: matches,
        unLikes: unLikes
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "users" },
        { collection: "likes" },
        { collection: "unLikes" },
        { collection: "matches" },
    ])
)(ViewUser);