import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './sidebar/sidebar.css';
import Matches from './Matches';
import { connect } from 'react-redux';

class Chat extends Component {
    render() {
        return this.props.uid ? <div><Matches /></div> : <Redirect to="/signin"/>
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.firebase.auth.uid,
    }
}

export default connect(mapStateToProps)(Chat);