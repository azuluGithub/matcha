import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { viewUser } from '../../store/actions/profileActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const didIView = (viewer_id, viewed_id) => (view) => {
    return view.viewer_id === viewer_id && view.viewed_id === viewed_id;
}

class NewslikesSummary extends Component {
    
    handleClick = (e) => {
        const { user, auth, views } = this.props;
        const my_view = views.filter(didIView(auth.uid, user.id));
    
        if (my_view.length > 0) {
        } else {
          this.props.viewUser(auth.uid,  user.id);
        }
    }

    render() {
        const { auth, user, blocks, iBlocked } = this.props;
        const wasIBlocked = blocks.filter(iBlocked(user.id, auth.uid));
        const didIBlock = blocks.filter(iBlocked(auth.uid, user.id));
        if (didIBlock.length > 0 || wasIBlocked.length) {
            return <div></div>
        } else {
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
        }
    }
}

const mapDispatchToProps = (dispath) => {
    return {
        viewUser: (viewer_id, viewed_id) => dispath(viewUser(viewer_id, viewed_id))
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
  )(NewslikesSummary);