import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { signOut } from '../../store/actions/authAction';
import { FaFacebookMessenger, FaPowerOff, FaRegBell, FaHouseDamage } from "react-icons/fa";

const likeFunc = (likes, users, auth_id) => {
    let count = 0;
    for (let i = 0; i < likes.length; i++) {
         if (likes[i].liked_id === auth_id) {
            for (let j = 0; j < users.length; j++) {
                if (users[j].id === likes[i].liker_id) {
                    if (likes[i].like_status === "unread") {
                        count = count + 1;
                    }
                }
            }
         }
    }
    return count;
}

const unLikeFunc = (unLikes, users, auth_id) => {
    let count = 0;
    for (let i = 0; i < unLikes.length; i++) {
         if (unLikes[i].unLiked_id === auth_id) {
            for (let j = 0; j < users.length; j++) {
                if (users[j].id === unLikes[i].unLiker_id) {
                    if (unLikes[i].unLike_status === "unread") {
                        count = count + 1;
                    }
                }
            }
         }
    }
    return count;
}

const viewFunc = (views, users, auth_id) => {
    let count = 0;
    for (let i = 0; i < views.length; i++) {
         if (views[i].viewed_id === auth_id) {
            for (let j = 0; j < users.length; j++) {
                if (users[j].id === views[i].viewer_id) {
                    if (views[i].view_status === "unread") {
                        count = count + 1;
                    }
                }
            }
         }
    }
    return count;
}

const matchesFunc = (matches, users, auth_id) => {
    let count = 0;
    for (let i = 0; i < matches.length; i++) {
         if (matches[i].liker_id === auth_id || matches[i].liked_id === auth_id) {
            for (let j = 0; j < users.length; j++) {
                if ((users[j].id === matches[i].liker_id || users[j].id === matches[i].liked_id) && users[j].id !== auth_id) {
                    if (matches[i].match_status === "unread") {
                        count = count + 1;
                    }
                }
            }
         }
    }
    return count;
}

const chatsFunc = (chats, users, auth_id) => {
    let count = 0;
    for (let i = 0; i < chats.length; i++) {
         if (chats[i].receiver_Id === auth_id) {
            for (let j = 0; j < users.length; j++) {
                if (users[j].id === chats[i].sender_Id) {
                    if (chats[i].chat_status === "unread") {
                        count = count + 1;
                    }
                }
            }
         }
    }
    return count;
}

class Navbar extends React.Component {

    state = {
        profile : this.props.profile,
        views: this.props.views,
        users: this.props.users,
        likes: this.props.likes,
        matches: this.props.matches,
        unLikes: this.props.unLikes,
        chats: this.props.chats
    }
    
    UNSAFE_componentWillReceiveProps(props) {
      this.setState({
        profile : props.profile,
        views: props.views,
        users: props.users,
        likes: props.likes,
        matches: props.matches,
        unLikes: props.unLikes,
        chats: props.chats
      })
    }

    render() {
        const { sign_Out, auth } = this.props;
        const { views, users, likes, unLikes, matches, profile, chats } = this.state;
        if (likes && unLikes && users && auth && matches && views && chats ) {
            const users_likes = likeFunc(likes, users, auth.uid);
            const users_views = viewFunc(views, users, auth.uid);
            const users_unLikes = unLikeFunc(unLikes, users, auth.uid);
            const users_matches = matchesFunc(matches, users, auth.uid);
            const chat_count = chatsFunc(chats, users, auth.uid);
            let total_count = users_likes + users_views + users_matches + users_unLikes;
            return (
                <nav className="nav-ba">
                    <ul>
                        <li><NavLink className="logo-matcha" to="/">Matcha</NavLink></li>
                        <li>
                            <NavLink to="/profile" className="nav-img">
                                <img src={profile.url} alt="img" className="rounded-circle"/>
                                <span className="nav-name">{ } { profile.username }</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/"><span className="nav-tags"><FaHouseDamage/></span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/chat"><span className="nav-tags"><FaFacebookMessenger/></span>
                            { 
                                chat_count > 0 ? <sup className="notify">{ chat_count }</sup> : ""
                            }
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/news"><span className="nav-tags"><FaRegBell/></span>
                                { 
                                    total_count > 0 ? <sup className="notify">{ total_count }</sup> : ""
                                }
                            </NavLink>
                        </li>
                        <li>
                            <Link style={{color:"red"}} onClick={sign_Out} to="/signin"><span className="nav-tags">< FaPowerOff/></span></Link>
                        </li>
                    </ul>
                </nav>
            )
        } else {
            return (
                <div></div>
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sign_Out: () => dispatch(signOut()),
    }
}

const mapStateToProps = (state) => {
    const auth = state.firebase.auth;
    const views = state.firestore.ordered.views;
    const unLikes = state.firestore.ordered.unLikes;
    const chats = state.firestore.ordered.chats;
    const users = state.firestore.ordered.users;
    const likes = state.firestore.ordered.likes;
    const matches = state.firestore.ordered.matches;
    const profile = state.firebase.profile
    return {
        auth: auth,
        users: users,
        unLikes: unLikes,
        views: views,
        chats: chats,
        matches: matches,
        likes: likes,
        profile: profile
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "users" },
        { collection: "blocks"},
        { collection: "chats", orderBy: ["createdAt", "asc"] },
        { collection: "views", orderBy: ["createdAt", "desc"] },
        { collection: "unLikes", orderBy: ["createdAt", "desc"] },
        { collection: "matches", orderBy: ["createdAt", "desc"] },
        { collection: "likes", orderBy: ["createdAt", "desc"] }
    ])
) (Navbar);