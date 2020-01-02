import React, { Component } from 'react';
import { signUp } from '../../store/actions/authAction';
import { connect } from 'react-redux';
import FormUserDetails from "./FormUserDetails";
import FormPersonalDetails from "./FormPersonalDetails";
import Confirm from './Confirm';
import './LoginStyle.css';

class SignUp extends Component {

    state = {
        step : 1,
        firstname : "",
        lastname : "",
        username : "",
        email: "",
        password:"",
        cpassword:"",
        tags: "",
        invalid_input: "",
        bio: "",
        age: "",
        gender: "",
        sexPref: "",
    }

    onKeyUp = (e) => {
        if (e.which === 32) {
            let input = e.target.value.trim().split(" ");
                if (input.length === 0 || input[0] === "") return;
                    if (input[0].toLowerCase() !== "gym" && input[0].toLowerCase() !== "art" && input[0].toLowerCase() !== "music" && input[0].toLowerCase() !== "photography" && input[0].toLowerCase() !== "coding"){
                        this.setState({
                            invalid_input: "YOU ENTERED AN INVALID TAG!",
                        });
                        return;
                    }
    
                this.setState({
                    tags: [ ...this.state.tags, input ]
                });
                this.setState({ 
                    invalid_input: ""
                });
            e.target.value = "";
        }
    }

    onDeleteTag = (tag) => {
        var tags = this.state.tags.filter((t) => {
          return (t !== tag);
        });
        this.setState({
          tags: tags
        });
    }

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        })
    }
    
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        })
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
        const { step, firstname, lastname, username, email } = this.state;
        const { tags, invalid_input, bio, age, gender, sexPref } = this.state; 
        const { signup_error } = this.props;
        const display_signup_error = signup_error ? signup_error : "";    
        if (step === 1) {
            return <FormUserDetails
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    firstname={firstname}
                    lastname={lastname}
                    username={username}
                    email={email}
                    display_signup_error={display_signup_error}
                />
        } else if (step === 2) {
                return <FormPersonalDetails
                    tags={tags}
                    invalid_input={invalid_input}
                    bio={bio}
                    age={age}
                    gender={gender}
                    sexPref={sexPref}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    onKeyUp={this.onKeyUp}
                    onDeleteTag={this.onDeleteTag}
                />
        } else if (step === 3) {
                return <Confirm
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    firstname ={firstname}
                    lastname ={lastname}
                    username ={username}
                    email={email}
                    tags={tags}
                    bio={bio}
                    age={age}
                    gender={gender}
                    sexPref={sexPref}
                    handleSubmit={this.handleSubmit}
                    display_signup_error={display_signup_error}
                />
            
        }
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