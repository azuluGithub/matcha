import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { updateUnLikeUser } from '../../store/actions/profileActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const unLike_notify = (unLiker_id, unLiked_id) => (unLike) => {
    return unLike.unLiker_id === unLiker_id && unLike.unLiked_id === unLiked_id;
}

class NewsUnLikesSummary extends Component {
    
    handleClick = (e) => {
        const { user, auth, unLikes } = this.props;
        const unLikes_id = unLikes.filter(unLike_notify(user.id, auth.uid));
        this.props.updateUnLikeUser(unLikes_id[0].id, "read");
    }

    render() {
        const { auth, user, blocks, iBlocked, unLikes } = this.props;
        const wasIBlocked = blocks.filter(iBlocked(user.id, auth.uid));
        const didIBlock = blocks.filter(iBlocked(auth.uid, user.id));
        const unLike_user_id = unLikes.filter(unLike_notify(user.id, auth.uid));
        const unLike_user_id_found = unLike_user_id[0] === undefined ? "" : unLike_user_id[0].unLike_status;
        
        if (didIBlock.length > 0 || wasIBlocked.length) {
            return <div></div>
        } else {
            if (unLike_user_id_found === "read") {
                return (
                    <React.Fragment>
                        <Link  onClick={this.handleClick} style={{ textDecoration: 'none' }} to={'/viewuser/'+ user.id}>
                            <div className="nuus-container">
                                <div className="nuus-img">
                                    <img src={user.url} alt="img"/>
                                </div>
                                <div className="nuus-content">
                                    <span className="nuus-name">{ user.firstname[0].toUpperCase() + user.firstname.slice(1)} { user.lastname[0].toUpperCase() + user.lastname.slice(1) } </span>
                                    <span className="nuus-msg"> unliked your profile</span>
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
                                    <span className="nuus-msg"> unliked your profile</span>
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
        updateUnLikeUser: (unLikes_id, unLike_status) => dispath(updateUnLikeUser(unLikes_id, unLike_status))
    }
  }
  
const mapStateToProps = (state) => {
    return {
      unLikes: state.firestore.ordered.unLikes
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "unLikes" }
    ])
)(NewsUnLikesSummary);