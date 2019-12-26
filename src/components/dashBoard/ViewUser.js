import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { likeUser, matchUser } from '../../store/actions/profileActions';
import Navbar from '../fragements/Navbar';
import Footer from '../fragements/Footer';
import User from './User';

const whoLiked = (liker_id, liked_id) => (like) => {
    return like.liker_id === liker_id && like.liked_id === liked_id;
}

class ViewUser extends Component {
    handleLike = (e) => {
        e.preventDefault();
        const { auth, uid, likes, profile } = this.props;
        let new_popularity = ++profile.popularity;
        const wasILiked = likes.filter(whoLiked(uid, auth.uid));

        if (wasILiked.length > 0) {
            this.props.likeUser(auth.uid, uid, new_popularity);
            this.props.matchUser(auth.uid, uid);
        } else {
            this.props.likeUser(auth.uid, uid, new_popularity);
        }
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
                        likes={this.props.likes}
                        liker_id={auth.uid}
                        liked_id={this.props.uid}
                        handleLike={this.handleLike}
                        current_user={this.props.current_user}
                    />
                    <Footer/>
                </div>
        }
    }
}

const mapDispatchToProps = (dispath) => {
    return {
        likeUser: (liker_id, liked_id, new_popularity) => dispath(likeUser(liker_id, liked_id, new_popularity)),
        matchUser: (liker_id, liked_id) => dispath(matchUser(liker_id, liked_id))
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const users = state.firestore.data.users;
    const likes =  state.firestore.ordered.likes;
    const profile = users ? users[id] : null;
    return {
        profile: profile,
        auth: state.firebase.auth,
        current_user: state.firebase.profile,
        uid: id,
        likes: likes
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "users" },
        { collection: "likes" }
    ])
)(ViewUser);