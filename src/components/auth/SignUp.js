import React, { Component } from 'react';
import { signUp } from '../../store/actions/authAction';
import { connect } from 'react-redux';

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
                <div className="container-fluid  outerBackground">
                    <div className="row">
                        <div className="col-xs-12 col-sm-4 col-md-4"></div>
                        <div className="col-xs-12 col-sm-8 col-md-4">
                        <div className="signUpBox text-center">
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
                                </form>
                                <div className="message_style">
                                    { display_signup_error }
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-8"></div>
                    </div>   
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