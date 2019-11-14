import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authAction';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {

    state = {
        email : "",
        password:"",
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.sign_In(this.state);
        this.setState({
            email : "",
            password : ""
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [ name ] : value,
        })
    }

    render() {
        const { login_error, auth } = this.props;        
        if (auth.emailVerified && auth.uid && login_error === "if you cant log in, please check if your email is verified") {
            return <Redirect to="/"/>
        } else {
            const display_login_error = login_error ? login_error : "";
            return (
                <div className="container-fluid defaultBackground">
                    <div className="row">
                        <div className="col-xs-12 col-sm-4 col-md-4"></div>
                        <div className="col-xs-12 col-sm-8 col-md-4">
                            <div className="forgotBox text-center">
                                <form onSubmit={this.handleSubmit}>
                                    <h3><strong>Sign In</strong></h3>
                                    <div className="form-group">
                                        <input onChange={this.handleChange} type="text" className="form-control"  name="email" placeholder="Email..." value={this.state.email}  required/>
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.handleChange} type="password" className="form-control" name="password" placeholder="Password..." value={this.state.password}  required/>
                                    </div>
                                        <button type="submit" className="btn btn-block btn-success">Login</button>
                                    </form>
                                    <div className="errorStyle">
                                        {
                                            display_login_error
                                        }
                                    </div>
                                </div>
                            </div>
                        <div className="col-xs-12 col-md-4"></div>
                    </div>   
                </div>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sign_In: (details) => dispatch(signIn(details))
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        login_error: state.auth.auth_login_error,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);