import React, { Component } from 'react';
import MatchesDetails from './MatchesDetails';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import ScrollBar from '../../ScrollBar';
import Footer from '../fragements/Footer';
import Navbar from '../fragements/Navbar';

const matchesFunc = (matches, users, auth_id) => {
    const listOfMatches = [];
    for (let i = 0; i < matches.length; i++) {
         if (matches[i].liker_id === auth_id || matches[i].liked_id === auth_id) {
            for (let j = 0; j < users.length; j++) {
                 if ((users[j].id === matches[i].liker_id || users[j].id === matches[i].liked_id) && users[j].id !== auth_id) {
                    listOfMatches.push(users[j]);
                 }
            }
         }
    }
    return listOfMatches;
}

const iBlocked = (blocker_id, blocked_id) => (block) => {
    return block.blocker_id === blocker_id && block.blocked_id === blocked_id;
}

class Matches extends Component {

    render() {
        const { users, matches, auth, blocks } = this.props;
        if (users && matches && blocks) {
            const users_matches = matchesFunc(matches, users, auth.uid);
            return (
                <div>
                    <Navbar/>
                    <div className="matches-page">
                    <span className="vuid_name">{ "Chats" } </span><hr/><br/>
                        <ScrollBar>
                            <MatchesDetails
                                blocks={blocks}
                                iBlocked={iBlocked}
                                users_matches={users_matches}
                                auth={this.props.auth}
                            />
                        </ScrollBar>
                    </div>
                    <Footer/>     
                </div>
            )
        } else {
            return (
                <div id="dot-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        users: state.firestore.ordered.users,
        matches: state.firestore.ordered.matches,
        blocks: state.firestore.ordered.blocks
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "users" },
        { collection: "blocks"},
        { collection: "matches", orderBy: ["createdAt", "asc"] }
    ])
)(Matches);