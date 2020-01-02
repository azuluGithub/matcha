import React, { Component } from 'react';
import ProfileMap from '../ProfileMap';
import NewsMatches from '../profileNews/NewsMatches';
import NewsVisits from '../profileNews/NewsVisits';
import NewsLikes from '../profileNews/NewsLikes';
import ScrollBar from '../../../ScrollBar';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaUser, FaTags, FaHeart, FaVenusMars, FaHistory, FaInfo } from "react-icons/fa";

const iBlocked = (blocker_id, blocked_id) => (block) => {
    return block.blocker_id === blocker_id && block.blocked_id === blocked_id;
}

const likeFunc = (likes, users, auth_id) => {
    const listOfLikers = [];
    for (let i = 0; i < likes.length; i++) {
         if (likes[i].liker_id === auth_id) {
            for (let j = 0; j < users.length; j++) {
                 if (users[j].id === likes[i].liked_id) {
                    listOfLikers.push(users[j]);
                 }
            }
         }
    }
    return listOfLikers;
  }
  
  const viewFunc = (views, users, auth_id) => {
    const listOfViews = [];
    for (let i = 0; i < views.length; i++) {
         if (views[i].viewer_id === auth_id) {
            for (let j = 0; j < users.length; j++) {
                 if (users[j].id === views[i].viewed_id) {
                    listOfViews.push(users[j]);
                 }
            }
         }
    }
    return listOfViews;
  }

  const matchesFunc = (matches, users, auth_id) => {
    const listOfMatches = [];
    for (let i = 0; i < matches.length; i++) {
         if (matches[i].liker_id === auth_id || matches[i].liked_id === auth_id) {
            for (let j = 0; j < users.length; j++) {
                 if ((users[j].id === matches[i].liker_id || users[j].id === matches[i].liked_id) && users[j].id !== auth_id) {
                    listOfMatches.push(users[j]);
                 }
            }
         }
    }
    return listOfMatches;
  }

class EditContent extends Component {
  render() {
    let { blocks, auth, likes, matches, views, users, tags, lati, long, handleImageUpload, url, bio, gender, sexPref, age, firstname, lastname, username, email } = this.props;
    const users_likes = likeFunc(likes, users, auth.uid);
    const users_views = viewFunc(views, users, auth.uid);
    const users_matches = matchesFunc(matches, users, auth.uid);
    return <div>
            <div className="profile-cover">
                <div className="logged-name">{ firstname[0].toUpperCase() + firstname.slice(1)} { lastname[0].toUpperCase() + lastname.slice(1) }</div>
                <img src={ `${url}` } alt="img"/>
            </div>
            <div className="under-cover">
                <Link style={{ textDecoration: 'none' }} to={'/update/'+ auth.uid}>
                    <div className="update-profile">
                        Edit profile
                    </div>
                </Link>
            </div>
            <div className="logged-visits">
                <div className="logged-details">
                    <div className="logged_info">
                        <div className="form-group image-upload">
                            <input
                                onChange={handleImageUpload}
                                type="file"
                                className="form-control-file mb2"
                            />
                        </div>
                        <span className="key"><FaUser/> </span><span className="value">{ username }</span><br/>
                        <span className="key"><FaVenusMars/> </span><span className="value">{ gender }</span><br/>
                        <span className="key"><FaHistory/> </span><span className="value">{ age } years</span><br/>
                        <span className="key"><FaHeart/> </span><span className="value">{ sexPref }</span><br/>
                        <span className="key"><FaEnvelope/> </span><span className="value">{ email }</span><br/>
                        <span className="viud_bio"><FaInfo/> { bio }</span><br/>
                        <FaTags/> {" "}
                        { tags && tags.map(tag => {
                            return <span className="vuid_tag" key={tag}> { tag }</span>
                            })
                        }
                    </div>
                </div>
                <div className="visit-history">
                    <span className="logged_name"> {"Your History"} </span><hr/><br/>
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <a className="nav-item nav-link active" id="nav-visit-tab" data-toggle="tab" href="#nav-visit" role="tab" aria-controls="nav-visit" aria-selected="true">Visits</a>
                            <a className="nav-item nav-link" id="nav-like-tab" data-toggle="tab" href="#nav-like" role="tab" aria-controls="nav-like" aria-selected="false">Likes</a>
                            <a className="nav-item nav-link" id="nav-match-tab" data-toggle="tab" href="#nav-match" role="tab" aria-controls="nav-match" aria-selected="false">Matches</a>
                        </div>
                    </nav>
                    <ScrollBar>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-visit" role="tabpanel" aria-labelledby="nav-visit-tab">
                                <NewsVisits blocks={blocks} iBlocked={iBlocked} users_views={users_views} auth={auth}/>
                            </div>
                            <div className="tab-pane fade" id="nav-like" role="tabpanel" aria-labelledby="nav-like-tab ">
                                <NewsLikes blocks={blocks} iBlocked={iBlocked} users_likes={users_likes} auth={auth}/>
                            </div>
                            <div className="tab-pane fade" id="nav-match" role="tabpanel" aria-labelledby="nav-match-tab">
                                <NewsMatches blocks={blocks} iBlocked={iBlocked} users_matches={users_matches} auth={auth} />
                            </div>
                        </div>
                    </ScrollBar>
                </div>
            </div>
            <ProfileMap
                lati={lati}
                long={long}
            />
        </div>
    }
}

export default EditContent;