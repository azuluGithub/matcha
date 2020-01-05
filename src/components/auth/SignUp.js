import React, { Component } from 'react';
import { signUp } from '../../store/actions/authAction';
import { connect } from 'react-redux';
import Nav from './Nav';
import Footer from './Footer';
import './LoginStyle.css';

class SignUp extends Component {

    state = {
        firstname : "",
        lastname : "",
        username : "",
        email: "",
        password:"",
        cpassword:"",
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.sign_Up(this.state);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [ name ] : value,
        })
    }

    render() {
        const { firstname, lastname, email, username } = this.state;
        const { signup_error } = this.props;
        const { handleChange } = this;
        const display_signup_error = signup_error ? signup_error : "";
        return <div className="signup-cover">
                <Nav/>
                    <div className="forms-cover">
                        <div className="forms-container">
                            <form onSubmit={this.handleSubmit}>
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
                                <button type="submit" onClick={this.continue} className="btn btn-block btn-success">Register</button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        sign_Up: (newUser) => dispatch(signUp(newUser))
    }
}

const mapStateToProps = (state) => {
    return {
        signup_error: state.auth.auth_signup_error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);