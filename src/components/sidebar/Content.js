import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { viewUser } from '../../store/actions/profileActions';

class Content extends Component {
  
  handleClick = (e) => {
    const { user } = this.props;
    const { profile, auth } = this.props;
    this.props.viewUser(auth.uid, profile.firstname, profile.url, user.id, user.firstname, user.url);
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
      viewUser: (viewer_id, viewer_name, viewer_url, viewed_id, viewed_name, viewed_url) => dispath(viewUser(viewer_id, viewer_name, viewer_url, viewed_id, viewed_name, viewed_url))
  }
}

const mapStateToProps = (state) => {
  return {
      auth: state.firebase.auth,
      profile: state.firebase.profile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);