import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { viewUser, updateLikeUser } from '../../store/actions/profileActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const didIView = (viewer_id, viewed_id) => (view) => {
    return view.viewer_id === viewer_id && view.viewed_id === viewed_id;
}

const like_notify = (liker_id, liked_id) => (like) => {
    return like.liker_id === liker_id && like.liked_id === liked_id;
}

class NewslikesSummary extends Component {
    
    handleClick = (e) => {
        const { user, auth, views, likes } = this.props;
        const my_view = views.filter(didIView(auth.uid, user.id));
        const likes_id = likes.filter(like_notify(user.id, auth.uid));
        if (my_view.length > 0) {
            this.props.updateLikeUser(likes_id[0].id, "read");
        } else {
            this.props.viewUser(auth.uid,  user.id);
            this.props.updateLikeUser(likes_id[0].id, "read");
        }
    }

    render() {
        const { auth, user, blocks, iBlocked, likes } = this.props;
        const wasIBlocked = blocks.filter(iBlocked(user.id, auth.uid));
        const didIBlock = blocks.filter(iBlocked(auth.uid, user.id));
        const like_user_id = likes.filter(like_notify(user.id, auth.uid));
        const like_user_id_found = like_user_id[0] === undefined ? "" : like_user_id[0].like_status;
        
        if (didIBlock.length > 0 || wasIBlocked.length) {
            return <div></div>
        } else {
            if (like_user_id_found === "read") {
                return (
                    <React.Fragment>
                        <Link  onClick={this.handleClick} style={{ textDecoration: 'none' }} to={'/viewuser/'+ user.id}>
                            <div className="nuus-container">
                                <div className="nuus-img">
                                    <img src={user.url} alt="img"/>
                                </div>
                                <div className="nuus-content">
                                    <span className="nuus-name">{ user.firstname[0].toUpperCase() + user.firstname.slice(1)} { user.lastname[0].toUpperCase() + user.lastname.slice(1) } </span>
                                    <span className="nuus-msg"> liked your profile</span>
                                    <br/>
                                </div>
                            </div>
                        </Link>
                    </React.Fragment>   
                )
            } else {
                return (
                    <React.Fragment>
                        <Link  onClick={this.handleClick} style={{ textDecoration: 'none' }} to={'/viewuser/'+ user.id}>
                            <div className="nuus-container-unread">
                                <div className="nuus-img">
                                    <img src={user.url} alt="img"/>
                                </div>
                                <div className="nuus-content">
                                    <span className="nuus-name">{ user.firstname[0].toUpperCase() + user.firstname.slice(1)} { user.lastname[0].toUpperCase() + user.lastname.slice(1) } </span>
                                    <span className="nuus-msg"> liked your profile</span>
                                    <br/>
                                </div>
                            </div>
                        </Link>
                    </React.Fragment>   
                )
            }
        }
    }
}

const mapDispatchToProps = (dispath) => {
    return {
        viewUser: (viewer_id, viewed_id) => dispath(viewUser(viewer_id, viewed_id)),
        updateLikeUser: (likes_id, like_status) => dispath(updateLikeUser(likes_id, like_status))
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      profile: state.firebase.profile,
      views: state.firestore.ordered.views,
      likes: state.firestore.ordered.likes
    }
  }
  
  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "views" },
        { collection: "likes" }
    ])
  )(NewslikesSummary);