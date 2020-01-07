import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { updateMatchUser } from '../../store/actions/profileActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const match_notify = (liker_id, liked_id) => (match) => {
    return match.liker_id === liker_id && match.liked_id === liked_id;
}

class NewsMatchesSummary extends Component {

    handleClick = (e) => {
        const { user, auth, matches } = this.props;
        const match_auth_id = matches.filter(match_notify(auth.uid, user.id));
        const match_user_id = matches.filter(match_notify(user.id, auth.uid));
        //they is only one match table so if one user updates it disappears for everyone
        if (match_auth_id.length > 0) {
            this.props.updateMatchUser(match_auth_id[0].id, "read");
        } else {
            this.props.updateMatchUser(match_user_id[0].id, "read");
        }
    }

    render() {
        const { auth, user, blocks, iBlocked, matches } = this.props;
        const wasIBlocked = blocks.filter(iBlocked(user.id, auth.uid));
        const didIBlock = blocks.filter(iBlocked(auth.uid, user.id));
        const match_auth_id = matches.filter(match_notify(auth.uid, user.id));
        const match_user_id = matches.filter(match_notify(user.id, auth.uid));
        const match_auth_id_found = match_auth_id[0] === undefined ? "" : match_auth_id[0].match_status;
        const match_user_id_found = match_user_id[0] === undefined ? "" : match_user_id[0].match_status;
    
        if (didIBlock.length > 0 || wasIBlocked.length) {
            return <div></div>
        } else {
            if (match_user_id_found === "read" || match_auth_id_found === "read") {
                return (
                    <React.Fragment>
                        <Link onClick={this.handleClick} style={{ textDecoration: 'none' }} to={'/viewuser/'+ user.id}>
                            <div className="nuus-container">
                                <div className="nuus-img">
                                    <img src={user.url} alt="img"/>
                                </div>
                                <div className="nuus-content">
                                    <span className="nuus-msg">You matched with </span>
                                    <span className="nuus-name">{ user.firstname[0].toUpperCase() + user.firstname.slice(1)} { user.lastname[0].toUpperCase() + user.lastname.slice(1) } </span>
                                    <br/>
                                </div>
                            </div>
                        </Link>
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        <Link onClick={this.handleClick} style={{ textDecoration: 'none' }} to={'/viewuser/'+ user.id}>
                            <div className="nuus-container-unread">
                                <div className="nuus-img">
                                    <img src={user.url} alt="img"/>
                                </div>
                                <div className="nuus-content">
                                    <span className="nuus-msg">You matched with </span>
                                    <span className="nuus-name">{ user.firstname[0].toUpperCase() + user.firstname.slice(1)} { user.lastname[0].toUpperCase() + user.lastname.slice(1) } </span>
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
        updateMatchUser: (match_id, match_status) => dispath(updateMatchUser(match_id, match_status))
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      matches: state.firestore.ordered.matches
    }
  }
  
  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "matches" }
    ])
  )(NewsMatchesSummary);