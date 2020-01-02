import React, { Component } from 'react';
import Nav from './Nav';
import Footer from './Footer';

class FormUserDetails extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const { handleChange, firstname, lastname, username, email, display_signup_error } = this.props;
        return <div className="signup-cover">
                <Nav/>
                    <div className="forms-cover">
                        <div className="forms-container">
                            <form >
                                <h3 className="join-free"><strong>User Details</strong></h3>
                                <div className="form-group">
                                    <label>Firstname</label>
                                    <input onChange={handleChange} value={firstname} type="text" className="form-control"  name="firstname" placeholder="First Name"/>
                                </div>
                                <div className="form-group">
                                    <label>Lastname</label>
                                    <input onChange={handleChange} value={lastname} type="text" className="form-control" name="lastname" placeholder="Last Name"/>
                                </div>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input onChange={handleChange} value={username} type="text" className="form-control"  name="username" placeholder="User Name"/>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input onChange={handleChange} value={email} type="text" className="form-control"  name="email" placeholder="Email"/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input onChange={handleChange} type="password" className="form-control" name="password" placeholder="Password"/>
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input onChange={handleChange} type="password" className="form-control" name="cpassword" placeholder="Confirm Password"/>
                                </div>
                                <button type="submit" onClick={this.continue} className="btn btn-block btn-success">Continue</button>
                                <div className="display-form-error">
                                    { display_signup_error }
                                </div>
                            </form>
                        </div>
                    </div>
                <Footer/>  
            </div>
    }
}

export default FormUserDetails
