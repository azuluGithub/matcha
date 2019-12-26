import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createChat } from '../../store/actions/profileActions';

class CreateChat extends Component {

    state = {
        sender_message: "",
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.create_Chat(this.state.sender_message, this.props.auth.uid, this.props.matchedUserId);
        this.setState({
            sender_message : "",
        })
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
                    <textarea onChange={this.handleChange} type="text" value={this.state.sender_message}  name="sender_message" placeholder="Write your message here..."  required></textarea>
                    <button>Send</button>
                </form>
            </div>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        create_Chat: (sender_message, sender_Id, receiver_Id) => dispatch(createChat(sender_message, sender_Id, receiver_Id))
    }
}

export default connect(null, mapDispatchToProps) (CreateChat);