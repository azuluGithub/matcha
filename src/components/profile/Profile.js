import React, { Component } from 'react';
import ProfileInfo from './ProfileInfo';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Profile extends Component {
    render() {  
        if (!this.props.auth.uid) {
            return <Redirect to="/signin"/>
        } else {
            return (
                <React.Fragment>
                    <ProfileInfo />
                </React.Fragment>
            )
        } 
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Profile);