import React, { Component } from 'react';
import { FaThumbsUp, FaThumbsDown, FaUserAltSlash, FaPhoneVolume } from "react-icons/fa";
import moment from 'moment';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import ViewUserMap from './ViewUserMap';
import { likeUser } from '../../store/actions/profileActions';

class ViewUser extends Component {

    handleLike = (e) => {
        e.preventDefault();
        const { profile } = this.props;
        const { current_user, auth, uid } = this.props;
        console.log("id: " + auth.uid + " name: " + current_user.firstname + " image: " + current_user.url + " LIKED id: " + uid + " name: " + profile.firstname + " image: " + profile.url);
        this.props.likeUser(auth.uid, current_user.firstname, current_user.url, uid, profile.firstname, profile.url);
        //document.querySelector(".likebtn").disabled = true;
    }

    render() {
        const { auth } = this.props;
        if (!auth.uid) {
            return (<Redirect to="/signin"/>)
        } else {
            const { profile, likes } = this.props;
            if (profile) {
                const status_value = profile.loggedIn ? "Online" :  moment(profile.time.toDate()).calendar();
                const liked_you = profile.age <= 25 ? profile.firstname[0].toUpperCase() + profile.firstname.slice(1) + " liked you" : "";
                const matched = profile.popularity > 300 ? "You matched with " + profile.firstname[0].toUpperCase() + profile.firstname.slice(1) : ""

                console.log(likes);

                /*const profile_liked = likes && likes.filter(like => {
                    return like.liker_id !== auth.uid
                })**/
                
                return (
                    <div className="viewedUser container-fluid">
                        <div className="row">
                            <div className="col-sm-12 col-md-2"></div>
                            <div className="col-sm-12 col-md-4">
                                <div className="viewedUser_map">
                                    <ViewUserMap
                                        lati={profile.lati}
                                        long={profile.long}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4 ">
                                <div className="viewUser_main_left">
                                <div className="viewUser_left">
                                    <img className="viewedUser_image" src={profile.url} alt="img"/>
                                </div>
                                <div className="viewUser_right">
                                    <br/>
                                    <span className="viewUser_name">{ profile.firstname[0].toUpperCase() + profile.firstname.slice(1)} { profile.lastname[0].toUpperCase() + profile.lastname.slice(1) } </span><br/><hr/>
                                    <span className="viewUser_details">gender: </span><span className="viewUser_detail_value">{ profile.gender }</span><br/>
                                    <span className="viewUser_details">age: </span><span className="viewUser_detail_value">{ profile.age } years</span><br/>
                                    <span className="viewUser_details">preference: </span><span className="viewUser_detail_value">{ profile.sexPref }</span><br/>
                                    <span className="viewUser_details">popularity: </span><span className="viewUser_detail_value">{ profile.popularity }</span><br/>
                                    <span className="viewUser_details">city: </span><span className="viewUser_detail_value">{ profile.city }</span><br/>
                                    <hr/>
                                    { profile.tags && profile.tags.map(tag => {
                                            return <span className="viewUser_tag" key={tag}> { tag }</span>
                                        })
                                    }
                                    <hr/>
                                    <span className="viewUser_details_bio">{ profile.bio }</span><br/>
                                    <hr/>
                                    <span className="viewUser_details"> active: </span><span className="viewUser_detail_status">{status_value}</span><br/>
                                    <span className="viewUser_details_liked"> { liked_you } </span><br/><hr/>
                                    <span className="viewUser_details_connected"> { matched } </span><br/><hr/>
                                </div>
                                    {
                                        profile.url === "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm2hIJK-htqNGFQUUtshHh934Z_J3CDlSe9H7UHLWln9by7CoS" ? <button type="button" className="btn btn-sm btn-success user_detail_action likebtn" disabled><FaThumbsUp /> LIKE</button> :
                                            <button type="button" onClick={this.handleLike} className="btn btn-sm btn-success user_detail_action likebtn"><FaThumbsUp /> LIKE</button>
                                    }
                                <button type="button" className="btn btn-sm btn-primary user_detail_action"><FaThumbsDown /> UNLIKE</button>
                                <button type="button" className="btn btn-sm btn-danger text-white user_detail_action"><FaUserAltSlash /> BLOCK</button>
                                <button type="button" className="btn btn-sm btn-warning user_detail_action"><FaPhoneVolume /> REPORT</button>
                            </div>
                            </div>
                            <div className="col-sm-12 col-md-2"></div>
                        </div>
                    </div>
                    )
                } else {
                    return ( <div className="no_profile"> PROFILE LOADING....... </div> );
            }
        }
    }
}



const mapDispatchToProps = (dispath) => {
    return {
        likeUser: (liker_id, liker_name, liker_url, liked_id, liked_name, liked_url) => dispath(likeUser(liker_id, liker_name, liker_url, liked_id, liked_name, liked_url))
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const users = state.firestore.data.users;
    const profile = users ? users[id] : null
    return {
        profile: profile,
        auth: state.firebase.auth,
        current_user: state.firebase.profile,
        uid: id,
        likes: state.firestore.data.likes
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "users" },
        { collection: "likes", orderBy: ["createdAt", "asc"] }
    ])
)(ViewUser);