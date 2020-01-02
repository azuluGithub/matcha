import React from 'react';
import { FaThumbsUp, FaThumbsDown, FaUserAltSlash, FaPhoneVolume, FaBroadcastTower } from "react-icons/fa";
import moment from 'moment';
import ViewUserMap from './ViewUserMap';
import { FaHeart, FaMapMarkerAlt, FaVenusMars, FaStar, FaHistory, FaInfo, FaTags } from "react-icons/fa";

class User extends React.Component {

    state = {
        show: false  
    };

    reportPopUp = () => {
        this.setState({
            show: true
        })
    }

    closeReportPopUp = () => {
        this.setState({
            show: false
        })
    }

    render() {
        const { profile, handleLike, handleBlock, handleUnLike, whoLiked, iUnLiked, likes, unLikes, unLiker_id, unLiked_id, liker_id, liked_id } = this.props;
        if (profile && likes && unLikes) {
            const status_value = profile.loggedIn ? "Online" :  moment(profile.time.toDate()).calendar();
            const didILike = likes.filter(whoLiked(liker_id, liked_id));
            const wasILiked = likes.filter(whoLiked(liked_id, liker_id));
            const didIunLike = unLikes.filter(iUnLiked(unLiker_id, unLiked_id));
            return (
                <div className="vuid_user" >
                    <span className="viud_name">{ profile.firstname[0].toUpperCase() + profile.firstname.slice(1)} { profile.lastname[0].toUpperCase() + profile.lastname.slice(1) } </span><br/>
                    <img src={profile.url} alt="img"/>
                    <div className="vuid_btns">
                        {
                            didILike.length > 0 || profile.url === "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm2hIJK-htqNGFQUUtshHh934Z_J3CDlSe9H7UHLWln9by7CoS" ? <button type="button" className="btn btn-xs btn-success user_detail_action likebtn" disabled><FaThumbsUp /> LIKE</button> :
                            <button type="button" onClick={handleLike} className="btn btn-xs btn-success likebtn"><FaThumbsUp /> LIKE</button>
                        }
                        {
                            didIunLike.length > 0 ?<button type="button" onClick={handleUnLike} className="btn btn-xs btn-primary" disabled><FaThumbsDown /> UNLIKE</button> :
                            <button type="button" onClick={handleUnLike} className="btn btn-xs btn-primary"><FaThumbsDown /> UNLIKE</button>
                        }
                        <button type="button" onClick={handleBlock} className="btn btn-xs btn-danger"><FaUserAltSlash /> BLOCK</button>
                        <button type="button" onClick={this.reportPopUp} className="btn btn-xs btn-warning "><FaPhoneVolume /> REPORT</button>
                        {
                            this.state.show === true ? <div id="myModal" className="modal">
                                <div className="modal-content">
                                    <span onClick={this.closeReportPopUp} className="close">&times;</span>
                                    <p>You reported { profile.firstname[0].toUpperCase() + profile.firstname.slice(1)} { profile.lastname[0].toUpperCase() + profile.lastname.slice(1) }'s account as a fake account. Further investigations will be done by Matcha Team</p>
                                </div>
                            </div>
                            : ""
                        }
                    </div>
                    <div className="vuid_info">
                        <span className="key"><FaVenusMars/> </span><span className="value">{ profile.gender }</span><br/>
                        <span className="key"><FaHistory/> </span><span className="value">{ profile.age } years</span><br/>
                        <span className="key"><FaHeart/> </span><span className="value">{ profile.sexPref }</span><br/>
                        <span className="key"><FaStar/> </span><span className="value">{ profile.popularity }</span><br/>
                        <span className="key"><FaMapMarkerAlt/> </span><span className="value">{ profile.city }</span><br/>
                        <span className="key"><FaBroadcastTower/> </span><span className="viud_status_value">{status_value}</span><br/>
                        <span className="key"><FaInfo/> </span><span className="viud_bio">{ profile.bio }</span><br/>
                        <FaTags/> {" "}
                        { profile.tags && profile.tags.map(tag => {
                            return <span className="vuid_tag" key={tag}> { tag }</span>
                            })
                        }
                        <hr/>
                        <span className="viewUser_details_Youliked">
                        {
                             didILike.length > 0 ? "You liked " + profile.firstname[0].toUpperCase() + profile.firstname.slice(1) : ""
                        }
                        </span><br/><hr/>
                        <span className="viewUser_details_liked">
                        {
                             wasILiked.length > 0 ? profile.firstname[0].toUpperCase() + profile.firstname.slice(1) + " liked you" : ""
                        }
                        </span><br/><hr/>
                        <span className="viewUser_details_YouMatched">
                        {
                             wasILiked.length > 0 && didILike.length > 0 ? "You Matched with " + profile.firstname[0].toUpperCase() + profile.firstname.slice(1) : ""
                        }
                        </span>
                        <br/>
                    </div>
                    <ViewUserMap
                        lati={profile.lati}
                        long={profile.long}
                    />
                </div>
            )
        } else {
            return (
                <div id="dot-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            );
        }
    }
}

export default User;
