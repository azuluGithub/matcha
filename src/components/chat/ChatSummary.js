import React from 'react';
import moment from 'moment';

const ChatSummary = ({ chats }) => {

    return (
        <div>
            { 
                chats && chats.map(chat => {
                    return (
                        <div className="container1" key={chat.id}>
                            <img src="" alt="avatar" style={{width:"60px", height:"60px"}} className="rounded-circle"/>
                            <p>{chat.message}</p>
                            <span className="time-right">{moment(chat.createdAt.toDate()).calendar()}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ChatSummary;
