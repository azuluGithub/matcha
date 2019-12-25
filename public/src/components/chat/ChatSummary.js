import React from 'react';
import moment from 'moment';

const ChatSummary = ({ chat, auth, sender, receiver }) => {
    const fromWho = chat.receiver_Id === auth.uid ?
        <div className="chat self">
            <div className="user-photo">
                <img src={ `${receiver[0].url}` } alt="img" />
            </div>
            <div className="chat-message">
                <p>{ chat.sender_message }</p>
                <span className="time-left">{moment(chat.createdAt.toDate()).calendar()}</span>
            </div>
        </div> 
            :
        <div className="chat friend">
            <div className="user-photo">
                <img src={ `${sender[0].url}` } alt="img" />
            </div>
            <div className="chat-message">
                <p>{ chat.sender_message }</p>
                <span className="time-right">{moment(chat.createdAt.toDate()).calendar()}</span>
            </div>
        </div>

        return <div> { fromWho } </div>
    
}

export default ChatSummary;
