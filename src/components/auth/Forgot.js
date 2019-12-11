import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetPassword } from '../../store/actions/authAction';

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
        const { auth } = this.props;
        if (auth.emailVerified && auth.uid) {
            return <Redirect to="/"/>
        } else {
            return (
                <div className="container-fluid defaultBackground">
                    <div className="row">
                        <div className="col-xs-12 col-sm-4 col-md-4"></div>
                            <div className="col-xs-12 col-sm-8 col-md-4">
                            <div className="forgotBox text-center">
                                <form onSubmit={this.handleSubmit}>
                                    <h3><strong>Reset Password</strong></h3>
                                        <div className="form-group">
                                            <input onChange={this.handleChange} type="text" className="form-control"  name="email" placeholder="Enter Email..."  required/>
                                        </div>
                                        <button type="submit" className="btn btn-block btn-success">Submit</button>
                                    </form>
                                </div>
                            </div>
                        <div className="col-xs-12 col-md-4"></div>
                    </div>   
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reset_Password : (emailAddress) => dispatch(resetPassword(emailAddress))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);