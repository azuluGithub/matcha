import React from 'react';
import Tag from './Tag';

const containerStyle = {
    position: "relative",
    display: "inline-block",
    width: "100%",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "2px solid rgba(216, 200, 108, 0.3)",
    overflow: "auto"
}

const inputStyle = {
    display: "inline-block",
    fontSize: "14px",
    margin: "3px",
    border: "0"
}

const ProfileSettings = ({firstname, lastname, username, email, handleEmailSubmit, handlePasswordSubmit, update_profile_err,update_email_err, update_password_err, tags, invalid_input, onDeleteTag, handleSubmit, handleChange, gender, sexPref, age, onKeyUp, bio}) =>  {
    
    var tagz = tags && tags.map((tag) => {
        return <Tag onDeleteTag={onDeleteTag} key={Math.random() * 23456} tag={tag}/>
    });
    const display_email_err = update_email_err ? update_email_err : "";
    const display_password_err = update_password_err ? update_password_err : "";
    const display_profile_err = update_profile_err ? update_profile_err : "";
    return (
        <div>
        <div className="profile_setting_right">
            <form  onSubmit={handleSubmit} >
                <span className="profile_setting_title">Edit Profile</span><br/><br/>
                <span className="profile_setting_label">FIRSTNAME</span><br/>
                <div className="form-group">
                    <input 
                        onChange={handleChange}
                        type="text" 
                        className="form-control"  
                        name="firstname" 
                        placeholder="First Name"
                    />
                </div>
                <span className="profile_setting_label">LASTNAME</span><br/>
                <div className="form-group">
                    <input 
                        onChange={handleChange}
                        type="text" 
                        className="form-control" 
                        name="lastname" 
                        placeholder="Last Name"
                    />
                </div>
                <span className="profile_setting_label">USERNAME</span><br/>
                <div className="form-group">
                    <input 
                        onChange={handleChange} 
                        type="text" 
                        className="form-control"  
                        name="username" 
                        placeholder="User Name"
                    />
                </div>
                <span className="profile_setting_label">Gender</span><br/>
                <select
                    className="form-control form-control-sm mb-2"
                    onChange={handleChange}
                    name="gender"
                >
                    <option value="bisexual">Bisexual</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select>
                <span className="profile_setting_label">Preference</span><br/>
                <select
                    className="form-control form-control-sm mb-2"
                    onChange={handleChange}
                    name="sexPref"
                >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    {/*<option value="bisexual">Bisexual</option>*/}
                </select>
                <div >
                    <span className="profile_setting_label">Age</span><br/>
                    <input
                        type="number"
                        onChange={handleChange}
                        className="form-control"
                        name="age"
                        min="18"
                        max="70"
                        placeholder="select age ..."
                    />
                </div><br/>
                <span className="profile_setting_label">Enter any from the following TAGS</span><br/>
                <span className="choose_tags"> art, photography, coding, gym, music </span><br />
                <div className="invalid_input_style">{ invalid_input }</div>
                <div style={containerStyle}>
                    { tagz }
                    <input className="form-control" style={inputStyle} onKeyUp={ (e) => onKeyUp(e) } type="text" placeholder="type tag name and press SPACE..." />
                </div>
                <div>
                    <span className="profile_setting_label">Biography</span><br/>
                    <textarea
                        className="form-control"
                        type="text"
                        name="bio"
                        placeholder="write about yourself..."
                        onChange={handleChange}
                    />
                </div><br/>
                <button type="submit" className="btn btn-md btn-warning">Save</button>
                <div className="update_err_style">
                    { display_profile_err }
                </div>
            </form>
        </div>

        <div className="profile_email_setting">
            <form  onSubmit={handleEmailSubmit} >
                <div className="form-group">
                    <span className="profile_setting_label">Email</span><br/>
                    <input
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                    />
                </div>
                <button type="submit" className="btn btn-md btn-success">Submit</button>
                <div className="update_style">
                    { display_email_err }
                </div>
            </form>
        </div>

        <div className="profile_password_setting">
            <form  onSubmit={handlePasswordSubmit} >
                <div className="form-group">
                <span className="profile_setting_label">Password</span><br/>
                    <input 
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                    />
                </div>
                <button type="submit" className="btn btn-md btn-info">Submit</button>
                <div className="update_style">
                    { display_password_err }
                </div>
            </form>
        </div>
    </div>
    )
}
export default ProfileSettings;