import React, { Component } from 'react';
import ProfileMap from './ProfileMap';

const tagStyle = {
    backgroundColor: "rgba(226, 210, 115, 0.3)",
    fontWeight: "100",
    color: "rgba(94, 23, 116, 0.7)",
    padding:"3px",
    borderRadius: "3px",
    margin: "3px",
    fontSize: "14px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
}
class ProfileDisplay extends Component {

    render() {
        let {long, lati, handleImageUpload, url, bio, gender, sexPref, age, firstname, lastname, username, email} = this.props;
        var tags = this.props.tags && this.props.tags.map((tag) => {
            return (<span key={Math.random() * 23456} style={tagStyle}> {tag} </span>)
        });
        return (
            <div className="show_main_left">
                <div className="show_image_info">
                    <div className="show_image">
                        <img src={ `${url}` } alt="thumbnail" />
                        <div className="form-group">
                            <input
                                onChange={handleImageUpload}
                                type="file"
                                className="form-control-file mb2"
                            />
                        </div>
                    </div>
                    <div className="show_info">
                        <span className="show_info_label">firstname:</span> <span className="show_info_value"> { firstname }</span><br/>
                        <span className="show_info_label">lastname:</span> <span className="show_info_value"> { lastname }</span><br/>
                        <span className="show_info_label">username:</span> <span className="show_info_value"> { username }</span><br/>
                        <span className="show_info_label">email:</span> <span className="show_info_value"> { email }</span><br/>
                        <span className="show_info_label">gender:</span> <span className="show_info_value"> { gender }</span><br/>
                        <span className="show_info_label">preference:</span> <span className="show_info_value"> { sexPref }</span><br/>
                        <span className="show_info_label">age:</span> <span className="show_info_value"> { age } years</span><br/><hr />
                        <span className="show_info_label">interest:</span><br/> <span className="show_info_value"> { tags }</span><br/><hr />
                        <span className="show_info_label">biography:</span><br/> <span  className="show_info_value"> { bio }</span><br/><hr />
                    </div>
                </div>
                <div className="show_map" style={{ padding: '5px' }}>
                    <ProfileMap
                        lati={lati}
                        long={long}
                    />
                </div>
            </div>
        )
    }
}
export default ProfileDisplay;