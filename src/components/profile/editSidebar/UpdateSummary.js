import React, { Component } from 'react';
import Tag from '../Tag';

const containerStyle = {
    position: "relative",
    display: "inline-block",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    width: "100%",
    borderBottom: "1px solid #ccc"
  }
  
  const inputStyle = {
      display: "inline-block",
      fontSize: "14px",
      margin: "3px",
      border: "0"
  }

  class UpdateSumary extends Component {
    
    render() {

    const { handleEmailSubmit, handlePasswordSubmit, update_profile_err,update_email_err, update_password_err, tags, invalid_input, onDeleteTag, handleSubmit, handleChange, onKeyUp } = this.props;
    var tagz = tags && tags.map((tag) => {
        return <Tag onDeleteTag={onDeleteTag} key={Math.random() * 23456} tag={tag}/>
    });
    const display_email_err = update_email_err ? update_email_err : "";
    const display_password_err = update_password_err ? update_password_err : "";
    const display_profile_err = update_profile_err ? update_profile_err : "";
    
      return <div className="edit-the-main">
                <form className="profile-form"  onSubmit={handleSubmit} >
                  <h5 className="profile-heading">Edit Profile</h5>
                  <span className="title-edit">Firstname</span><br/>
                  <div className="form-group">
                      <input
                          onChange={handleChange}
                          type="text" 
                          className="form-control form-control-sm mb-2"
                          name="firstname" 
                          placeholder="First Name.."
                      />
                  </div>
                  <span className="title-edit">Lastname </span><br/>
                  <div className="form-group">
                      <input 
                          onChange={handleChange}
                          type="text" 
                          className="form-control form-control-sm mb-2"
                          name="lastname" 
                          placeholder="Last Name"
                      />
                  </div>
                  <span className="title-edit">Username</span><br/>
                  <div className="form-group">
                      <input 
                          onChange={handleChange} 
                          type="text" 
                          className="form-control form-control-sm mb-2" 
                          name="username" 
                          placeholder="User Name"
                      />
                  </div>
                  <span className="title-edit">Gender</span><br/>
                  <select
                    className="form-control form-control-sm mb-2"
                    onChange={handleChange}
                    name="gender"
                  >
                    <option value="">Choose...</option>
                    <option value="bisexual">Bisexual</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                  <span className="title-edit">Preference</span><br/>
                  <select
                    className="form-control form-control-sm mb-2"
                    onChange={handleChange}
                    name="sexPref"
                  >
                    <option value="">Choose...</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    {/*<option value="bisexual">Bisexual</option>*/}
                  </select>
                  <div >
                      <span className="title-edit">Age</span><br/>
                      <input 
                          onChange={handleChange}
                          type="text" 
                          className="form-control form-control-sm mb-2"
                          name="age" 
                          placeholder="Enter your age"
                      />
                  </div>
                  <br/>
                  <span className="title-edit">Enter any from the following TAGS</span><br/>
                  <span className="edit_tags"> art, photography, coding, gym, music </span><br />
                  <div className="wrong_input">{ invalid_input }</div>
                  <div style={containerStyle}>
                      { tagz }
                    <input className="form-control" style={inputStyle} onKeyUp={ (e) => onKeyUp(e) } type="text" placeholder="Type tag name and press SPACE..." />
                    <br/>
                  </div>
                  <div>
                      <br/>
                      <span className="title-edit">Biography</span><br/>
                      <textarea
                          className="form-control"
                          type="text"
                          name="bio"
                          placeholder="Write about yourself..."
                          onChange={handleChange}
                      />
                  </div><br/>
                <button type="submit" className="btn btn-sm btn-warning">Save</button>
                <div className="update_err_style">
                    { display_profile_err }
                </div>
            </form>

          <form  onSubmit={handleEmailSubmit} >
            <div className="form-group">
                <span className="title-filter">Email</span><br/>
                <input
                    onChange={handleChange}
                    type="text"
                    className="form-control inputField"
                    name="email"
                    placeholder="Email"
                />
            </div>
            <button type="submit" className="btn btn-sm btn-warning">Update</button>
            <div className="update_style">
              { display_email_err }
            </div>
          </form>

          <form  onSubmit={handlePasswordSubmit} >
            <div className="form-group">
              <span className="title-filter">Password</span><br/>
              <input 
                onChange={handleChange}
                type="password"
                className="form-control inputField"
                name="password"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-sm btn-warning">Update</button>
            <div className="update_style">
              { display_password_err }
            </div>
          </form>
      </div>
  }
}

export default UpdateSumary;