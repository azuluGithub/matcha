import React, { Component } from 'react';
import Nav from './Nav';
import Footer from './Footer';

class Confirm extends Component {

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const { firstname, lastname, username, email, display_signup_error } = this.props;
        const { handleSubmit, tags, bio, age, gender, sexPref } = this.props;
        return <div className="signup-cover">
                <Nav/>
                    <div className="forms-cover">
                        <div className="forms-container">
                            { firstname } -
                            { lastname } -
                            { username } -
                            { email } - 
                            { age } -
                            { gender } -
                            { sexPref } -
                            { bio } -
                            { tags }
                            <br/>
                        <button type="submit" onClick={this.back} className="btn btn-sm btn-primary">Back</button>
                        <form onSubmit={handleSubmit}>
                            <button type="submit" className="btn btn-sm btn-success">Confirm</button>
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

export default Confirm;
