import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetPassword } from '../../store/actions/authAction';
import Nav from './Nav';
import Footer from '../fragements/Footer';

class Forgot extends Component {

    state = {
        email : "",
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.reset_Password(this.state);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [ name ] : value,
        })
    }

    render() {
        const { auth_reset_email_error, auth } = this.props;
        const display_auth_reset_email_error = auth_reset_email_error ? auth_reset_email_error : "";
        if (auth.emailVerified && auth.uid) {
            return <Redirect to="/"/>
        } else {
            return <div>
                    <Nav/>
                        <div  className="forgot-cover">
                            <div className="forms-cover">
                                <div className="forms-container">
                                    <form onSubmit={this.handleSubmit}>
                                        <h4>Reset Password</h4>
                                        <div className="form-group">
                                            <input onChange={this.handleChange} type="text" className="form-control"  name="email" placeholder="Enter Email..."  required/>
                                        </div>
                                        <button type="submit" className="btn btn-block btn-success">Submit</button>
                                        <div className="display-form-error">
                                            { display_auth_reset_email_error }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    <Footer/>
                </div>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        auth_reset_email_error: state.auth.auth_reset_email_error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reset_Password : (emailAddress) => dispatch(resetPassword(emailAddress))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);