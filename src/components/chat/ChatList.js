import React from 'react';
import ChatSummary from './ChatSummary';
import CreateChat from './CreateChat';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const ChatList = ({ chats }) => {
    return (
        <div className="chatListBox">
            <p className="newsTitle">MESSAGES</p>
            <ChatSummary chats={chats}/>
            <CreateChat/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        chats: state.firestore.ordered.chats,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "chats", orderBy: ["createdAt", "asc"] }
    ])
)(ChatList);
