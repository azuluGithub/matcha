import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { viewUser } from '../../store/actions/profileActions';

class User extends Component {

    handleClick = (e) => {
        const { user } = this.props;
        const { profile, auth } = this.props;
        this.props.viewUser(auth.uid, profile.firstname, profile.url, user.id, user.firstname, user.url);
    }

    render() {
        const { user } = this.props;
        const liked = user.popularity > 300 ? user.firstname + " liked you" : "";
        return (
            <div className="float-left" key={user.id}>
                <div className="img_box">
                    <div className="container2">
                    <div className="img_banner">
                        <img src={user.url} alt="img"/>
                    </div>
                    <Link  onClick={this.handleClick} to={'/viewuser/'+user.id}>
                        <p className="img_heading"><button type="button" className="btn btn-sm btn-warning">view</button></p>
                    </Link>
                    <div className="">
                        <div className="text"></div>
                    </div>
                </div>
                <div className="img_box_info">
                    <div className="box_1">
                        <span className="info_name">{user.firstname[0].toUpperCase() + user.firstname.slice(1)} {user.lastname[0].toUpperCase() + user.lastname.slice(1)}</span><br/>
                        <hr></hr>
                        <span className="info_info">gender: {user.gender}</span><br/>
                        <span className="info_info">age: {user.age} years</span><br/>
                        <span className="info_info">popularity: {user.popularity}</span><br/>
                        <span className="info_info">
                            {
                                user.city !== "" ? user.city[0].toUpperCase() + user.city.slice(1) : ""
                            }
                        </span><br/>
                    </div>
                    <div className="box_tags" >
                        {
                            user.tags && user.tags.map(tag => {
                                return ( <span className="tag_info" key={tag}> {tag} </span> );
                            })
                        }
                    </div>
                    <hr></hr>
                    <div className="box_liked">
                        <span className="you_liked"> {liked} </span>
                    </div>
                </div>
            </div>
        </div>
        )  
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

export default connect(mapStateToProps, mapDispatchToProps)(User);