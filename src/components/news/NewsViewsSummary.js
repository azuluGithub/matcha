import React, { Component } from 'react';
import { viewUser, updateViewUser } from '../../store/actions/profileActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';

const didIView = (viewer_id, viewed_id) => (view) => {
    return view.viewer_id === viewer_id && view.viewed_id === viewed_id;
}

class NewsViewsSummary extends Component {
    
    handleClick = (e) => {
        const { user, auth, views } = this.props;
        const my_view = views.filter(didIView(auth.uid, user.id));
        const views_id= views.filter(didIView(user.id, auth.uid));
        if (my_view.length > 0) {
            this.props.updateViewUser(views_id[0].id, "read");
        } else {
            this.props.viewUser(auth.uid,  user.id, "unread");
            this.props.updateViewUser(views_id[0].id, "read");
        }
    }

    render() {
        const { auth, user, blocks, iBlocked, views } = this.props;
        const wasIBlocked = blocks.filter(iBlocked(user.id, auth.uid));
        const didIBlock = blocks.filter(iBlocked(auth.uid, user.id));
        const view_user_id = views.filter(didIView(user.id, auth.uid));
        const view_user_id_found = view_user_id[0] === undefined ? "" : view_user_id[0].view_status;  
        if (didIBlock.length > 0 || wasIBlocked.length > 0) {
            return <div></div>
        } else {
            if (view_user_id_found === "read") {
                return (
                    <React.Fragment>
                        <Link  onClick={this.handleClick} style={{ textDecoration: 'none' }} to={'/viewuser/'+ user.id}>
                            <div className="nuus-container">
                                <div className="nuus-img">
                                    <img src={user.url} alt="img"/>
                                </div>
                                <div className="nuus-content">
                                    <span className="nuus-name">{ user.firstname[0].toUpperCase() + user.firstname.slice(1)} { user.lastname[0].toUpperCase() + user.lastname.slice(1) } </span>
                                    <span className="nuus-msg"> visited your profile</span>
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
                                    <span className="nuus-msg"> visited your profile</span>
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
        viewUser: (viewer_id, viewed_id, view_status) => dispath(viewUser(viewer_id, viewed_id, view_status)),
        updateViewUser: (views_id, view_status) => dispath(updateViewUser(views_id, view_status))
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      profile: state.firebase.profile,
      views: state.firestore.ordered.views
    }
  }
  
  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "views" }
    ])
  )(NewsViewsSummary);