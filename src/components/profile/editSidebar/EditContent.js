import React, { Component } from 'react';
import Navbar from '../../fragements/Navbar';
import ProfileMap from '../ProfileMap';
import NewsMatches from '../profileNews/NewsMatches';
import NewsVisits from '../profileNews/NewsVisits';
import NewsLikes from '../profileNews/NewsLikes';

class EditContent extends Component {
  render() {
    let { my_likes, my_views, tags, lati, long, handleImageUpload, url, bio, gender, sexPref, age, firstname, lastname, username, email} = this.props;
    return <div className="main-edit-nav">
            <Navbar/>
            <div className="edit-main-div-profile">
                {/**Profile */}
                <div className="profile-div-center">
                    <span className="name-centered viud_name">{ "Your Profile" } </span><hr/><br/>
                    <img src={ `${url}` } alt="img"/>
                    <div className="form-group image-upload">
                        <input
                            onChange={handleImageUpload}
                            type="file"
                            className="form-control-file mb2"
                        />
                    </div>
                    <div className="vuid_info">
                        <span className="key">firstname: </span><span className="value">{ firstname }</span><br/>
                        <span className="key">lastname: </span><span className="value">{ lastname }</span><br/>
                        <span className="key">username: </span><span className="value">{ username }</span><br/>
                        <span className="key">email: </span><span className="value">{ email }</span><br/>
                        <span className="key">gender: </span><span className="value">{ gender }</span><br/>
                        <span className="key">age: </span><span className="value">{ age } years</span><br/>
                        <span className="key">preference: </span><span className="value">{ sexPref }</span><br/>
                        <hr/>
                        { tags && tags.map(tag => {
                            return <span className="vuid_tag" key={tag}> { tag }</span>
                            })
                        }
                        <hr/>
                        <span className="viud_bio">{ bio }</span><br/>
                        <hr/>
                        <br/>
                    </div>
                    <ProfileMap
                        lati={lati}
                        long={long}
                    />
                </div>
                {/** History */}
                <div className="nuus-profile-page">
                    <span className="name-centered viud_name"> {"Your History"} </span><hr/><br/>
                    <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link active" id="nav-visit-tab" data-toggle="tab" href="#nav-visit" role="tab" aria-controls="nav-visit" aria-selected="true">Visits</a>
                                <a className="nav-item nav-link" id="nav-like-tab" data-toggle="tab" href="#nav-like" role="tab" aria-controls="nav-like" aria-selected="false">Likes</a>
                                <a className="nav-item nav-link" id="nav-match-tab" data-toggle="tab" href="#nav-match" role="tab" aria-controls="nav-match" aria-selected="false">Matches</a>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-visit" role="tabpanel" aria-labelledby="nav-visit-tab">
                                <NewsVisits my_views={my_views} />
                            </div>
                            <div className="tab-pane fade" id="nav-like" role="tabpanel" aria-labelledby="nav-like-tab ">
                                <NewsLikes my_likes={my_likes}/>
                            </div>
                            <div className="tab-pane fade" id="nav-match" role="tabpanel" aria-labelledby="nav-match-tab">
                                <NewsMatches />
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    }
}

export default EditContent;