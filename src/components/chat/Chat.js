import React, { Component } from 'react';
import ChatList from './ChatList';
import Matches from './Matches';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Chat extends Component {
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/signin"/>
        } else {
            return (
                <div className=" newsMain container-fluid">
                    <div className="row">
                        <div className="col-sm-12 col-md-3 newsLeft pre-scrollable">
                            <Matches />
                        </div>
                        <div className="col-sm-12 col-md-6 newsRight pre-scrollable">
                            <div className="gallery">
                                <ChatList/>  
                            </div>
                        </div>
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

export default connect(mapStateToProps) (Chat);