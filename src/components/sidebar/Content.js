import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { viewUser } from '../../store/actions/profileActions';

const didIView = (viewer_id, viewed_id) => (view) => {
  return view.viewer_id === viewer_id && view.viewed_id === viewed_id;
}

class Content extends Component {
  
  handleClick = (e) => {
    const { user, auth, views } = this.props;
    const my_view = views.filter(didIView(auth.uid, user.id));

    if (my_view.length > 0) {
      console.log("you already viewed this profile")
    } else {
      this.props.viewUser(auth.uid,  user.id);
    }
  }

  render() {
    const { user } = this.props;
          return <div className="float-left" key={user.id}>
          <div className="img_box">
            <Link  onClick={this.handleClick} to={'/viewuser/'+user.id}>
                <div className="container2">
                  <div className="img_banner">
                      <img src={user.url} alt="img"/>
                  </div>
              </div>
              <div className="centered">
                  <div className="box_1">
                      <span className="info_name">{user.firstname[0].toUpperCase() + user.firstname.slice(1)} {user.lastname[0].toUpperCase() + user.lastname.slice(1)}, </span><span className="info_info"> {user.age}</span>
                      <p className="info_info">{user.gender}</p>
                  </div>
              </div>
            </Link>
        </div>
    </div>
    }
}

const mapDispatchToProps = (dispath) => {
  return {
      viewUser: (viewer_id, viewed_id) => dispath(viewUser(viewer_id, viewed_id))
  }
}

const mapStateToProps = (state) => {
  return {
      auth: state.firebase.auth,
      profile: state.firebase.profile,
      views: state.firestore.ordered.views
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
      { collection: "views" }
  ])
)(Content);