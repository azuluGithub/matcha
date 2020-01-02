import React, { Component } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Tag from '../profile/Tag';

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

class FormPersonalDetails extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const { onDeleteTag, onKeyUp, handleChange, tags, invalid_input, bio, age, gender, sexPref } = this.props;
        var tagz = tags && tags.map((tag) => {
            return <Tag onDeleteTag={onDeleteTag} key={Math.random() * 23456} tag={tag}/>
        });
        return <div className="signup-cover">
                <Nav/>
                    <div className="forms-cover">
                        <div className="forms-container">
                            <form >
                                <h3 className="join-free"><strong>Personal Details</strong></h3>
                                <span className="title-edit">Gender</span><br/>
                                <select
                                    className="form-control form-control-sm mb-2"
                                    onChange={handleChange}
                                    name="gender"
                                    value={gender}
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
                                    value={sexPref}
                                >
                                    <option value="">Choose...</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                </select>
                                <div >
                                    <span className="title-edit">Age</span><br/>
                                    <input 
                                        onChange={handleChange}
                                        type="text" 
                                        className="form-control form-control-sm mb-2"
                                        name="age"
                                        value={age}
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
                                        value={bio}
                                        placeholder="Write about yourself..."
                                        onChange={handleChange}
                                    />
                                </div>
                                <br/>
                                <button type="submit" onClick={this.back} className="btn btn-sm btn-primary btnStyle">Back</button>
                                <button type="submit" onClick={this.continue} className="btn btn-sm btn-success btnStyle">Continue</button>
                            </form>
                        </div>
                    </div>
                <Footer/>
            </div>
    }
}

export default FormPersonalDetails
