import React from 'react';
import ChatSummary from './ChatSummary';
import CreateChat from './CreateChat';
import './chat.css';
import Navbar from '../fragements/Navbar';
import Footer from '../fragements/Footer';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const ChatList = ({ chats, auth, matchedUserId, users }) => {
    if (users) {
        const sender = users && users.filter(user => user.id === auth.uid);
        const receiver = users && users.filter(user => user.id === matchedUserId);
        return <div className="main-content-container">
            <Navbar/>
            <div className="chat-container">
                <div className="chatbox">
                    <p className="chat-with"><img src={receiver[0].url} alt="img"/> { receiver[0].firstname[0].toUpperCase() + receiver[0].firstname.slice(1) } { receiver[0].lastname[0].toUpperCase() + receiver[0].lastname.slice(1) } </p>
                    <div className="chatlogs">
                    {
                        chats && chats.map(chat => <ChatSummary key={Math.random() * 100000} auth={auth} chat={chat} sender={sender} receiver={receiver}/>)
                    }
                    </div>
                    <CreateChat
                        auth={auth}
                        matchedUserId={matchedUserId}
                    />
                </div>
            </div>
            <Footer/>
        </div>
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

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const auth = state.firebase.auth;
    const chats = state.firestore.ordered.chats;
    const chatMgs = chats && chats.filter(chat => (chat.sender_Id === id && chat.receiver_Id === auth.uid) || (chat.sender_Id === auth.uid && chat.receiver_Id === id));
    return {
        users: state.firestore.ordered.users,
        auth: auth,
        matchedUserId: id,
        chats: chatMgs
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "chats", orderBy: ["createdAt", "asc"] },
        { collection: "users" },
    ])
)(ChatList);
