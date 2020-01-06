import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createChat, updateChatStatus} from '../../store/actions/profileActions';

const chat_notify = (sender_Id, reciever_Id) => (chat) => {
    return chat.sender_Id === sender_Id && chat.reciever_Id === reciever_Id;
}

class CreateChat extends Component {

    state = {
        sender_message: "",
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.create_Chat(this.state.sender_message, this.props.auth.uid, this.props.matchedUserId, "unread");
        this.setState({
            sender_message : "",
        })
    }

    handleClick = (e) => {
        e.preventDefault();
        const { chats, matchedUserId } = this.props;
        chats.filter(chat_notify(matchedUserId)).map(chat => this.props.updateChatStatus(chat.id, "read"));
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [ name ] : value,
        })
    }

    render() {
        return <div className="chat-form">
                <form onSubmit={this.handleSubmit}>
                    <textarea onClick={this.handleClick} onChange={this.handleChange} type="text" value={this.state.sender_message}  name="sender_message" placeholder="Write your message here..."  required></textarea>
                    <button>Send</button>
                </form>
            </div>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        create_Chat: (sender_message, sender_Id, receiver_Id, chat_status) => dispatch(createChat(sender_message, sender_Id, receiver_Id, chat_status)),
        updateChatStatus: (chat_id, chat_status) => dispatch(updateChatStatus(chat_id, chat_status)),
    }
}

export default connect(null, mapDispatchToProps) (CreateChat);