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
        const { signup_error } = this.props;
        const display_signup_error = signup_error ? signup_error : "";    
        return (
            <div>
                <Nav/>
                <div className="signup-main-container">
                    <div className="signup-container">
                        <div>
                            <p className="signup-text-msg">{"SIGN UP AND START DATING NOW"}</p>
                        </div>
                        <main className="main-style pa4 black-80">
                            <form className="measure center" onSubmit={this.handleSubmit}>
                                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="firstname">Firstname</label>
                                    <input  onChange={this.handleChange} value={this.state.firstname} className="pa2 input-reset ba bg-transparent  w-100" type="text" name="firstname"  id="firstname"/>
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="lastname">Lastname</label>
                                    <input  onChange={this.handleChange} value={this.state.lastname} className="pa2 input-reset ba bg-transparent  w-100" type="text" name="lastname"  id="lastname"/>
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                                    <input  onChange={this.handleChange} value={this.state.username} className="pa2 input-reset ba bg-transparent  w-100" type="text" name="username"  id="username"/>
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input  onChange={this.handleChange} value={this.state.email} className="pa2 input-reset ba bg-transparent  w-100" type="email" name="email"  id="email-address"/>
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input  onChange={this.handleChange} value={this.state.password} className="pa2 input-reset ba bg-transparent  w-100" type="password" name="password"  id="password"/>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Re-type Password</label>
                                    <input  onChange={this.handleChange} value={this.state.cpassword} className="b pa2 input-reset ba bg-transparent  w-100" type="password" name="cpassword"  id="cpassword"/>
                                </div>
                                </fieldset>
                                <div className="">
                                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign Up"/>
                                </div>
                                <div className="display-login-error">
                                        { display_signup_error }
                                    </div>
                            </form>
                        </main>
                    </div>


                    {/*<div className="row">
                        <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2"></div>
                        <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                            <div className="signUpBox text-center br3 shadow-5">
                            <form onSubmit={this.handleSubmit}>
                                <h2><strong>Join it's free</strong></h2>
                                <p className="matchaMessage"><strong><i>And start dating now!!</i></strong></p>
                                <div className="form-group">
                                    <input onChange={this.handleChange} value={this.state.firstname} type="text" className="form-control"  name="firstname" placeholder="First Name"/>
                                </div>
                                <div className="form-group">
                                    <input onChange={this.handleChange} value={this.state.lastname} type="text" className="form-control" name="lastname" placeholder="Last Name"/>
                                </div>
                                <div className="form-group">
                                    <input onChange={this.handleChange} value={this.state.username} type="text" className="form-control"  name="username" placeholder="User Name"/>
                                </div>
                                <div className="form-group">
                                    <input onChange={this.handleChange} value={this.state.email} type="text" className="form-control"  name="email" placeholder="Email"/>
                                </div>
                                <div className="form-group">
                                    <input onChange={this.handleChange} type="password" className="form-control" name="password" placeholder="Password"/>
                                </div>
                                <div className="form-group">
                                    <input onChange={this.handleChange} type="password" className="form-control" name="cpassword" placeholder="Confirm Password"/>
                                </div>
                                <button type="submit" className="btn btn-block btn-success">Register</button>
                                <div className="message_style">
                                    { display_signup_error }
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2"></div>
            </div>*/}
                </div>
                <Footer/>  
            </div>
        )
    }

}



const mapDispatchToProps = (dispatch) => {
    return {
        sign_Up: (newUser) => dispatch(signUp(newUser))
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        signup_error: state.auth.auth_signup_error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);