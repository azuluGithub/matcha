import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authAction';
import { Redirect } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import './LoginStyle.css';

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
                <div>
                    <Nav/>
                    <div className="cover">
                        <img src="https://images.unsplash.com/photo-1537887785152-91428982dc44?ixlib=rb-1.2.1&w=1000&q=80" alt="img"  style={{width:"100%"}}/>
                        {/*<div className="centered-logo-text">Matcha Online Dating</div>*/}
                    </div>
                    <div className="signin-content-container">
                        <div className="float-left">
                            <div className="signin_img_box">
                                <div className="container2">
                                    <div className="img_banner">
                                        <img alt="tinyiko" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-XHCXB1ZfbbdbraXo-PRzf77QoqW-CeNx9ZnZtdIlRtLyZmtD&s"/>
                                    </div>
                                </div>
                                <div className="centered">
                                    <div className="box_1">
                                        <span className="info_name">Tinyiko Mabhena, </span><span className="info_info">25</span>
                                        <p className="info_info">female</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="float-left">
                            <div className="signin_img_box">
                                <div className="container2">
                                    <div className="img_banner">
                                        <img alt="nathi" src="http://www.teenscraze.com/wp-content/uploads/2016/06/outfits-for-black-men-13.jpg"/>
                                    </div>
                                </div>
                                <div className="centered">
                                    <div className="box_1">
                                        <span className="info_name">Nathi Msimango, </span><span className="info_info">35</span>
                                        <p className="info_info">male</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="float-left">
                            <div className="signin_img_box">
                                <div className="container2">
                                    <div className="img_banner">
                                        <img alt="cassandra" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLHdmX1DrVnVw49J0bpxaSOfaOKSiSfYRb3Ec9_bgFmIbdtWr_1g&s"/>
                                    </div>
                                </div>
                                <div className="centered">
                                    <div className="box_1">
                                        <span className="info_name">Cassandra Clay, </span><span className="info_info">31</span>
                                        <p className="info_info">female</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="float-left">
                            <div className="signin_img_box">
                                <div className="container2">
                                    <div className="img_banner">
                                        <img alt="alexia" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhWtg9eTwQGZM2gaf3ipg3mcVfuRg4X_68l0mmgc5uUGTPJSss&s"/>
                                    </div>
                                </div>
                                <div className="centered">
                                    <div className="box_1">
                                        <span className="info_name">Alexia Bliss, </span><span className="info_info">28</span>
                                        <p className="info_info">female</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="float-left">
                            <div className="signin_img_box">
                                <div className="container2">
                                    <div className="img_banner">
                                        <img alt="alice" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkoIK10FajASnJsNJ8UjkTskgHxiOxBGdNZKm8i-nRjiXEI1Zf&s"/>
                                    </div>
                                </div>
                                <div className="centered">
                                    <div className="box_1">
                                        <span className="info_name">Alice Simpson, </span><span className="info_info">26</span>
                                        <p className="info_info">female</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="float-left">
                            <div className="signin_img_box">
                                <div className="container2">
                                    <div className="img_banner">
                                        <img alt="mark" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4OvS3Eyai-g8xU_PYWDlpRENN9geBOzXDktcUTmpXgxckDVmu&s"/>
                                    </div>
                                </div>
                                <div className="centered">
                                    <div className="box_1">
                                        <span className="info_name">Mark King, </span><span className="info_info">42</span>
                                        <p className="info_info">male</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="float-left">
                            <div className="signin_img_box">
                                <div className="container2">
                                    <div className="img_banner">
                                        <img alt="rita" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW1giKPTC0OQ7t0inDdUmCq1gtgWBd4XRblRKYHWGrtf5xfnRe&s"/>
                                    </div>
                                </div>
                                <div className="centered">
                                    <div className="box_1">
                                        <span className="info_name">Rita Naidoo, </span><span className="info_info">32</span>
                                        <p className="info_info">female</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="float-left">
                            <div className="signin_img_box">
                                <div className="container2">
                                    <div className="img_banner">
                                        <img alt="hashim" src="data:image/jpeg;base64,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"/>
                                    </div>
                                </div>
                                <div className="centered">
                                    <div className="box_1">
                                        <span className="info_name">Hashim Govender, </span><span className="info_info">35</span>
                                        <p className="info_info">male</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-cover">
                        <div className="signin-form">
                            <form  onSubmit={this.handleSubmit}>
                                <h2>Sign In</h2>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email"  onChange={this.handleChange} className="form-control" placeholder="Enter email"/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" onChange={this.handleChange} className="form-control" placeholder="Enter password"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <div className="display-login-error">
                                { display_login_error }
                                </div>
                            </form>
                        </div>
                    </div>
                    <Footer/>
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
    return {
        login_error: state.auth.auth_login_error,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);