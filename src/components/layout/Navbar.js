import React, { Component } from 'react';
import SignedInLinks from './SignedInLinks';
import { connect } from 'react-redux';
import SignedOutLinks from './SignedOutLinks';

class Navbar extends Component {
    
    render() {
        const { auth } = this.props;   
        const links = auth.emailVerified && auth.uid ? <SignedInLinks /> : <SignedOutLinks />
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className=" container w-80">
                    { links }
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(Navbar);