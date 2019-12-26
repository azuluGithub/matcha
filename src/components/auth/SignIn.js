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
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJOJN08fwCWMq0UOkwkWhwizw_2YiMzs102xgMP_ntFpckwbTM" alt="main-banner" style={{width:"100%"}}/>
                        <div className="centered-logo-text">Matcha Online Dating</div>
                    </div>
                    {/**CSS GRID*/}
                    <div className="grid-container main-container">
                        <div className="box main-container">
                            <img alt="tinyiko" src="data:image/jpeg;base64,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"/>
                            <span className="names">Tinyiko, 25</span>
                        </div>
                        <div className="box main-container">
                            <img alt="cassandra" src="data:image/jpeg;base64,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"/>
                            <span className="names">Cassandra, 31</span>
                        </div>
                        <div className="box main-container">
                            <img alt="nathi" src="data:image/jpeg;base64,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"/>
                            <span className="names">Nathi, 35</span>
                        </div>
                        <div className="box main-container">
                            <img alt="alexia" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTLWZ7iiq8aUwITHDjfz4s-rsDDTNSpR8Q9JWMa6CLaF_8Ha59g"/>
                            <span className="names">Alexia, 28</span>
                        </div>
                        <div className="box main-container">
                            <img alt="mark" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQW9Cl0AE-smLZ-AXpTxlF-MqAAYHC4bsEW6M2GgtO7WK55zfAH"/>
                            <span className="names">Mark, 42</span>
                        </div>
                        <div className="box main-container">
                            <img alt="rita" src="data:image/jpeg;base64,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"/>
                            <span className="names">Rita, 32</span>
                        </div>
                        <div className="box main-container">
                            <img alt="hashim" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSGx22AAOBj6aYlEp4SD3im8_Aax24khYCZpP8KtdhsjWEIUXq0"/>
                            <span className="names">Hashim, 35</span>
                        </div>
                        <div className="box main-container">
                            <img alt="ryan" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTFrjPk2-Bs7Cowm4Rnl0qqfDemalzBPvjMeQSmcvRUWlS9T_O6"/>
                            <span className="names">Ryan, 37</span>
                        </div>
                    </div>

                    <div className="bottom-cover">
                        <div className="signin-form">
                            <form  onSubmit={this.handleSubmit}>
                                <h2>Sign In</h2>
                                <div className="form-group">
                                    <label for="email">Email address</label>
                                    <input type="email" name="email"  onChange={this.handleChange} class="form-control" placeholder="Enter email"/>
                                </div>
                                <div class="form-group">
                                    <label for="pwd">Password</label>
                                    <input type="password" name="password" onChange={this.handleChange} class="form-control" placeholder="Enter password"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <div className="display-login-error">
                                    {
                                        display_login_error
                                    }
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
    console.log(state)
    return {
        login_error: state.auth.auth_login_error,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);